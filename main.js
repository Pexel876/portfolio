import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// Videos live in Google Drive; `id` is the Drive file id, `t` the local thumbnail.
const FEATURED = [
  { id: '1boCG9h6pWd6yVEN_V6KT_80Sk-u0_cW7', t: 'fortis', brand: 'Fortis', title: 'Healthcare brand film', cat: 'Brand film', ar: '16/9' },
  { id: '1onX6FjfreyUtiZiEuMQ0iMojIICNIUVo', t: 'rapido', brand: 'Rapido', title: 'First Ride Free · Malayalam', cat: 'Regional ad', ar: '16/9' },
  { id: '1eLX0Il_pBFYpQr2J7oWdheJWG6xPnqie', t: 'bajaj', brand: 'Bajaj Finance', title: 'Performance ad', cat: 'Performance', ar: '9/16' },
  { id: '1V3rffGMq9NC6wABlhl6GIJQVvSfhFPmB', t: 'tide', brand: 'Tide', title: 'Brand campaign edit', cat: 'Campaign', ar: '16/9' },
  { id: '1hlH-GJ48dwTMWqj3w2QCkhA17S2ft5yS', t: 'scapia3', brand: 'Scapia', title: 'Travel card ad', cat: 'Performance', ar: '9/16' },
  { id: '1jco6IQmtSa_8EZNa7bJlA4HeoL8wqCc2', t: 'odonil', brand: 'Odonil', title: 'Music-led product spot', cat: 'Product', ar: '9/16' },
  { id: '1KXNnHQyEeEhaGAa48hulDl36B8c-BNah', t: 'sharemarket', brand: 'Share.Market', title: 'Stocks explainer', cat: 'Explainer', ar: '9/16' },
  { id: '1I2qfGsz9D_wdPAHTFR1ZqjZyM3G05jdW', t: 'rcu-ai', brand: 'AI Film', title: 'Generated retail story', cat: 'AI video', ar: '9/16' },
  { id: '1YCsCUaVhHq-Tu-JlIrN-qTTAy2ocWwv5', t: 'char1', brand: 'AI Character', title: '3D character series', cat: 'AI animation', ar: '9/16' },
  { id: '181E72mhoCZjwUVxJa1fzKgI2OGOp0-L8', t: 'motion', brand: 'Motion Study', title: 'Abstract motion graphics', cat: 'Motion', ar: '16/9' },
];

const CUTS = [
  { id: '1YIiRUJwFxWh0qNKAUzs4igUfsO_TYo_W', t: 'scapia5', title: 'Scapia · Script 5', cat: 'ad' },
  { id: '1Wjqdjj7jGO9aqKxB90Rcmelg6Oo5LXgU', t: 'emi', title: 'EMI overdue? · With AI', cat: 'ai' },
  { id: '1eLv3Yn5szenVVj2hOQ9tg8zVzCCCO_GP', t: 's11', title: 'Family finance story', cat: 'ad' },
  { id: '1onM3YWzgn6MZDKb5Ji2TSS9gZiqxm6Hj', t: 'offer', title: 'Double offer promo', cat: 'social' },
  { id: '1hy2vA6W9yB5nCyMUsRXktyxn9tBr-QKD', t: 'refund', title: 'Refund fraud awareness', cat: 'social' },
  { id: '17euC7S6LF7I6dmInQGc5QRaokkRKiH7R', t: 'college', title: 'College PC tips', cat: 'social' },
  { id: '1CcFfw_3xGX4O_VoVOUWwR9lLnTgpeG6G', t: 'teaser', title: 'Brand motion teaser', cat: 'social' },
  { id: '1ckDb6IDCsDRREwL0onu_qxm4mXaeMUPF', t: 'char2', title: 'AI character · Ep 2', cat: 'ai' },
  { id: '1dzyqP_lRWRDdYCKT_5Sb_fr9kb_lSjwH', t: 'char3', title: 'AI character · Ep 3', cat: 'ai' },
  { id: '1_9jagvDaMZMzIB5EcEwCczDD8wvqumLe', t: 'smbajaj', title: 'Bajaj · Social media cut', cat: 'ad' },
  { id: '1StejyyspUcmlRiuVcKO6bJFvxXC9HbzP', t: 'ccr', title: 'CCR script 3b', cat: 'ad' },
  { id: '1ukmPLmDseylK3aLeMjYeF_WcplrpYljB', t: 'agr25', title: 'Service ad · Script 25', cat: 'ad' },
  { id: '1fcvvVVFuAa-T6UGYL39NsZxX55EDryQE', t: 'agr16', title: 'Service ad · Script 16', cat: 'ad' },
  { id: '1tFQrofgw8P5HYA_EQBR7SsGY4tWcCrNL', t: 'rcu-noai', title: 'Retail story · Without AI', cat: 'ad' },
];
const CAT_LABEL = { ad: 'Performance ad', ai: 'AI video', social: 'Social' };

