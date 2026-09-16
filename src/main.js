import './style.css'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'

gsap.registerPlugin(Flip)

const scenes = [
 ['01 / 15 · THE SPARK','My profession','Software Developer','From ideas to useful digital experiences.','hero','/photos/portrait-car.png'],
 ['02 / 15 · WHO I AM','People first, technology second','','Curiosity helps me keep learning and building.','memories','/photos/travel-house.png','/photos/ski.png'],
 ['03 / 15 · EVERYDAY LIFE','Software is everywhere','','We use software to buy, talk, travel, and work.','everywhere'],
 ['04 / 15 · THE DIGITAL ARCHITECT','I build digital spaces','','I turn an idea into something people can use.','architect'],
 ['05 / 15 · THE METHOD','From problem to solution','','Understand. Design. Build. Improve.','method'],
 ['06 / 15 · A VISITOR','Imagine an online store','','A visitor has a question before buying.','visitor'],
 ['07 / 15 · HELLOTEXT','The right message','','Useful conversations help stores support visitors.','hellotext'],
 ['08 / 15 · TIMING','The right moment','','A clear message should arrive when it can help.','timing'],
 ['09 / 15 · MY ROLE','Building with a team','','Design, product, and engineering solve problems together.','team'],
 ['10 / 15 · THE BRIDGE','Technology connects people','','Good tools make communication easier.','bridge'],
 ['11 / 15 · RANKMI','A company is a network','','People need information, feedback, goals, and support.','network'],
 ['12 / 15 · RANKMI','Technology helps people grow','','One place can make work experiences clearer.','rankmi'],
 ['13 / 15 · PROGRESS','A better conversation','','Feedback and goals help people understand their progress.','progress'],
 ['14 / 15 · WHY IT MATTERS','Code has a human purpose','','I make difficult tasks simpler for real people.','purpose'],
 ['15 / 15 · THE RETURNING SPARK','Ideas become experiences','','Thank you.','ending'],
]

const app = document.querySelector('#app')
app.innerHTML = '<main class="stage"><div class="grain"></div><div class="topbar"><span class="brand">ANYELO PETIT</span><span class="status" id="status">READY</span></div><div class="reveal"><div class="slides" id="slides"></div></div><aside class="notes-panel" id="notesPanel" aria-live="polite"><span class="notes-label">SPEAKER NOTES</span><p></p></aside><footer class="controls"><span id="counter"></span><span class="hint">Use ← → or click · <span id="lockHint">scene loading</span></span><button id="speaker" aria-expanded="false">notes</button></footer></main>'
const uiStyle = document.createElement('style')
uiStyle.textContent = '.notes-panel{position:fixed;right:5vw;bottom:70px;z-index:20;width:min(360px,calc(100vw - 40px));padding:18px 20px;border:1px solid #31568e;border-radius:18px;background:#06132deF;box-shadow:0 20px 60px #02081799;opacity:0;transform:translateY(14px);pointer-events:none;transition:opacity .25s ease,transform .25s ease}.notes-label{display:block;color:#55e1c4;font:11px "DM Mono",monospace;letter-spacing:.14em}.notes-panel p{margin:9px 0 0;color:#d5e1f6;font:14px/1.5 "DM Mono",monospace}.show-notes .notes-panel{opacity:1;transform:none;pointer-events:auto}.reveal{height:calc(100svh - 125px)!important;width:100%!important}.reveal .slides{left:0!important;top:0!important;transform:none!important;width:100%!important;height:100%!important}.reveal section{left:0!important;top:0!important}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}'
document.head.appendChild(uiStyle)
const slidesEl = document.querySelector('#slides'), statusEl = document.querySelector('#status'), counterEl = document.querySelector('#counter'), lockHint = document.querySelector('#lockHint')
let index = 0, locked = true, activeTimeline
const spark = '<div class="spark shared" data-id="spark" data-flip-id="spark">✦</div>'
const notes = {
 hero: 'Introduce yourself and explain that a small idea can become a useful digital experience.',
 memories: 'Mention that curiosity and learning are part of your professional life.',
 everywhere: 'Ask the class for one example of software they used today.',
 architect: 'Compare a software developer with an architect who designs spaces for people.',
 method: 'Explain the four words with one simple project example.',
 visitor: 'Describe a visitor who needs help before buying something online.',
 hellotext: 'Explain that Hellotext helps stores start useful conversations with visitors.',
 timing: 'Emphasize that a helpful message must arrive at the right moment.',
 team: 'Explain how design, product, and engineering collaborate.',
 bridge: 'Connect the message with the human goal: clearer communication.',
 network: 'Introduce a company as a group of connected people and information.',
 rankmi: 'Explain that Rankmi connects HR processes and helps people grow at work.',
 progress: 'Give an example of feedback, goals, and progress working together.',
 purpose: 'Make the key point: code matters because it simplifies real tasks.',
 ending: 'Return to the opening idea and thank the class for listening.'
}
const icon = (text, name) => '<span class="icon icon-' + name + '">' + text + '</span>'

