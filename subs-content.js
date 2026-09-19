(function () {
  if (document.getElementById('subs-content-style')) return;
  var css =
    '.subs-wrap{display:flex;flex-direction:column;gap:12px;margin-top:16px}' +
    '.subs-card{background:var(--bg-card);border:1px solid var(--line-strong);border-radius:16px;overflow:hidden}' +
    '.subs-head{width:100%;display:flex;align-items:center;gap:12px;background:none;border:none;padding:16px 18px;cursor:pointer;text-align:left;font-family:var(--font-body);transition:background .18s ease}' +
    '.subs-head:hover{background:var(--sage-wash)}' +
    '.subs-ico{flex-shrink:0;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:var(--sage-wash);color:var(--sage-dark);font-size:18px}' +
    '.subs-t{flex:1;min-width:0}' +
    '.subs-t b{display:block;font-size:15px;font-weight:800;color:var(--ink)}' +
    '.subs-t small{font-size:12.5px;color:var(--ink-soft);font-weight:500}' +
    '.subs-caret{flex-shrink:0;color:var(--sage-mid);font-weight:700;transition:transform .2s ease}' +
    '.subs-card.open .subs-caret{transform:rotate(90deg)}' +
    '.subs-body{display:none;padding:4px 18px 18px}' +
    '.subs-card.open .subs-body{display:block;animation:rise .3s ease}' +
    '.subs-intro{font-size:13.5px;color:var(--ink-soft);line-height:1.7;margin-bottom:12px}' +
    '.chip-grid{display:flex;flex-wrap:wrap;gap:8px}' +
    '.chip{background:var(--sage-wash);border:1px solid var(--line);color:var(--sage-dark);font-weight:700;font-size:13px;padding:8px 14px;border-radius:999px}' +
    '.link-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}' +
    '.link-item{display:flex;align-items:center;gap:8px;background:var(--sage-wash);border:1px solid var(--line);border-radius:12px;padding:10px 12px;text-decoration:none;color:var(--ink);font-weight:700;font-size:13.5px;transition:border-color .18s ease,transform .18s ease}' +
    '.link-item:hover{border-color:var(--sage);transform:translateY(-2px)}' +
    '.link-item .n{color:var(--gold);font-weight:800;flex-shrink:0}' +
    '.tool-item{background:var(--sage-wash);border:1px solid var(--line);border-radius:12px;padding:12px 14px;margin-bottom:8px}' +
    '.tool-item b{color:var(--ink);font-size:14px}' +
    '.tool-item p{color:var(--ink-soft);font-size:12.5px;line-height:1.6;margin-top:2px}' +
    '.pod-cat{margin-bottom:16px}' +
    '.pod-cat h4{font-family:var(--font-display);color:var(--sage-dark);font-size:1.1rem;margin-bottom:2px}' +
    '.pod-count{font-size:11px;font-weight:700;color:var(--gold);letter-spacing:.08em}' +
    '.pod-item{padding:8px 0;border-bottom:1px dashed var(--line)}' +
    '.pod-item:last-child{border-bottom:none}' +
    '.pod-item b{font-size:13.5px;color:var(--ink)}' +
    '.pod-item b a{color:var(--sage-dark);text-decoration:none}' +
    '.pod-item b a:hover{text-decoration:underline}' +
    '.pod-item p{font-size:12.5px;color:var(--ink-soft);line-height:1.6;margin-top:2px}';
  var s = document.createElement('style');
  s.id = 'subs-content-style';
  s.textContent = css;
  document.head.appendChild(s);
})();