const BEHANCE = [
  ['perf', 'Video Editing & Performance Ads', '216011881/Video-Editing-Performance-marketing-ads'],
  ['product', 'Product Motion Graphic', '245790211/Product-Motion-Graphic'],
  ['talking', 'Talking Head Videos', '247295807/Talking-Head-Videos'],
  ['aereel', 'After Effects Showreel', '171418909/After-effect-showreel'],
  ['prreel', 'Premiere Pro Showreel', '167392639/Premiere-pro-Showreel'],
  ['explainer', 'YouTube Explainer Video', '176773959/YouTube-explainer-video'],
  ['podcast', 'Podcast Intro', '202548741/Podcast-Intro'],
  ['logo', 'Logo Intro', '181708161/Logo-intro'],
  ['graphic', 'Graphic Designing', '216013149/Graphic-Designing'],
];

// Months are counted from Jan 2022 (0). `to` is exclusive.
const m = (y, mo) => (y - 2022) * 12 + (mo - 1);
const T0 = m(2022, 11), T1 = m(2026, 10);
const JOBS = [
  { from: m(2022, 11), to: m(2023, 11), c: '#495057', role: 'Freelance Video Editor & Motion Designer', co: 'Self-employed · Remote', dates: 'Nov 2022 – Nov 2023',
    pts: ['End-to-end post-production for 30+ international and domestic clients.', 'Brand teasers, event recaps and viral Reels/Shorts.'] },
  { from: m(2023, 11), to: m(2024, 7), c: '#1c7ed6', role: 'Executive Video Editor & Graphic Designer', co: 'MyCareerPathshala · Delhi', dates: 'Nov 2023 – Jun 2024',
    pts: ['Visual modules for 15+ online courses and social channels.', 'Raised student engagement and lesson completion.', 'AI transcription and subtitles across the video library.'] },
  { from: m(2024, 7), to: m(2025, 4), c: '#7048e8', role: 'Executive Video Editor & Graphic Designer', co: 'V2Infotech Agency · Noida', dates: 'Jul 2024 – Apr 2025',
    pts: ['50+ commercial promos and ad campaigns across D2C, tech and retail.', 'AI-driven grading, relighting and rotoscoping in After Effects.', 'Consistent brand look across mixed-source footage.'] },
  { from: m(2025, 4), to: m(2026, 5), c: '#0ca678', role: 'Executive Video Editor', co: 'EXLY · New Delhi', dates: 'Apr 2025 – Apr 2026',
    pts: ['80+ short and long-form videos for leading YouTube and Instagram creators.', 'Script-to-video AI pipelines that tripled weekly output.', 'Ad variants in Meta Ads Manager that lifted average ROAS.'] },
  { from: m(2026, 5), to: T1, c: '#ff3b2f', role: 'Senior AI Video Specialist & Team Lead', co: 'TrueFan.AI · Gurgaon', dates: 'May 2026 – Present',
    pts: ['Lead a 5-person editing team with final quality sign-off.', 'AI pipelines (Seedance 2.0, Kling, RunwayML, HeyGen, ElevenLabs) cut turnaround by 40%.', 'Direct motion and pacing for performance ads on Meta, YouTube and Instagram.'] },
];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

