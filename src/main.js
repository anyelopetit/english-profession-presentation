import 'reveal.js/dist/reveal.css'
import './style.css'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import Reveal from 'reveal.js'
import { scenes, backgrounds } from './scenes.js'
import { createSpark } from './spark.js'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const pad = n => String(n).padStart(2, '0')

const background = act => `data-background-gradient="${backgrounds[act]}"`

const sectionMarkup = scene => `
  <section data-scene="${scene.id}" data-act="${scene.act}" ${background(scene.act)}>
    <div class="scene scene--${scene.id} act-${scene.act}">
      <div class="copy">
        <p class="kicker">${scene.kicker}</p>
        <h1>${scene.title}</h1>
        ${scene.role ? `<p class="role">${scene.role}</p>` : ''}
        <p class="body">${scene.body}</p>
        ${scene.outro ? `<p class="outro">${scene.outro}</p>` : ''}
      </div>
      <div class="visual visual--${scene.id}">${scene.visual()}</div>
    </div>
    <aside class="notes">${scene.notes}</aside>
  </section>`

document.querySelector('#app').innerHTML = `
  <header class="chrome">
    <span class="brand">Anyelo Petit</span>
    <span class="status" id="status" role="status">PLAYING</span>
    <span class="counter" id="counter">01 / ${pad(scenes.length)}</span>
    <button class="notes-toggle" id="notesToggle" type="button" aria-expanded="false" aria-controls="notesPanel">notes</button>
  </header>
  <div class="reveal"><div class="slides">${scenes.map(sectionMarkup).join('')}</div></div>
  <aside class="notes-panel" id="notesPanel" aria-hidden="true">
    <span class="notes-label">Speaker notes</span>
    <p aria-live="polite"></p>
  </aside>`

const revealEl = document.querySelector('.reveal')
const statusEl = document.querySelector('#status')
const counterEl = document.querySelector('#counter')
const notesToggle = document.querySelector('#notesToggle')
const notesPanel = document.querySelector('#notesPanel')
const notesText = notesPanel.querySelector('p')

const deck = new Reveal(revealEl, {
  width: 1920,
  height: 1080,
  margin: 0,
  minScale: 0.05,
  maxScale: 3,
  center: false,
  controls: false,
  progress: false,
  slideNumber: false,
  hash: true,
  overview: true,
  keyboard: false,
  touch: false,
  help: false,
  scrollActivationWidth: null,
  // GSAP owns every movement; Reveal only handles layout, hash, and overview.
  transition: 'none',
  backgroundTransition: 'fade',
})

let spark
let locked = true
let activeTimeline
// Elements (other than the spark) that continue into the next scene, e.g. the portrait from 01 to 02.
let pendingHandoff = null
const HANDOFF_PROPS = 'borderTopLeftRadius,borderTopRightRadius,borderBottomLeftRadius,borderBottomRightRadius'

function setStatus(status) {
  statusEl.textContent = status
  document.body.dataset.status = status.toLowerCase()
}

function unlock() {
  locked = false
  setStatus('READY')
}

function render(section) {
  const index = deck.getIndices(section).h
  counterEl.textContent = `${pad(index + 1)} / ${pad(scenes.length)}`
  notesText.textContent = scenes[index].notes
  document.body.dataset.act = section.dataset.act
}

// Only the scene on stage plays its product video, from the start of its story segment.
function syncVideos(section) {
  for (const video of document.querySelectorAll('.reveal video')) {
    if (section.contains(video) && !deck.isOverview() && !reducedMotion.matches) {
      const rewind = () => { video.currentTime = Number(video.dataset.start) || 0 }
      if (video.readyState >= 1) rewind()
      else video.addEventListener('loadedmetadata', rewind, { once: true })
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }
}

// Several scenes use different parts of the same clip, so each one loops only its segment.
for (const video of document.querySelectorAll('.reveal video')) {
  video.addEventListener('timeupdate', () => {
    const end = Number(video.dataset.end)
    if (end && video.currentTime >= end) video.currentTime = Number(video.dataset.start) || 0
  })
}

const copyItems = section => section.querySelectorAll('.copy > *')
const visualItems = section => section.querySelectorAll('.visual, .visual .vi, .visual .anim')
const layers = section => section.querySelectorAll('.visual .vi')

function enterScene(section, { flip }) {
  activeTimeline?.kill()
  const handoff = flip ? pendingHandoff : null
  pendingHandoff = null
  render(section)
  syncVideos(section)
  // A scene may have been left mid-animation; start its entrance from a clean state.
  gsap.set([...copyItems(section), ...visualItems(section)], { clearProps: 'opacity,visibility,transform' })

  if (deck.isOverview()) {
    spark.hide()
    unlock()
    return
  }

  locked = true
  setStatus('PLAYING')
  const anchor = section.querySelector('.spark-anchor')
  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: unlock })

  if (!anchor) spark.hide()
  else if (flip && spark.visible) timeline.add(spark.flipTo(anchor), 0)
  else timeline.add(spark.appearAt(anchor), 0.45)

  const continuing = handoff
    ? [...section.querySelectorAll('[data-flip-id]')].filter(el => handoff.ids.includes(el.dataset.flipId))
    : []
  if (continuing.length) {
    timeline.add(Flip.from(handoff.state, { targets: continuing, duration: 0.9, ease: 'power3.inOut', props: HANDOFF_PROPS }), 0)
  }

  timeline.from(copyItems(section), { autoAlpha: 0, y: 32, duration: 0.6, stagger: 0.08 }, 0.15)
  // A card that holds a continuing element must stay visible, or the element would fade with it.
  if (!continuing.length) timeline.from(section.querySelector('.visual'), { autoAlpha: 0, duration: 0.5 }, 0.2)
  const entering = [...layers(section)].filter(el => !continuing.includes(el))
  if (entering.length) timeline.from(entering, { autoAlpha: 0, y: 24, duration: 0.6, stagger: 0.06 }, 0.3)

  scenes[deck.getIndices(section).h].enter?.(timeline, section)

  activeTimeline = timeline
  if (reducedMotion.matches) timeline.progress(1)
}

