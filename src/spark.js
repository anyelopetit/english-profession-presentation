import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(Flip)

// Styles that change between shapes. Flip interpolates them together with size and position.
const FLIP_PROPS = [
  'backgroundColor', 'boxShadow', 'fontSize',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
].join(',')

const SHAPES_WITHOUT_GLYPH = new Set(['route', 'line'])

// The spark takes the accent color of each act: Anyelo's blue, Hellotext's orange, Rankmi's coral
// (Rankmi also adds its pink-to-yellow gradient through CSS, see .spark[data-tone='rankmi']).
const TONES = {
  anyelo: '40, 135, 255',
  hellotext: '255, 85, 0',
  bridge: '255, 85, 0',
  rankmi: '255, 93, 44',
}
const NO_SHADOW = 'rgba(0, 0, 0, 0) 0px 0px 0px 0px'

// Every shape sets every tweened property with the same units and single-value radii
// (computed styles collapse "r r" to "r"), so Flip can interpolate between any two shapes.
function shapeStyle(shape, tone, width, height) {
  const ACCENT = TONES[tone] || TONES.anyelo
  const round = `${Math.min(width, height) / 2}px`
  const style = {
    backgroundColor: `rgba(${ACCENT}, 1)`,
    boxShadow: `rgba(${ACCENT}, 0.55) 0px 0px 48px 6px`,
    fontSize: Math.round(Math.min(width, height) * 0.5),
    borderTopLeftRadius: round, borderTopRightRadius: round, borderBottomLeftRadius: round, borderBottomRightRadius: round,
    borderTopWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0,
    borderTopColor: `rgba(${ACCENT}, 0)`, borderRightColor: `rgba(${ACCENT}, 0)`, borderBottomColor: `rgba(${ACCENT}, 0)`, borderLeftColor: `rgba(${ACCENT}, 0)`,
  }
  if (shape === 'core') {
    Object.assign(style, { boxShadow: `rgba(${ACCENT}, 0.45) 0px 0px 64px 10px` })
  }
  if (shape === 'final') {
    Object.assign(style, { boxShadow: `rgba(${ACCENT}, 0.6) 0px 0px 140px 36px` })
  }
  if (shape === 'bubble') {
    Object.assign(style, {
      boxShadow: `rgba(${ACCENT}, 0.35) 0px 24px 48px 0px`,
      fontSize: Math.round(height * 0.45),
      borderTopLeftRadius: '44px', borderTopRightRadius: '44px', borderBottomRightRadius: '44px', borderBottomLeftRadius: '12px',
    })
  }
  if (shape === 'route') {
    Object.assign(style, {
      backgroundColor: `rgba(${ACCENT}, 0)`, boxShadow: NO_SHADOW,
      borderTopWidth: 5, borderRightWidth: 5, borderBottomWidth: 5, borderLeftWidth: 5,
      borderTopColor: `rgba(${ACCENT}, 1)`, borderRightColor: `rgba(${ACCENT}, 1)`, borderLeftColor: `rgba(${ACCENT}, 1)`,
    })
  }
  if (shape === 'line') {
    Object.assign(style, {
      backgroundColor: `rgba(${ACCENT}, 0)`, boxShadow: NO_SHADOW,
      borderTopLeftRadius: '0px', borderTopRightRadius: '0px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px',
      borderTopWidth: height, borderTopColor: `rgba(${ACCENT}, 1)`,
    })
  }
  return style
}

// The spark is a single element that lives beside the slides, so it is never duplicated,
// hidden by a slide change, or scaled by a scene's entrance animation.
export function createSpark(container) {
  const el = document.createElement('div')
  el.className = 'spark'
  el.dataset.flipId = 'spark'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = '<span class="spark-glyph">✦</span>'
  container.appendChild(el)
  const glyph = el.firstChild
  gsap.set(el, { autoAlpha: 0 })

  // Anchor position relative to the slides container. Offsets ignore transforms, so the
  // result is stable while Reveal scales the stage or a scene is mid-animation.
  function measure(anchor) {
    let x = 0, y = 0, node = anchor
    while (node && node !== container) {
      x += node.offsetLeft + (node.offsetParent?.clientLeft || 0)
      y += node.offsetTop + (node.offsetParent?.clientTop || 0)
      node = node.offsetParent
    }
    return { left: x, top: y, width: anchor.offsetWidth, height: anchor.offsetHeight }
  }

  function applyAnchor(anchor) {
    const box = measure(anchor)
    const shape = anchor.dataset.shape
    const tone = anchor.closest('[data-act]')?.dataset.act || 'anyelo'
    el.dataset.shape = shape
    el.dataset.tone = tone
    gsap.set(el, { ...box, x: 0, y: 0, scale: 1, rotation: 0, ...shapeStyle(shape, tone, box.width, box.height) })
    return shape
  }

  return {
    el,

    // Morph from the current shape and place into the anchor of the next scene.
    flipTo(anchor, { duration = 0.9 } = {}) {
      const state = Flip.getState(el, { props: FLIP_PROPS })
      const shape = applyAnchor(anchor)
      return gsap.timeline()
        .add(Flip.from(state, { duration, ease: 'power3.inOut', props: FLIP_PROPS }), 0)
        .to(glyph, { autoAlpha: SHAPES_WITHOUT_GLYPH.has(shape) ? 0 : 1, duration: duration * 0.5 }, SHAPES_WITHOUT_GLYPH.has(shape) ? 0 : duration * 0.5)
    },

    // First appearance, e.g. on load or when leaving overview mode.
    appearAt(anchor) {
      const shape = applyAnchor(anchor)
      gsap.set(glyph, { autoAlpha: SHAPES_WITHOUT_GLYPH.has(shape) ? 0 : 1 })
      return gsap.fromTo(el,
        { autoAlpha: 0, scale: 0.2, rotation: -30 },
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.75, ease: 'back.out(1.8)' })
    },

    hide() {
      gsap.killTweensOf([el, glyph])
      gsap.set(el, { autoAlpha: 0 })
    },

    get visible() {
      return el.style.visibility !== 'hidden'
    },
  }
}
