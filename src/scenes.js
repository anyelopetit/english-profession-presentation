const photo = name => import.meta.env.BASE_URL + 'photos/' + name

// Where the shared spark lands in a scene, in px inside the 900×720 visual box.
const anchor = (shape, x, y, w, h = w) =>
  `<i class="spark-anchor" data-shape="${shape}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></i>`

const svg = path =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`

const icons = {
  phone: svg('<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>'),
  map: svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10" r="2.4"/>'),
  chat: svg('<path d="M4 5.5h16v10H9l-5 4z"/>'),
  shop: svg('<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>'),
  person: svg('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/>'),
  feedback: svg('<path d="M4 5.5h16v10H9l-5 4z"/><path d="M8.5 10.5h7"/>'),
  goal: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
  growth: svg('<path d="M4 18l5.5-5.5 3.5 3.5L20 9"/><path d="M15 9h5v5"/>'),
}

const visuals = {
  hero: () => `
    <div class="arch vi"></div>
    <img class="portrait vi" src="${photo('portrait-studio.jpg')}" alt="Anyelo Petit smiling with arms crossed in his home office">
    ${anchor('dot', 40, 170, 120)}`,

  memories: () => `
    <img class="memory memory-one vi" src="${photo('travel-house.png')}" alt="Anyelo in front of a stone house while travelling">
    <img class="memory memory-two vi" src="${photo('ski.png')}" alt="Anyelo skiing in the snowy mountains">
    ${anchor('route', 250, 50, 420, 250)}`,

  everywhere: () => `
    <div class="orbit-ring vi"></div>
    ${[['phone', 'phone', 394, 44], ['map', 'maps', 654, 304], ['chat', 'chat', 394, 564], ['shop', 'shop', 134, 304]]
      .map(([icon, label, x, y]) => `<div class="orbit-item vi" style="left:${x}px;top:${y}px"><span class="icon">${icons[icon]}</span><b>${label}</b></div>`)
      .join('')}
    ${anchor('dot', 380, 290, 140)}`,

  architect: () => `
    <div class="blueprint-grid"></div>
    <div class="blueprint-frame vi"><span>an idea</span></div>
    <div class="blueprint-dim vi">1920 × 1080</div>
    ${anchor('dot', 176, 166, 92)}`,

  method: () => `
    <div class="method-line vi"></div>
    ${['Question', 'Sketch', 'Build', 'Improve']
      .map((label, i) => `<div class="step vi" style="left:${80 + i * 210}px"><b>0${i + 1}</b><span>${label}</span></div>`)
      .join('')}
    ${anchor('dot', 109, 150, 72)}`,

  visitor: () => `
    <div class="store-window vi">
      <div class="store-bar"><i></i><i></i><i></i><span>my-store.com</span></div>
      <div class="product-image"></div>
      <div class="product-copy"><strong>Blue sneakers</strong><span>$120</span></div>
      <div class="question-badge" aria-label="The visitor has a question">?</div>
    </div>
    ${anchor('dot', 690, 470, 84)}`,

  hellotext: () => `
    <div class="bubble bubble-coral vi">Hello! Can I help you?</div>
    <div class="assistant vi" aria-hidden="true"><i></i><i></i><b></b></div>
    ${anchor('bubble', 560, 360, 220, 120)}`,

  timing: () => `
    <div class="timeline-line vi"></div>
    ${['Visit', 'Question', 'Message', 'Action']
      .map((label, i) => `<div class="moment vi${i === 2 ? ' is-now' : ''}" style="left:${85 + i * 210}px"><b>${i + 1}</b><span>${label}</span></div>`)
      .join('')}
    ${anchor('dot', 519, 196, 72)}`,

  team: () => `
    <svg class="team-links vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="M225 235 L450 360 L675 235 M450 360 L450 540"/>
    </svg>
    ${[['Design', 150, 160], ['Product', 600, 160], ['Engineering', 375, 470]]
      .map(([label, x, y]) => `<div class="team-node vi" style="left:${x}px;top:${y}px"><span></span><b>${label}</b></div>`)
      .join('')}
    ${anchor('core', 375, 285, 150)}`,

  bridge: () => `
    <div class="bridge-label vi">conversation</div>
    <div class="person vi" style="left:90px">${icons.person}<b>a store</b></div>
    <div class="person vi" style="left:620px">${icons.person}<b>a visitor</b></div>
    ${anchor('line', 290, 357, 320, 6)}`,

  network: () => `
    <svg class="network-links vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="M450 360 L200 170 M450 360 L700 170 M450 360 L140 430 M450 360 L760 430 M450 360 L320 610 M450 360 L580 610 M200 170 L140 430 M700 170 L760 430 M320 610 L580 610"/>
    </svg>
    ${[[200, 170], [700, 170], [140, 430], [760, 430], [320, 610], [580, 610]]
      .map(([x, y]) => `<span class="network-node vi" style="left:${x - 44}px;top:${y - 44}px">${icons.person}</span>`)
      .join('')}
    ${anchor('dot', 390, 300, 120)}`,

  rankmi: () => `
    <svg class="growth-line vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="M70 640 C 320 620, 430 470, 560 380 S 760 200, 820 150"/>
    </svg>
    <div class="growth-card vi">
      <span>People</span>
      <strong>connected</strong>
      <small>Feedback · Goals · Growth</small>
    </div>
    ${anchor('dot', 784, 114, 72)}`,

  progress: () => `
    ${[['feedback', 'Feedback'], ['goal', 'Goals'], ['growth', 'Progress']]
      .map(([icon, label], i) => `<div class="progress-card vi" style="left:${50 + i * 280}px"><span class="icon">${icons[icon]}</span><b>${label}</b>${i === 2 ? '<i class="bar"><i></i></i>' : ''}</div>`)
      .join('')}
    ${anchor('dot', 766, 166, 68)}`,

  purpose: () => `
    <div class="word word-complex vi">complex</div>
    <div class="purpose-arrow vi" aria-hidden="true">→</div>
    <div class="word word-clear vi">clear</div>
    ${anchor('dot', 380, 470, 140)}`,

  ending: () => `
    <div class="orbit-ring orbit-ring--final vi"></div>
    ${anchor('final', 320, 230, 260)}`,
}

export const scenes = [
  {
    id: 'hero', theme: 'dark', kicker: '01 · The spark',
    title: 'My profession', role: 'Software Developer',
    body: 'From ideas to useful digital experiences.',
    notes: 'Introduce yourself and explain that a small idea can become a useful digital experience.',
  },
  {
    id: 'memories', theme: 'dark', kicker: '02 · Who I am',
    title: 'People first, technology second',
    body: 'Curiosity helps me keep learning and building.',
    notes: 'Mention that curiosity and learning are part of your professional life.',
  },
  {
    id: 'everywhere', theme: 'dark', kicker: '03 · Everyday life',
    title: 'Software is everywhere',
    body: 'We use software to buy, talk, travel, and work.',
    notes: 'Ask the class for one example of software they used today.',
  },
  {
    id: 'architect', theme: 'dark', kicker: '04 · The digital architect',
    title: 'I build digital spaces',
    body: 'I turn an idea into something people can use.',
    notes: 'Compare a software developer with an architect: an architect designs buildings, I design digital spaces.',
  },
  {
    id: 'method', theme: 'dark', kicker: '05 · The method',
    title: 'From problem to solution',
    body: 'Understand. Design. Build. Improve.',
    notes: 'Explain the four steps with one simple project example.',
  },
  {
    id: 'visitor', theme: 'dark', kicker: '06 · A visitor',
    title: 'Imagine an online store',
    body: 'A visitor has a question before buying.',
    notes: 'Describe a visitor who needs help before buying something online.',
  },
  {
    id: 'hellotext', theme: 'warm', kicker: '07 · Hellotext',
    title: 'The right message',
    body: 'Useful conversations help stores support visitors.',
    notes: 'Explain that Hellotext helps stores start useful conversations with visitors.',
  },
  {
    id: 'timing', theme: 'warm', kicker: '08 · Timing',
    title: 'The right moment',
    body: 'A clear message should arrive when it can help.',
    notes: 'Emphasize that a helpful message must arrive at the right moment, not too early and not too late.',
  },
  {
    id: 'team', theme: 'warm', kicker: '09 · My role',
    title: 'Building with a team',
    body: 'Design, product, and engineering solve problems together.',
    notes: 'Explain how design, product, and engineering collaborate to build one product.',
  },
  {
    id: 'bridge', theme: 'warm', kicker: '10 · The bridge',
    title: 'Technology connects people',
    body: 'Good tools make communication easier.',
    notes: 'Connect the message with the human goal: clearer communication.',
  },
  {
    id: 'network', theme: 'light', kicker: '11 · Rankmi',
    title: 'A company is a network',
    body: 'People need information, feedback, goals, and support.',
    notes: 'Introduce a company as a group of connected people and information.',
  },
  {
    id: 'rankmi', theme: 'light', kicker: '12 · Rankmi',
    title: 'Technology helps people grow',
    body: 'One place can make work experiences clearer.',
    notes: 'Explain that Rankmi organizes processes about people, goals, feedback, and professional growth.',
  },
  {
    id: 'progress', theme: 'light', kicker: '13 · Progress',
    title: 'A better conversation',
    body: 'Feedback and goals help people understand their progress.',
    notes: 'Give an example: with feedback and clear goals, a person understands their progress better.',
  },
  {
    id: 'purpose', theme: 'light', kicker: '14 · Why it matters',
    title: 'Code has a human purpose',
    body: 'I make difficult tasks simpler for real people.',
    notes: 'Make the key point: code matters because it simplifies real tasks.',
  },
  {
    id: 'ending', theme: 'dark', kicker: '15 · The returning spark',
    title: 'Ideas become experiences',
    body: 'Thank you.',
    notes: 'Return to the opening spark: everything starts with an idea, and my job is to turn it into something people can use. Thank the class.',
  },
].map(scene => ({ ...scene, visual: visuals[scene.id] }))

export const backgrounds = {
  dark: 'radial-gradient(circle at 72% 28%, #133777 0%, #07142e 48%, #040b1c 100%)',
  warm: '#fff4ee',
  light: '#edf5ff',
}