var SUBS_CONTENT = {
  acapellaChannels: [
    "ACAPELLA HUB",
    "ACAPELLA LIBRARY",
    "JUST VOCALS",
    "NO MUSIC GUY",
    "NOW VOCALS",
    "RAYMUSE",
    "VOCELLA",
    "AESTHETIC ACAPELLAS"
  ],
  tools: [
    { name: "VocalRemover.org \u2014 Vocal Remover", desc: "Upload \u2192 choose vocal separation \u2192 download the vocals." },
    { name: "BandLab Splitter \u2014 BandLab Splitter", desc: "Separates a song into vocals, drums, bass, and other instruments." },
    { name: "SoundTools Vocal Remover \u2014 SoundTools", desc: "Free browser-based vocal isolation." },
    { name: "Fadr \u2014 Fadr", desc: "Free stem separation for songs, including vocals." },
    { name: "Moises \u2014 Moises", desc: "Has a free tier for separating vocals and instruments." }
  ],
  muslimSpotify: [
    { name: "Nasheedio", desc: "Probably the closest match. It has nasheeds, Quran, podcasts, lectures, poetry, and other Islamic audio, with playlists and recommendations. Its basic listening is free." },
    { name: "SawtiQ", desc: "Islamic audio streaming focused on nasheeds, Quran and other spiritual audio. It advertises 11,000+ tracks and free, ad-free streaming." },
    { name: "Noorify", desc: "Specifically aimed at vocal-only nasheeds, with no instruments. Their slogan is essentially \u201CSpotify, but for Muslims.\u201D" }
  ],
  nasheedArtists: [
    { name: "Siedd", url: "https://www.youtube.com/@SieddOfficial" },
    { name: "Omar Esa", url: "https://www.youtube.com/@OmarEsa" },
    { name: "Ilyas Mao", url: "https://www.youtube.com/@IlyasMao" },
    { name: "Muad", url: "https://www.youtube.com/@MuadOfficial" },
    { name: "Safe Adam", url: "https://www.youtube.com/@SafeAdam" },
    { name: "Nadeem Mohammed", url: "https://www.youtube.com/@NadeemMohammed" },
    { name: "Essam", url: "https://www.youtube.com/@EssamOfficial" },
    { name: "Mo Khan", url: "https://www.youtube.com/@MoKhanOfficial" },
    { name: "Myke Rook", url: "https://www.youtube.com/@MykeRook" },
    { name: "Faisal Latif", url: "https://www.youtube.com/@FaisalLatif" },
    { name: "Rhamzan", url: "https://www.youtube.com/@Rhamzan" },
    { name: "Abu Adam", url: "https://www.youtube.com/@AbuAdamNasheeds" },
    { name: "Talib Al Habib", url: "https://www.youtube.com/@TalibAlHabib" },
    { name: "Muhammad Al Muqit", url: "https://www.youtube.com/@MuhammadAlMuqit" },
    { name: "Ahmed Bukhatir", url: "https://www.youtube.com/@AhmedBukhatirOfficial" },
    { name: "Abdul Aziz Alrashed", url: "https://www.youtube.com/@AbdulazizAlrashed" },
    { name: "Yousef Al Ayoub", url: "https://www.youtube.com/@YousefAlAyoub" },
    { name: "Abdullah Al-Sinani", url: "https://www.youtube.com/@AbdullahAlSinani" },
    { name: "Baraa Masoud", url: "https://www.youtube.com/@BaraaMasoud" },
    { name: "Mohamed Tarek", url: "https://www.youtube.com/@MohamedTarekOfficial" },
    { name: "Shakir Khan Rahmani", url: "https://www.youtube.com/ShakirKhanRahmani" },
    { name: "Zain Bhikha", url: "https://www.youtube.com/@zainbhikhaofficial" },
    { name: "Dawud Wharnsby", url: "https://www.youtube.com/@DawudWharnsby" },
    { name: "Labbayk", url: "https://www.youtube.com/@LabbaykNasheeds" },
    { name: "Irfan Makki", url: "https://www.youtube.com/@IrfanMakki" },
    { name: "Mesut Kurtis", url: "https://www.youtube.com/@MesutKurtisOfficial" },
    { name: "Jae Deen", url: "https://www.youtube.com/@JaeDeen" },
    { name: "Muslim Belal", url: "https://www.youtube.com/@MuslimBelal" },
    { name: "Saabik Poetry", url: "https://www.youtube.com/@SaabikPoetry" },
    { name: "Harun Abdul-Haqq", url: "https://www.youtube.com/@HarunAbdulHaqq" },
    { name: "Ammar Acapella", url: "https://www.youtube.com/@AmmarAcapella" },
    { name: "Malik Adam", url: "https://www.youtube.com/@MalikAdam" },
    { name: "Kinan Salaam", url: "https://www.youtube.com/@KinanSalaam" },
    { name: "Qasim Hussain", url: "https://www.youtube.com/@QasimHussain" },
    { name: "Othman Alibrahim", url: "https://www.youtube.com/@OthmanAlibrahim" },
    { name: "Ahmad Alnufais", url: "https://www.youtube.com/@AhmadAlnufais" },
    { name: "Mansour Alkhulaifi", url: "https://www.youtube.com/@MansourAlkhulaifi" },
    { name: "Omar Al Issa", url: "https://www.youtube.com/@OmarAlIssa" },
    { name: "Mohammed Kheder", url: "https://www.youtube.com/@MohammedKheder" },
    { name: "Naif Alsharhan", url: "https://www.youtube.com/@NaifAlsharhan" }
  ],
  podcasts: [
    { cat: "SCIENCE & SPACE", items: [
      { t: "The afikra Podcast", f: "Focus: Science, history, culture, Muslim-world scholarship. Especially interesting: Episodes featuring scientists such as astrophysicist Nidhal Guessoum.", u: "https://www.afikra.com/" },
      { t: "Muslim Space Science / Science & Islam discussions", f: "Focus: Astronomy, cosmology, science and the Islamic intellectual tradition. Recommended guest: Prof. Nidhal Guessoum", u: "" },
      { t: "Sahil Adeem Podcast", f: "Focus: Science, morality, philosophy, Islam and modern questions. Note: For science content, prioritize episodes featuring qualified scientists and distinguish scientific evidence from religious interpretation.", u: "https://sahiladeem.com/" }
    ]},
    { cat: "PSYCHOLOGY & MENTAL HEALTH", items: [
      { t: "The Nafs Psychologist \u2014 Abdul Shahid", f: "Focus: Mental health, emotional health, relationships, self-development and the Quranic concept of the nafs.", u: "https://podcasts.apple.com/us/podcast/the-nafs-psychologist/id1500298501" },
      { t: "Dunia Shuaib", f: "Focus: Islamic psychology, mental health, relationships and emotional wellbeing.", u: "https://podcasts.apple.com/us/podcast/dunia-shuaib/id1503636752" },
      { t: "Yaqeen Institute", f: "Focus: Psychology, spirituality, doubts, wellbeing, identity and Islamic thought.", u: "https://yaqeeninstitute.org/" },
      { t: "Muslim Mental Health Podcast", f: "Focus: Mental health and Muslim experiences. Best for: Teens and young adults interested in psychology and wellbeing.", u: "" }
    ]},
    { cat: "SPORTS & FITNESS", items: [
      { t: "Muslim Athlete Podcast", f: "Focus: Fitness, health, lifestyle, sports and Muslim athletes.", u: "https://www.listennotes.com/podcasts/muslim-athlete-podcast-abrahim-42WTd9cLA3j/" },
      { t: "Muslim-Athlete Podcast \u2014 Evonne Britton", f: "Focus: Muslim athletes, inclusion, confidence and women's experiences in sport.", u: "https://podcasts.apple.com/gb/podcast/muslim-athlete-poscast/id1562706662" },
      { t: "Muslim Athlete Podcast \u2014 Strong & Fearless", f: "Focus: Martial arts, discipline, confidence and Muslim youth. Note: Individual episodes should be checked for age-appropriateness.", u: "" }
    ]},
    { cat: "BUSINESS & ENTREPRENEURSHIP", items: [
      { t: "Tijarah Academy Podcast", f: "Focus: Muslim entrepreneurship, business, Islamic ethics and practical business advice.", u: "https://www.tijarah.academy/p/tijarah-academy-podcast" },
      { t: "Muslims in Tech Podcast", f: "Focus: Technology, entrepreneurship, innovation, careers and Muslim professionals.", u: "https://www.muslimsintech.org/" },
      { t: "Muslim Startup Podcast", f: "Focus: Muslim founders, startups, entrepreneurship and business.", u: "" },
      { t: "Productive Muslim Podcast", f: "Focus: Productivity, work, goals, habits and personal development.", u: "https://productivemuslim.com/" }
    ]},
    { cat: "TECHNOLOGY & AI", items: [
      { t: "Muslims in Tech Podcast", f: "Focus: AI, technology, careers, innovation and Muslim professionals.", u: "https://www.muslimsintech.org/" },
      { t: "The Thinking Muslim", f: "Focus: Technology, society, politics, ideas, culture and the modern Muslim world.", u: "https://www.thinkingmuslim.com/" },
      { t: "Sapience Institute", f: "Focus: Philosophy, science, atheism, arguments for Islam and intellectual discussions.", u: "https://sapienceinstitute.org/" }
    ]},
    { cat: "HISTORY", items: [
      { t: "Islamic History Podcast", f: "Focus: Islamic history, dynasties, civilizations, major events and historical personalities.", u: "https://islamichistorypodcast.com/" },
      { t: "Islamic History Podcast \u2014 Apple Podcasts", f: "", u: "https://podcasts.apple.com/us/podcast/islamic-history-podcast/id491945086" },
      { t: "IlmFeed", f: "Focus: Islamic history, scholars, stories, reminders and educational conversations.", u: "https://ilmfeed.com/" }
    ]},
    { cat: "ISLAMIC KNOWLEDGE", items: [
      { t: "Qalam Institute Podcast", f: "Focus: Tafsir, seerah, Islamic knowledge, khutbahs and lectures.", u: "https://qalam.institute/" },
      { t: "Yaqeen Institute", f: "Focus: Quran, seerah, Islamic thought, doubts, psychology and contemporary issues.", u: "https://yaqeeninstitute.org/" },
      { t: "11TH HOUR PODCAST", f: "Focus: DAILY TOPICS , BY YOUTH CLUB", u: "https://bayyinah.com/" },
      { t: "Muslim Central", f: "Focus: Large collection of lectures, reminders, Quran and Islamic educational content.", u: "https://muslimcentral.com/" },
      { t: "Mufti Menk Podcast", f: "Focus: Islamic reminders, character, family, faith and everyday life.", u: "https://muftimenk.com/" }
    ]},
    { cat: "PERSONAL DEVELOPMENT", items: [
      { t: "Productive Muslim Podcast", f: "Focus: Productivity, habits, time management, goals and Muslim lifestyle.", u: "https://productivemuslim.com/" },
      { t: "The Nafs Psychologist", f: "Focus: Self-development, emotional health, overcoming obstacles and the nafs.", u: "https://podcasts.apple.com/us/podcast/the-nafs-psychologist/id1500298501" },
      { t: "MuslimMatters Podcast", f: "Focus: Muslim life, society, culture, family and contemporary issues.", u: "https://muslimmatters.org/" }
    ]},
    { cat: "YOUTH / YOUNG MUSLIMS", items: [
      { t: "Yaqeen Institute", f: "Focus: Questions young Muslims actually encounter: identity, doubts, faith, psychology and society.", u: "https://yaqeeninstitute.org/" },
      { t: "IlmFeed", f: "Focus: Stories, reminders, Islamic history and relatable Muslim content.", u: "https://ilmfeed.com/" },
      { t: "The Thinking Muslim", f: "Focus: Identity, society, politics, culture and intellectual discussions.", u: "https://www.thinkingmuslim.com/" }
    ]},
    { cat: "ISLAMIC HISTORY + CULTURE", items: [
      { t: "The afikra Podcast", f: "Focus: Arab and Muslim history, art, culture, science and intellectual heritage.", u: "https://www.afikra.com/" },
      { t: "Islamic History Podcast", f: "Focus: Islamic civilizations, political history and historical events.", u: "https://islamichistorypodcast.com/" }
    ]},
    { cat: "TECH + CAREERS", items: [
      { t: "Muslims in Tech", f: "Focus: Technology, careers, networking, entrepreneurship and innovation.", u: "https://www.muslimsintech.org/" },
      { t: "Tijarah Academy Podcast", f: "Focus: Entrepreneurship, business and Islamic business ethics.", u: "https://www.tijarah.academy/p/tijarah-academy-podcast" }
    ]},
    { cat: "SCIENCE + FAITH", items: [
      { t: "Nidhal Guessoum / Science & Faith discussions", f: "Focus: Astronomy, cosmology, scientific methodology and the relationship between science and Islamic thought.", u: "" },
      { t: "The afikra Podcast", f: "Focus: Muslim scientific heritage and modern intellectual discussions.", u: "https://www.afikra.com/" },
      { t: "Sahil Adeem Podcast", f: "Focus: Science, morality, philosophy and Islam.", u: "https://podcasts.apple.com/us/podcast/sahil-adeem-podcast/id1699958195" }
    ]},
    { cat: "FOR GIRLS / WOMEN", items: [
      { t: "Dunia Shuaib", f: "Focus: Mental health, relationships, emotional wellbeing and Islamic spirituality.", u: "https://podcasts.apple.com/us/podcast/dunia-shuaib/id1503636752" },
      { t: "Muslim-Athlete Podcast", f: "Focus: Muslim women in sport, confidence and creating supportive environments for Muslim athletes.", u: "https://podcasts.apple.com/gb/podcast/muslim-athlete-poscast/id1562706662" }
    ]},
    { cat: "PHILOSOPHY & BIG QUESTIONS", items: [
      { t: "Sapience Institute", f: "Focus: Arguments for Islam, philosophy, atheism, science and worldview questions.", u: "https://sapienceinstitute.org/" },
      { t: "The Thinking Muslim", f: "Focus: Philosophy, society, Muslim identity and contemporary intellectual questions.", u: "https://www.thinkingmuslim.com/" },
      { t: "Yaqeen Institute", f: "Focus: Doubts, faith, philosophy, theology and contemporary questions.", u: "https://yaqeeninstitute.org/" }
    ]},
    { cat: "PODCASTS FOR SOMEONE WHO LOVES STORIES", items: [
      { t: "Islamic History Podcast", f: "Focus: Historical stories and personalities.", u: "https://islamichistorypodcast.com/" },
      { t: "IlmFeed", f: "Focus: Stories from Islamic history, scholars and inspiring Muslims.", u: "https://ilmfeed.com/" },
      { t: "The afikra Podcast", f: "Focus: Stories about Muslim civilizations, people, places, science and culture.", u: "https://www.afikra.com/" }
    ]},
    { cat: "PODCASTS FOR SOMEONE WHO LOVES LEARNING RANDOM THINGS", items: [
      { t: "The afikra Podcast", f: "Focus: Science + history + culture + art + civilization.", u: "https://www.afikra.com/" },
      { t: "Muslims in Tech", f: "Focus: Technology + careers + innovation + entrepreneurship.", u: "https://www.muslimsintech.org/" },
      { t: "The Thinking Muslim", f: "Focus: Politics + society + history + philosophy + Muslim identity.", u: "https://www.thinkingmuslim.com/" },
      { t: "Yaqeen Institute", f: "Focus: Psychology + theology + history + contemporary issues + faith.", u: "https://yaqeeninstitute.org/" }
    ]}
  ]
};

