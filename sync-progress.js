/* ============================================================
   Nafs Warrior — Supabase progress sync
   ------------------------------------------------------------
   Reads & writes the "progress" table so a signed-in user's
   streak count, days refrained, tool-open counts, time spent
   and earned badges follow them across devices.

   ONE-TIME SETUP — run this in the Supabase SQL editor
   (safe to re-run):

   -- =========================================================
   -- Nafs Warrior: "progress" table  (one row per user)
   -- NOTE: this DROPS the old empty table and rebuilds it.
   -- =========================================================
   drop table if exists public.progress cascade;

   create table public.progress (
     id               uuid primary key default gen_random_uuid(),
     user_id          uuid not null references auth.users(id) on delete cascade,
     email            text,
     streak_count     integer not null default 0,   -- current consecutive-day streak
     best_streak      integer not null default 0,   -- longest streak ever reached
     days_completed   integer not null default 0,   -- total days abstained/completed
     music_opens      integer not null default 0,   -- times the Music Tool was opened
     tool_opens       jsonb not null default '{}'::jsonb,
     badges           jsonb not null default '{}'::jsonb, -- earned badge keys
     time_seconds     bigint not null default 0,    -- total time spent on the site
     last_active_date date,
     updated_at       timestamptz not null default now(),
     created_at       timestamptz not null default now()
   );

   -- One row per user (this is the onConflict target used by the app)
   create unique index if not exists progress_user_id_unique
     on public.progress (user_id);

   -- Row level security: a signed-in user only sees their own row
   alter table public.progress enable row level security;

   drop policy if exists "progress select own" on public.progress;
   create policy "progress select own" on public.progress
     for select to authenticated using ((select auth.uid()) = user_id);

   drop policy if exists "progress insert own" on public.progress;
   create policy "progress insert own" on public.progress
     for insert to authenticated with check ((select auth.uid()) = user_id);

   drop policy if exists "progress update own" on public.progress;
   create policy "progress update own" on public.progress
     for update to authenticated using ((select auth.uid()) = user_id);

   -- The app uses the anon key but the active role is "authenticated"
   -- once a user is signed in, so let that role use the table.
   grant usage on schema public to authenticated;
   grant select, insert, update on table public.progress to authenticated;
   ============================================================ */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://znyiqznuvqxcdkxwlpzd.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpueWlxem51dnF4Y2RreHdscHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDcwMzIsImV4cCI6MjEwNTIyMzAzMn0.5CvlmXBAg2VXNd7Gp-nq__ZgPiT9p9DjAEObnZaTXXI';

  var client = null;
  function getClient() {
    if (client) return client;
    if (window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return client;
  }

  function readJSON(key, fb) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; }
    catch (e) { return fb; }
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function countDays(days) {
    var n = 0;
    for (var i = 1; i <= 7; i++) { if (days && days[String(i)]) n++; }
    return n;
  }

  /* Longest run of consecutive completed days (1..7) in a tool */
  function longestRun(days) {
    var best = 0, run = 0;
    for (var i = 1; i <= 7; i++) {
      if (days && days[String(i)]) { run++; if (run > best) best = run; }
      else { run = 0; }
    }
    return best;
  }

  /* All badge definitions. stats = { mtn, secs, opens, streak } */
  function badgeDefs(stats) {
    var mtn = stats.mtn || 0;
    var secs = stats.secs || 0, opens = stats.opens || 0, streak = stats.streak || 0;
    return [
      { key: 'm1',  cat: 'music',  got: mtn >= 1,  name: 'First Step', desc: 'Complete Day 1 of the Music Tool' },
      { key: 'm4',  cat: 'music',  got: mtn >= 4,  name: 'Halfway There', desc: 'Complete 4 of 7 music days' },
      { key: 'm7',  cat: 'music',  got: mtn >= 7,  name: 'Music Journey Complete', desc: 'Finish all 7 music days' },
      { key: 's3',  cat: 'streak', got: streak >= 3,  name: 'Three-Day Rhythm', desc: 'Keep a 3-day streak' },
      { key: 's7',  cat: 'streak', got: streak >= 7,  name: 'Week-Long Warrior', desc: 'Keep a 7-day streak' },
      { key: 's21', cat: 'streak', got: streak >= 21, name: '21-Day Champion', desc: 'Keep a 21-day streak' },
      { key: 't60',   cat: 'time', got: secs >= 60,     name: 'Settled In', desc: 'Spend 1 minute on the site' },
      { key: 't600',  cat: 'time', got: secs >= 600,    name: 'Ten Gentle Minutes', desc: 'Spend 10 minutes on the site' },
      { key: 't1800', cat: 'time', got: secs >= 1800,   name: 'Half an Hour of Growth', desc: 'Spend 30 minutes on the site' },
      { key: 't3600', cat: 'time', got: secs >= 3600,   name: 'An Hour of Reflection', desc: 'Spend 1 hour on the site' },
      { key: 't18000', cat: 'time', got: secs >= 18000, name: 'Five Hours Deep', desc: 'Spend 5 hours on the site' },
      { key: 'o10',  cat: 'opens', got: opens >= 10,  name: 'Regular Visitor', desc: 'Open a tool 10 times' },
      { key: 'o50',  cat: 'opens', got: opens >= 50,  name: 'Returning Warrior', desc: 'Open a tool 50 times' },
      { key: 'o100', cat: 'opens', got: opens >= 100, name: 'Committed', desc: 'Open a tool 100 times' }
    ];
  }

  function badgesJson(stats) {
    var out = {};
    badgeDefs(stats).forEach(function (b) { if (b.got) out[b.key] = true; });
    return out;
  }

  /* Current signed-in user, or null */
  function getSession() {
    var sb = getClient();
    if (!sb) return Promise.resolve(null);
    return sb.auth.getSession().then(function (res) {
      return (res && res.data && res.data.session) ? res.data.session : null;
    }).catch(function () { return null; });
  }

  /* Gather everything the app knows from this device */
  function collectLocal() {
    var mt = readJSON('mt_week1', { days: {}, opens: 0 });
    var secs = parseInt(localStorage.getItem('nafs_time_seconds') || '0', 10) || 0;
    var mtn = countDays(mt.days);
    var mto = parseInt(mt.opens, 10) || 0;
    var streak = longestRun(mt.days);
    var stats = {
      mt_days: (mt && mt.days) ? mt.days : {},
      time_seconds: secs,
      music_opens: mto,
      streak_count: streak,
      days_completed: mtn,
      last_active_date: todayKey()
    };
    stats.badges = badgesJson(stats);
    return stats;
  }

  /* Merge two stat builds { mt_days, time_seconds, opens, streak, etc. }.
     Values that are counters or maxima take the higher of the two;
     badge sets and day maps are unioned. */
  function maxOf(a, b, k) { return Math.max((a && a[k]) || 0, (b && b[k]) || 0); }

  function mergeBuilds(a, b) {
    var out = {
      mt_days: {}, badges: {}, tool_opens: {},
      time_seconds: maxOf(a, b, 'time_seconds'),
      music_opens: maxOf(a, b, 'music_opens'),
      streak_count: maxOf(a, b, 'streak_count'),
      days_completed: maxOf(a, b, 'days_completed'),
      best_streak: maxOf(a, b, 'best_streak'),
      email: (a && a.email) || (b && b.email) || ''
    };
    var src = (a && a.mt_days) || {}, src2 = (b && b.mt_days) || {};
    for (var i = 1; i <= 7; i++) {
      if (src[String(i)] || src2[String(i)]) out.mt_days[String(i)] = true;
    }
    var ba = (a && a.badges) || {}, bb = (b && b.badges) || {};
    Object.keys(ba).forEach(function (k) { if (ba[k]) out.badges[k] = true; });
    Object.keys(bb).forEach(function (k) { if (bb[k]) out.badges[k] = true; });
    out.last_active_date =
      String(a && a.last_active_date || '') > String(b && b.last_active_date || '')
        ? a.last_active_date : (b && b.last_active_date) || todayKey();
    return out;
  }

  /* Build the row to write, folding in anything already in the DB */
  function buildPayload(session, existing) {
    var local = collectLocal();
    var merged = (existing && existing.streak_count !== undefined)
      ? mergeBuilds(existing, local)
      : local;
    var best = Math.max(merged.best_streak || 0, merged.streak_count || 0);
    return {
      user_id: session.user.id,
      email: (session.user.email) || merged.email || '',
      streak_count: merged.streak_count || 0,
      best_streak: best,
      days_completed: merged.days_completed || 0,
      music_opens: merged.music_opens || 0,
      tool_opens: { music: merged.music_opens || 0 },
      badges: merged.badges || {},
      time_seconds: merged.time_seconds || 0,
      last_active_date: merged.last_active_date || todayKey(),
      updated_at: new Date().toISOString()
    };
  }

  /* Upsert the signed-in user's progress into the DB */
  function push() {
    return getSession().then(function (session) {
      if (!session) return { ok: false, reason: 'not-signed-in' };
      var sb = getClient();
      if (!sb) return { ok: false, reason: 'no-client' };
      return pull().then(function (existing) {
        var payload = buildPayload(session, existing && existing.__error ? null : existing);
        return sb.from('progress').upsert(payload, { onConflict: 'user_id' });
      }).then(function (res) {
        if (res.error) return { ok: false, reason: res.error.message };
        return { ok: true };
      }).catch(function (e) {
        return { ok: false, reason: (e && e.message) ? e.message : 'Unknown error' };
      });
    });
  }

  /* Fetch the user's progress row from the DB (or null) */
  function pull() {
    return getSession().then(function (session) {
      if (!session) return Promise.resolve(null);
      var sb = getClient();
      if (!sb) return Promise.resolve(null);
      return sb.from('progress')
        .select('streak_count,best_streak,days_completed,music_opens,badges,time_seconds,last_active_date,email,updated_at')
        .eq('user_id', session.user.id)
        .maybeSingle()
        .then(function (res) {
          if (res.error) throw res.error;
          return res.data || null;
        });
    }).catch(function (e) {
      return { __error: (e && e.message) ? e.message : 'Failed to read progress' };
    });
  }

  /* Sign the current user out */
  function signOut() {
    var sb = getClient();
    if (!sb) return Promise.resolve();
    return sb.auth.signOut().catch(function () {});
  }

  window.SyncProgress = {
    getSession: getSession,
    collectLocal: collectLocal,
    mergeBuilds: mergeBuilds,
    badgeDefs: badgeDefs,
    push: push,
    pull: pull,
    signOut: signOut
  };
})();