/* ------------------------------------------------------------------ */
/* Build DOM                                                           */
/* ------------------------------------------------------------------ */

const track = $('#work-track');
track.innerHTML = FEATURED.map((v, i) => `
  <button class="card" data-play="${i}" data-cursor="play" style="--ar:${v.ar}" aria-label="Play ${v.brand}: ${v.title}">
    <div class="card__media">
      <img src="assets/thumbs/${v.t}.jpg" alt="" loading="lazy" />
      <span class="card__idx">${String(i + 1).padStart(2, '0')} / ${String(FEATURED.length).padStart(2, '0')}</span>
      <span class="card__play"></span>
    </div>
    <div class="card__info">
      <div><div class="card__brand">${v.brand}</div><div class="card__title">${v.title}</div></div>
      <span class="card__cat">${v.cat}</span>
    </div>
  </button>`).join('') + `<div class="card card--end"><p>14 more cuts<br/><em>just below ↓</em></p></div>`;

$('#cuts-grid').innerHTML = CUTS.map((v, i) => `
  <button class="cut" data-cut="${i}" data-cat="${v.cat}" data-cursor="play" aria-label="Play ${v.title}">
    <div class="cut__media"><img src="assets/thumbs/${v.t}.jpg" alt="" loading="lazy" /></div>
    <div class="cut__txt"><b>${v.title}</b><span>${CAT_LABEL[v.cat]}</span></div>
  </button>`).join('');

$('#archive-grid').innerHTML = BEHANCE.map(([img, name, path]) => `
  <a class="bh" href="https://www.behance.net/gallery/${path}" target="_blank" rel="noopener" data-cursor="link">
    <div class="bh__media"><img src="assets/behance/${img}.jpg" alt="${name} on Behance" loading="lazy" /></div>
    <div class="bh__row">${name}<span>Behance ↗</span></div>
  </a>`).join('');

// NLE timeline
const span = T1 - T0;
const pct = (mo) => ((mo - T0) / span) * 100;
$('#nle-ruler').innerHTML = [2023, 2024, 2025, 2026].map((y) => `<span style="left:${pct(m(y, 1))}%">${y}</span>`).join('');
$('#lane-v').innerHTML = JOBS.map((j, i) => `
  <div class="clip" data-job="${i}" style="--c:${j.c};left:${pct(j.from)}%;width:calc(${pct(j.to) - pct(j.from)}% - 3px)">
    <b>${j.co.split(' · ')[0]}</b><span>${j.dates}</span>
  </div>`).join('');
const wave = (n, seed) => {
  let d = '', s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const h = 4 + (s / 233280) * 18 * (0.6 + 0.4 * Math.sin(i / 3));
    d += `M${i * 2} ${24 - h}h1.2v${h * 2}h-1.2z`;
  }
  return `<svg viewBox="0 0 ${n * 2} 48" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
};
$('#lane-a').innerHTML = JOBS.map((j, i) => `
  <div class="clip clip--audio" style="left:${pct(j.from)}%;width:calc(${pct(j.to) - pct(j.from)}% - 3px)">${wave(Math.round((j.to - j.from) * 6), i * 97 + 13)}</div>`).join('');
$('#lane-e').innerHTML = `<div class="clip clip--edu" style="left:0;width:calc(${pct(m(2023, 7))}% - 3px)"><b>MAAC · Diploma DP+ (completed Jun 2023)</b></div>`;

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */

let lenis = null;
if (!reduced && window.Lenis) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop();
}
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const target = a.getAttribute('href') === '#top' ? 0 : $(a.getAttribute('href'));
  if (target === null) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else if (target === 0) scrollTo({ top: 0 });
  else target.scrollIntoView();
}));

/* ------------------------------------------------------------------ */
/* Clocks + scroll timecode                                            */
/* ------------------------------------------------------------------ */

const ist = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
const tick = () => {
  const now = ist.format(new Date());
  $('#hero-clock').textContent = `${now} IST`;
  $('#foot-clock').textContent = `Gurgaon ${now} IST`;
};
tick();
setInterval(tick, 1000);

const tc = (sec, fps = 25) => {
  const f = Math.floor(sec * fps);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(Math.floor(f / (fps * 3600)))}:${p(Math.floor(f / (fps * 60)) % 60)}:${p(Math.floor(f / fps) % 60)}:${p(f % fps)}`;
};
const RUNTIME = 150; // the whole page "plays" as a 2:30 sequence
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate: (s) => {
    $('#scroll-tc').textContent = tc(s.progress * RUNTIME);
    $('#scroll-bar').style.width = `${s.progress * 100}%`;
  },
});