function subsCard(title, sub, body) {
  return '<div class="subs-card">' +
    '<button class="subs-head" type="button">' +
      '<span class="subs-ico">&#9834;</span>' +
      '<span class="subs-t"><b>' + title + '</b><small>' + sub + '</small></span>' +
      '<span class="subs-caret">&rsaquo;</span>' +
    '</button>' +
    '<div class="subs-body">' + body + '</div>' +
  '</div>';
}

function channelsHTML() {
  var h = '<p class="subs-intro">YouTube channels that post acapella versions of songs. Search any of these names on YouTube.</p><div class="chip-grid">';
  for (var i = 0; i < SUBS_CONTENT.acapellaChannels.length; i++) {
    h += '<span class="chip">' + SUBS_CONTENT.acapellaChannels[i] + '</span>';
  }
  return h + '</div>';
}

function toolsHTML() {
  var h = '<p class="subs-intro">Tools to make acapellas out of music. Upload a song, separate the vocals, and download them.</p>';
  for (var i = 0; i < SUBS_CONTENT.tools.length; i++) {
    h += '<div class="tool-item"><b>' + SUBS_CONTENT.tools[i].name + '</b><p>' + SUBS_CONTENT.tools[i].desc + '</p></div>';
  }
  return h;
}

function spotifyHTML() {
  var h = '<p class="subs-intro">The closest thing to Spotify, but built for Muslims.</p>';
  for (var i = 0; i < SUBS_CONTENT.muslimSpotify.length; i++) {
    h += '<div class="tool-item"><b>' + SUBS_CONTENT.muslimSpotify[i].name + '</b><p>' + SUBS_CONTENT.muslimSpotify[i].desc + '</p></div>';
  }
  return h;
}