function visual(scene) {
 const kind = scene[4]
 if (kind === 'hero') return '<div class="hero-visual"><div class="arch"></div><img class="portrait" src="' + scene[5] + '" alt="Anyelo standing outdoors">' + spark + '</div>'
 if (kind === 'memories') return '<div class="memories-visual"><div class="route shared" data-id="spark" data-flip-id="spark"></div><img class="memory memory-one" src="' + scene[5] + '" alt="Anyelo travelling"><img class="memory memory-two" src="' + scene[6] + '" alt="Anyelo skiing"><span class="stamp">MEMORIES / 02</span></div>'
 if (kind === 'everywhere') return '<div class="orbit-visual"><div class="orbit-ring"></div>' + icon('⌁','phone') + icon('⌖','map') + icon('✦','chat') + icon('□','shop') + spark + '</div>'
 if (kind === 'architect') return '<div class="blueprint-visual"><div class="blueprint-grid"></div><div class="blueprint-card">' + icon('◇','design') + '<span>an idea</span></div>' + spark + '</div>'
 if (kind === 'method') return '<div class="steps-visual">' + ['question','sketch','build','improve'].map((x, i) => '<div class="step"><b>0' + (i + 1) + '</b><span>' + x + '</span></div>').join('') + spark + '</div>'
 if (kind === 'visitor') return '<div class="store-visual"><div class="store-window"><span class="window-dot"></span><span class="window-dot"></span><span class="window-dot"></span><div class="product-block"></div><div class="empty-bubble">?</div></div>' + spark + '</div>'
 if (kind === 'hellotext') return '<div class="chat-visual"><div class="bubble coral">Hello! Can I help you?</div><div class="bubble blue shared" data-id="spark" data-flip-id="spark">✦</div><div class="bot">◡</div></div>'
 if (kind === 'timing') return '<div class="timing-visual"><div class="timeline-line"></div>' + ['visit','question','message','action'].map((x, i) => '<div class="moment"><b>' + (i + 1) + '</b><span>' + x + '</span></div>').join('') + spark + '</div>'
 if (kind === 'team') return '<div class="team-visual">' + ['design','product','engineering'].map(x => '<div class="team-node">' + icon('●',x) + '<span>' + x + '</span></div>').join('') + '<div class="team-core shared" data-id="spark" data-flip-id="spark">✦</div></div>'
 if (kind === 'bridge') return '<div class="bridge-visual"><div class="person-dot"></div><div class="bridge-line shared" data-id="spark" data-flip-id="spark"></div><div class="person-dot"></div><div class="bridge-label">conversation</div></div>'
 if (kind === 'network') return '<div class="network-visual"><div class="nodes">' + Array.from({length:6}, (_,i) => '<i style="--i:' + i + '">●</i>').join('') + '</div>' + spark + '</div>'
 if (kind === 'rankmi') return '<div class="rankmi-visual"><div class="growth-line"></div><div class="rankmi-panel"><span>people</span><strong>connected</strong><small>feedback · goals · growth</small></div>' + spark + '</div>'
 if (kind === 'progress') return '<div class="progress-visual"><div class="progress-card">feedback</div><div class="progress-card">goals</div><div class="progress-card">progress</div>' + spark + '</div>'
 if (kind === 'purpose') return '<div class="purpose-visual"><div class="complex">complex</div><div class="purpose-arrow">→</div><div class="clear">clear</div>' + spark + '</div>'
 return '<div class="ending-visual"><div class="final-spark shared" data-id="spark">✦</div><div class="orbit-ring"></div></div>'
}