function go(direction) {
  if (deck.isOverview()) {
    direction > 0 ? deck.next() : deck.prev()
    return
  }
  if (locked) return

  const target = deck.getIndices().h + direction
  if (target < 0 || target >= scenes.length) return

  locked = true
  setStatus('TRANSITION')
  const current = deck.getCurrentSlide()
  const nextIds = [...deck.getSlide(target).querySelectorAll('[data-flip-id]')].map(el => el.dataset.flipId)
  const continuing = [...current.querySelectorAll('[data-flip-id]')].filter(el => nextIds.includes(el.dataset.flipId))
  const leaving = [...layers(current)].filter(el => !continuing.includes(el))

  // Exits are shorter than entrances. The spark and continuing elements stay visible and move on the next scene.
  activeTimeline = gsap.timeline({
    defaults: { ease: 'power2.in' },
    onComplete: () => {
      pendingHandoff = continuing.length
        ? { state: Flip.getState(continuing, { props: HANDOFF_PROPS }), ids: continuing.map(el => el.dataset.flipId) }
        : null
      deck.slide(target)
    },
  })
    .to(copyItems(current), { autoAlpha: 0, y: -20 * direction, duration: 0.3, stagger: 0.03 }, 0)
  if (leaving.length) activeTimeline.to(leaving, { autoAlpha: 0, y: -16 * direction, duration: 0.3, stagger: 0.02 }, 0)
  if (!continuing.length) activeTimeline.to(current.querySelector('.visual'), { autoAlpha: 0, duration: 0.3 }, 0.1)

  if (reducedMotion.matches) activeTimeline.progress(1)
}

function toggleNotes() {
  const open = document.body.classList.toggle('show-notes')
  notesToggle.setAttribute('aria-expanded', String(open))
  notesPanel.setAttribute('aria-hidden', String(!open))
}

// Handle for checking scene state from the browser console during development.
if (import.meta.env.DEV) window.presentation = { deck, gsap }

deck.initialize().then(() => {
  spark = createSpark(revealEl.querySelector('.slides'))
  enterScene(deck.getCurrentSlide(), { flip: false })

  deck.on('slidechanged', event => enterScene(event.currentSlide, { flip: true }))
  deck.on('overviewshown', () => enterScene(deck.getCurrentSlide(), { flip: false }))
  deck.on('overviewhidden', () => enterScene(deck.getCurrentSlide(), { flip: false }))
})

window.addEventListener('keydown', event => {
  if (event.metaKey || event.ctrlKey || event.altKey || !spark) return
  const key = event.key
  if (key === 'ArrowRight' || key === ' ' || key === 'PageDown') {
    event.preventDefault()
    go(1)
  } else if (key === 'ArrowLeft' || key === 'PageUp') {
    event.preventDefault()
    go(-1)
  } else if (key === 'o' || key === 'O') {
    deck.toggleOverview()
  } else if (key === 'Escape' && deck.isOverview()) {
    deck.toggleOverview(false)
  } else if (key === 'n' || key === 'N') {
    toggleNotes()
  }
})

// Clicking a slide in overview selects it; it must not also advance the story.
let pointerStartedInOverview = false
revealEl.addEventListener('pointerdown', () => { pointerStartedInOverview = deck.isOverview() }, true)
revealEl.addEventListener('click', () => {
  if (spark && !pointerStartedInOverview && !deck.isOverview()) go(1)
})
notesToggle.addEventListener('click', toggleNotes)