function artistsHTML() {
  var h = '<p class="subs-intro">Vocal-only nasheed artists, each with their YouTube channel. Tap one to open it in a new tab.</p><div class="link-grid">';
  for (var i = 0; i < SUBS_CONTENT.nasheedArtists.length; i++) {
    var a = SUBS_CONTENT.nasheedArtists[i];
    h += '<a class="link-item" href="' + a.url + '" target="_blank" rel="noopener"><span class="n">' + (i + 1) + '</span><span>' + a.name + '</span></a>';
  }
  return h + '</div>';
}

function podcastsHTML() {
  var h = '<p class="subs-intro">A curated directory of Muslim-friendly podcasts, organised by theme. Numbers continue across the whole list.</p>';
  var n = 0;
  for (var c = 0; c < SUBS_CONTENT.podcasts.length; c++) {
    var cat = SUBS_CONTENT.podcasts[c];
    h += '<div class="pod-cat"><h4>' + cat.cat + '</h4><span class="pod-count">' + cat.items.length + ' podcasts</span>';
    for (var i = 0; i < cat.items.length; i++) {
      n++;
      var p = cat.items[i];
      h += '<div class="pod-item"><b>' + n + '. ' + (p.u ? '<a href="' + p.u + '" target="_blank" rel="noopener">' + p.t + '</a>' : p.t) + '</b>' + (p.f ? '<p>' + p.f + '</p>' : '') + '</div>';
    }
    h += '</div>';
  }
  return h;
}