function markup(scene) {
 return '<div class="copy"><p class="kicker">' + scene[0] + '</p><h1>' + scene[1] + '</h1>' + (scene[2] ? '<p class="role">' + scene[2] + '</p>' : '') + '<p class="body">' + scene[3] + '</p><div class="speaker-note">' + notes[scene[4]] + '</div></div><div class="visual visual-' + scene[4] + '">' + visual(scene) + '</div><aside class="notes">' + notes[scene[4]] + '</aside>'
}
slidesEl.innerHTML = scenes.map((scene, i) => '<section data-auto-animate data-auto-animate-duration="0.8" data-auto-animate-easing="power2.inOut" data-scene="' + scene[4] + '" data-background-color="' + (i >= 10 ? '#edf5ff' : i >= 6 ? '#fff4ee' : '#07142e') + '">' + markup(scene) + '</section>').join('')
const notesPanel = document.querySelector('#notesPanel p')
function render() { counterEl.textContent = String(index + 1).padStart(2, '0') + ' / 15'; notesPanel.textContent = notes[scenes[index][4]] }
let pendingFlipState = null
function playIntro() {
 activeTimeline?.kill(); locked = true; statusEl.textContent = 'PLAYING'; lockHint.textContent = 'animation in progress'
 const root = deck.getCurrentSlide()
 const flipState = pendingFlipState; pendingFlipState = null
 activeTimeline = gsap.timeline({defaults:{ease:'power3.out'},onComplete:()=>{locked=false;statusEl.textContent='READY';lockHint.textContent='ready for next slide'}})
  .from(root.querySelectorAll('.copy > *'),{autoAlpha:0,y:24,duration:.55,stagger:.08}).from(root.querySelector('.visual'),{autoAlpha:0,scale:.94,duration:.7},'<.2')
 if (flipState) {
   const target = root.querySelector('[data-flip-id="spark"]')
   if (target) { gsap.set(target, {autoAlpha: 0}); Flip.from(flipState, {targets: target, duration: .8, ease: 'power3.inOut', absolute: true, onComplete: () => gsap.set(target, {clearProps: 'transform,opacity,visibility'})}) }
 } else activeTimeline.from(root.querySelectorAll('.shared'),{scale:.2,rotation:-30,autoAlpha:0,duration:.75,ease:'back.out(1.8)'},'<.25')
 if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) activeTimeline.progress(1)
}
function go(direction) {
 if (locked) return
 const next = index + direction; if (next < 0 || next >= scenes.length) return
 locked = true; statusEl.textContent = 'TRANSITION'; lockHint.textContent = 'transition in progress'
 const root = deck.getCurrentSlide()
 const shared = root.querySelector('[data-flip-id="spark"]')
 pendingFlipState = shared ? Flip.getState(shared) : null
 gsap.timeline({onComplete:()=>deck[direction > 0 ? 'next' : 'prev']()})
  .to(root.querySelectorAll('.copy > *, .visual > *:not(.shared)'),{autoAlpha:0,y:direction>0?-18:18,duration:.42,stagger:.025})
  .to(root.querySelectorAll('.shared'),{autoAlpha:0,duration:.3,ease:'power2.inOut'},'<.1')
}
const deck = new Reveal(document.querySelector('.reveal'), { controls:false, progress:false, slideNumber:false, hash:true, overview:true, keyboard:false, touch:false, transition:'fade', backgroundTransition:'fade', center:true, embedded:false, width:'100%', height:'100%', margin:0, minScale:0.2, maxScale:1.4 })
deck.initialize().then(() => { index = deck.getIndices().h; render(); playIntro() })
deck.on('slidechanged', e => { index = e.indexh; render(); playIntro() })
window.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); go(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } if (e.key === 'o' || e.key === 'O') deck.toggleOverview(); if (e.key === 'n' || e.key === 'N') document.querySelector('#speaker').click() })
document.querySelector('.reveal').addEventListener('click', () => go(1))
document.querySelector('#speaker').addEventListener('click', e => { const open = document.body.classList.toggle('show-notes'); e.currentTarget.setAttribute('aria-expanded', String(open)) })