/* ------------------------------------------------------------------ */
/* Hero: a tunnel of real frames                                       */
/* ------------------------------------------------------------------ */

const THUMBS = [...FEATURED.map((v) => v.t), ...CUTS.map((v) => v.t)];
const hero = { progress: 0, mx: 0, my: 0, active: true };
const manager = new THREE.LoadingManager();
let renderer = null;

function initScene() {
  const canvas = $('#scene');
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a0b);
  scene.fog = new THREE.Fog(0x0a0a0b, 6, 34);
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 80);
  camera.position.set(0, 0, 8);

  const loader = new THREE.TextureLoader(manager);
  const textures = {};
  THUMBS.forEach((t) => {
    textures[t] = loader.load(`assets/thumbs/${t}.jpg`, (tex) => { tex.colorSpace = THREE.SRGBColorSpace; });
  });

  const COUNT = 48, GAP = 2.7;
  const planes = [];
  const frameGeo = new THREE.PlaneGeometry(1, 1);
  for (let i = 0; i < COUNT; i++) {
    const key = THUMBS[i % THUMBS.length];
    const src = [...FEATURED, ...CUTS].find((v) => v.t === key);
    const wide = src.ar === '16/9';
    const h = wide ? 1.7 : 2.6;
    const w = wide ? h * (16 / 9) : h * (9 / 16);
    const mat = new THREE.MeshBasicMaterial({ map: textures[key], transparent: true, opacity: 0.92 });
    const mesh = new THREE.Mesh(frameGeo, mat);
    mesh.scale.set(w, h, 1);
    const ang = i * 2.39996 + 0.6; // golden angle keeps the centre clear and the spiral even
    const r = 3.6 + ((i * 37) % 11) / 11 * 2.4;
    mesh.userData = { ang, r, z: 2 - i * GAP, phase: i * 1.7 };
    scene.add(mesh);
    planes.push(mesh);
  }

  let xs = 1.4;
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    xs = camera.aspect < 1 ? 0.55 : 1.45;
  };
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => {
    hero.mx = e.clientX / innerWidth - 0.5;
    hero.my = e.clientY / innerHeight - 0.5;
  });

  const depth = COUNT * GAP;
  let camZ = 8;
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!hero.active) return;
    const t = clock.getElapsedTime();
    camZ += (8 - hero.progress * (depth - 6) - camZ) * 0.08;
    camera.position.z = camZ;
    camera.position.x += (hero.mx * 1.2 - camera.position.x) * 0.04;
    camera.position.y += (-hero.my * 0.8 - camera.position.y) * 0.04;
    camera.rotation.z = hero.progress * 0.9 + Math.sin(t * 0.2) * 0.02;
    for (const p of planes) {
      const u = p.userData;
      p.position.set(Math.cos(u.ang) * u.r * xs, Math.sin(u.ang) * u.r * 0.85 + Math.sin(t * 0.6 + u.phase) * 0.12, u.z);
      p.rotation.y = -Math.cos(u.ang) * 0.35;
      p.rotation.x = Math.sin(u.ang) * 0.2;
      // Frames brighten as the camera approaches, then fade before passing through it
      const d = camZ - u.z;
      p.material.opacity = d < 0.6 ? 0 : Math.min(0.95, (d - 0.6) * 0.6);
    }
    renderer.render(scene, camera);
  });
  return true;
}