function subsContentHTML() {
  var h = '<div class="subs-wrap">';
  h += subsCard('Acapella Channels', 'Vocal-only versions of songs you used to love, stripped of the music that harms you. ' + SUBS_CONTENT.acapellaChannels.length + ' channels to start with.', channelsHTML());
  h += subsCard('Tools to Make Acapellas', 'Turn any song into a vocal-only version. Free browser-based tools.', toolsHTML());
  h += subsCard('Spotify, But for Muslims', 'Halal streaming apps to replace your music library.', spotifyHTML());
  h += subsCard('Nasheed Artists', 'Clean vocals and powerful words, sung for Allah without the beat. ' + SUBS_CONTENT.nasheedArtists.length + ' artists to explore.', artistsHTML());
  h += subsCard('Podcast Directory', 'Islamic podcasts and talks, sorted by what you love. ' + SUBS_CONTENT.podcasts.length + ' categories.', podcastsHTML());
  h += '</div>';
  return h;
}

function subsToggle(head) {
  var card = head.closest('.subs-card');
  if (!card) return;
  var wasOpen = card.classList.contains('open');
  var wrap = head.closest('.subs-wrap');
  if (wrap) {
    var open = wrap.querySelectorAll('.subs-card.open');
    for (var i = 0; i < open.length; i++) {
      if (open[i] !== card) open[i].classList.remove('open');
    }
  }
  if (!wasOpen) card.classList.add('open');
}

function subsContentInit() {
  var heads = document.querySelectorAll('.subs-head');
  for (var i = 0; i < heads.length; i++) {
    heads[i].onclick = function () { subsToggle(this); };
  }
  var first = document.querySelector('.subs-card');
  if (first) first.classList.add('open');
}