const sceneOk = initScene();
new IntersectionObserver(([e]) => { hero.active = e.isIntersecting; }).observe($('#hero'));

/* ------------------------------------------------------------------ */
/* Loader → intro                                                      */
/* ------------------------------------------------------------------ */

document.body.classList.add('is-loading');
const started = performance.now();
let loadP = 0;
manager.onProgress = (_, loaded, total) => { loadP = loaded / total; };
const loaded = new Promise((res) => {
  manager.onLoad = res;
  if (!sceneOk) res();
  setTimeout(res, 6000); // never hold the page hostage to a slow image
});
let shown = 0;
const loaderTick = () => {
  const minP = Math.min(1, (performance.now() - started) / 1600);
  const target = Math.min(loadP, minP);
  shown += (target - shown) * 0.2;
  $('#loader-tc').textContent = tc(shown * 4);
  $('#loader-pct').textContent = `${Math.round(shown * 100)}%`;
  $('#loader-bar').style.width = `${shown * 100}%`;
};
gsap.ticker.add(loaderTick);

loaded.then(async () => {
  loadP = 1;
  await new Promise((r) => setTimeout(r, Math.max(0, 1700 - (performance.now() - started))));
  gsap.ticker.remove(loaderTick);
  $('#loader-tc').textContent = tc(4);
  $('#loader-pct').textContent = '100%';
  $('#loader-bar').style.width = '100%';
  gsap.to('.loader', { yPercent: -100, duration: 1, ease: 'expo.inOut', delay: 0.2, onComplete: () => $('.loader').remove() });
  document.body.classList.remove('is-loading');
  lenis?.start();
  intro();
});

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*/<>0123456789';
function scramble(el, delay = 0) {
  const final = el.textContent;
  if (reduced) return;
  const state = { p: 0 };
  gsap.to(state, {
    p: 1, duration: 1.3, delay, ease: 'power2.out',
    onUpdate: () => {
      const n = Math.floor(state.p * final.length);
      el.textContent = final.slice(0, n) + [...final.slice(n)].map((c) => (c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
    },
    onComplete: () => { el.textContent = final; },
  });
}

function intro() {
  $$('[data-scramble]').forEach((el, i) => scramble(el, 0.55 + i * 0.15));
  gsap.from('.hero__name span', { yPercent: 40, opacity: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12, delay: 0.5 });
  gsap.from(['.hero__stage--intro .eyebrow', '.hero__meta', '.nav', '.playhead'], { opacity: 0, y: 16, duration: 1, stagger: 0.08, delay: 0.9 });
}

/* ------------------------------------------------------------------ */
/* Scroll choreography                                                 */
/* ------------------------------------------------------------------ */

// Hero: camera travel + three text beats
const heroTl = gsap.timeline({
  defaults: { ease: 'none' },
  scrollTrigger: {
    trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate: (s) => { hero.progress = s.progress; },
  },
});
heroTl
  .to('.hero__stage--intro', { opacity: 0, y: -80, duration: 0.12 }, 0.06)
  .to('.hero__stage--line', { opacity: 1, duration: 0.01 }, 0.22)
  .from('.hero__stage--line span', { opacity: 0, yPercent: 60, filter: 'blur(12px)', stagger: 0.05, duration: 0.1 }, 0.22)
  .to('.hero__stage--line', { opacity: 0, scale: 1.08, duration: 0.08 }, 0.5)
  .to('.hero__stage--stats', { opacity: 1, duration: 0.1 }, 0.62)
  .from('.hero__stage--stats p', { scale: 0.85, duration: 0.1 }, 0.62)
  .to('.hero__stage--stats', { opacity: 0, duration: 0.08 }, 0.84)
  .to('#scene', { opacity: 0, duration: 0.08 }, 0.92);

// About: words light up
const about = $('[data-words]');
about.innerHTML = about.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
gsap.to('.about__text .w', {
  opacity: 1, stagger: 0.05, ease: 'none',
  scrollTrigger: { trigger: about, start: 'top 80%', end: 'bottom 45%', scrub: true },
});

// Stat counters
$$('[data-count]').forEach((el) => {
  const obj = { v: 0 };
  gsap.to(obj, {
    v: +el.dataset.count, duration: 1.8, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onUpdate: () => { el.textContent = Math.round(obj.v) + el.dataset.suffix; },
  });
});

// Selected work: vertical scroll drives a horizontal reel
const workDist = () => Math.max(0, track.scrollWidth - innerWidth);
gsap.to(track, {
  x: () => -workDist(), ease: 'none',
  scrollTrigger: {
    trigger: '#work', start: 'top top', end: () => `+=${workDist()}`,
    pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
    onUpdate: (s) => {
      const i = Math.min(FEATURED.length, Math.floor(s.progress * FEATURED.length) + 1);
      $('#work-count').textContent = `${String(i).padStart(2, '0')} / ${FEATURED.length}`;
    },
  },
});

// Section reveals
$$('.h2, .label, .ai__lede, .services__list li, .cuts__grid, .archive__grid, .contact__actions, .contact__mail').forEach((el) => {
  if (el.closest('.hero') || el.closest('.work__head') || el.closest('.exp__pin')) return;
  gsap.from(el, { opacity: 0, y: 40, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
});
gsap.from('.contact__title span', {
  yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.1,
  scrollTrigger: { trigger: '.contact__title', start: 'top 80%', once: true },
});
gsap.from('.phone', { y: 80, opacity: 0, rotate: (i) => (i ? 4 : -4), duration: 1.3, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: '.ai__compare', start: 'top 80%', once: true } });

// AI pipeline line draws across the steps
// (on narrow screens the steps stack, so the line runs vertically)
const vertical = matchMedia('(max-width: 900px)').matches;
const pipeLine = $('.pipeline__line line');
if (vertical) {
  $('.pipeline__line').setAttribute('viewBox', '0 0 2 100');
  Object.entries({ x1: 1, y1: 0, x2: 1, y2: 100 }).forEach(([k, v]) => pipeLine.setAttribute(k, v));
}
const axis = vertical ? 'y2' : 'x2';
gsap.fromTo(pipeLine, { attr: { [axis]: 0 } }, {
  attr: { [axis]: 100 }, ease: 'none',
  scrollTrigger: { trigger: '.pipeline', start: 'top 80%', end: 'bottom 60%', scrub: true },
});
$$('.pipeline li').forEach((li, i) => {
  gsap.from(li, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.pipeline', start: `top ${80 - i * 6}%`, once: true } });
});

// Experience: playhead scrubs across the career timeline
const clips = $$('#lane-v .clip');
const head = $('#nle-head');
let activeJob = -1;
function setJob(i) {
  if (i === activeJob) return;
  activeJob = i;
  const j = JOBS[i];
  clips.forEach((c, k) => c.classList.toggle('is-active', k === i));
  const body = $('.monitor__body');
  gsap.fromTo(body, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  $('#mon-role').textContent = j.role;
  $('#mon-co').textContent = `${j.co} · ${j.dates}`;
  $('#mon-pts').innerHTML = j.pts.map((p) => `<li>${p}</li>`).join('');
  $('#mon-seq').textContent = j.co.split(' · ')[0].replace(/\W+/g, '_');
}
setJob(0);
ScrollTrigger.create({
  trigger: '#experience', start: 'top top', end: 'bottom bottom', scrub: true,
  onUpdate: (s) => {
    const lane = $('#lane-v');
    const x = s.progress * lane.clientWidth;
    head.style.transform = `translateX(${x}px)`;
    const mo = T0 + s.progress * span * 0.999;
    const mi = Math.floor(mo);
    $('#mon-tc').textContent = `${MONTHS[mi % 12]} ${2022 + Math.floor(mi / 12)}`;
    setJob(Math.max(0, JOBS.findIndex((j) => mo >= j.from && mo < j.to)));
  },
});

/* ------------------------------------------------------------------ */
/* Filter chips                                                        */
/* ------------------------------------------------------------------ */

$$('.chip').forEach((chip) => chip.addEventListener('click', () => {
  $$('.chip').forEach((c) => c.classList.toggle('is-active', c === chip));
  const f = chip.dataset.filter;
  const show = $$('.cut').filter((c) => f === 'all' || c.dataset.cat === f);
  $$('.cut').forEach((c) => { c.hidden = !show.includes(c); });
  gsap.fromTo(show, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' });
  ScrollTrigger.refresh();
}));

/* ------------------------------------------------------------------ */
/* Player                                                              */
/* ------------------------------------------------------------------ */

const player = $('#player');
const frame = $('#player-frame');
const drive = (id) => `https://drive.google.com/file/d/${id}/preview`;
let lastFocus = null;

function sizeFrame(ar) {
  const [w, h] = ar.split('/').map(Number);
  const maxW = innerWidth - 32, maxH = innerHeight - 140;
  let fw = maxW, fh = (fw * h) / w;
  if (fh > maxH) { fh = maxH; fw = (fh * w) / h; }
  frame.style.width = `${fw}px`;
  frame.style.height = `${fh}px`;
}
function openPlayer(id, ar, caption) {
  lastFocus = document.activeElement;
  frame.dataset.ar = ar;
  sizeFrame(ar);
  frame.innerHTML = `<iframe src="${drive(id)}" allow="autoplay; fullscreen" allowfullscreen title="${caption}"></iframe>`;
  $('#player-cap').textContent = caption;
  player.hidden = false;
  lenis?.stop();
  gsap.fromTo(player, { opacity: 0 }, { opacity: 1, duration: 0.35 });
  gsap.fromTo(frame, { scale: 0.92 }, { scale: 1, duration: 0.6, ease: 'expo.out' });
  $('.player__close').focus();
}
function closePlayer() {
  gsap.to(player, {
    opacity: 0, duration: 0.25, onComplete: () => {
      player.hidden = true;
      frame.innerHTML = '';
      lenis?.start();
      lastFocus?.focus();
    },
  });
}
addEventListener('resize', () => { if (!player.hidden) sizeFrame(frame.dataset.ar); });
$('.player__close').addEventListener('click', closePlayer);
player.addEventListener('click', (e) => { if (e.target === player) closePlayer(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !player.hidden) closePlayer(); });

track.addEventListener('click', (e) => {
  const card = e.target.closest('[data-play]');
  if (!card) return;
  const v = FEATURED[card.dataset.play];
  openPlayer(v.id, v.ar, `${v.brand} · ${v.title}`);
});
$('#cuts-grid').addEventListener('click', (e) => {
  const cut = e.target.closest('[data-cut]');
  if (!cut) return;
  const v = CUTS[cut.dataset.cut];
  openPlayer(v.id, '9/16', v.title);
});
// The AI comparison plays inline, inside the phone frames
$$('.phone').forEach((ph) => ph.querySelector('.phone__play').addEventListener('click', () => {
  ph.querySelector('.phone__screen').innerHTML = `<iframe src="${drive(ph.dataset.video)}" allow="autoplay; fullscreen" allowfullscreen title="${ph.querySelector('figcaption').textContent}"></iframe>`;
}));

/* ------------------------------------------------------------------ */
/* Cursor                                                              */
/* ------------------------------------------------------------------ */

if (matchMedia('(pointer: fine)').matches) {
  const cur = $('.cursor');
  const xTo = gsap.quickTo(cur, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cur, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY); });
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest('[data-cursor], a, button, .phone__play');
    cur.classList.toggle('is-play', !!t && (t.dataset.cursor === 'play' || t.classList.contains('phone__play')));
    cur.classList.toggle('is-link', !!t && !cur.classList.contains('is-play'));
  });
}

addEventListener('load', () => ScrollTrigger.refresh());
