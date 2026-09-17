const asset = path => import.meta.env.BASE_URL + path
const photo = name => asset('photos/' + name)

// Muted product loops. Reveal loads them when their scene is near; main.js plays only the one on stage.
const video = (name, label) =>
  `<video data-src="${asset('video/' + name)}" muted loop playsinline preload="auto" aria-label="${label}"></video>`

const networkNodes = [[230, 200], [670, 200], [160, 380], [740, 380], [330, 490], [570, 490]]

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
    <div class="browser vi">
      <div class="browser-bar"><i></i><i></i><i></i><span>your-store.com</span></div>
      ${video('hellotext-shopping.mp4', 'A shopper asks about Crocs clogs and then buys them')}
    </div>
    <div class="question-badge vi" role="img" aria-label="The visitor has a question">?</div>
    ${anchor('dot', 580, 566, 84)}`,

  hellotext: () => `
    <img class="brand-logo brand-logo--hellotext vi" src="${asset('brand/hellotext-logo.png')}" alt="Hellotext">
    <div class="phone vi">${video('hellotext-inbox.mp4', 'A store answers a customer in the Hellotext inbox')}</div>
    <div class="bubble bubble-hello vi">Hello! Can I help&nbsp;you?</div>
    ${anchor('bubble', 610, 430, 220, 120)}`,

  timing: () => `
    <div class="video-frame vi">${video('hellotext-playbooks.mp4', 'Hellotext playbooks turn on and customers start buying')}</div>
    <div class="timeline-line vi"></div>
    ${['Visit', 'Question', 'Message', 'Action']
      .map((label, i) => `<div class="moment vi${i === 2 ? ' is-now' : ''}" style="left:${85 + i * 210}px"><b>${i + 1}</b><span>${label}</span></div>`)
      .join('')}
    ${anchor('dot', 520, 434, 60)}`,

  team: () => `
    <svg class="team-links vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="M170 140 L450 560 L730 140 M450 560 L450 660"/>
    </svg>
    <div class="browser browser--small vi">
      <div class="browser-bar"><i></i><i></i><i></i><span>hellotext.com</span></div>
      <img src="${asset('brand/hellotext-builder.jpg')}" alt="The Hellotext pop-up editor that the team builds">
    </div>
    ${[['Design', 60, 104], ['Product', 600, 104], ['Engineering', 300, 634]]
      .map(([label, x, y]) => `<div class="role-chip vi" style="left:${x}px;top:${y}px"><i></i>${label}</div>`)
      .join('')}
    ${anchor('core', 400, 510, 100)}`,

  bridge: () => `
    <div class="bridge-label vi">conversation</div>
    <div class="person person--hellotext vi" style="left:80px">
      ${icons.person}<b>customers</b>
      <img src="${asset('brand/hellotext-logo.png')}" alt="Hellotext">
    </div>
    <div class="person person--rankmi vi" style="left:630px">
      ${icons.person}<b>teams</b>
      <img src="${asset('brand/rankmi-logo.svg')}" alt="Rankmi">
    </div>
    ${anchor('line', 290, 357, 320, 6)}`,

  network: () => `
    <img class="brand-logo brand-logo--rankmi vi" src="${asset('brand/rankmi-logo.svg')}" alt="Rankmi">
    <svg class="network-links vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="${networkNodes.map(([x, y]) => `M450 330 L${x} ${y}`).join(' ')} M230 200 L160 380 M670 200 L740 380 M330 490 L570 490"/>
    </svg>
    ${networkNodes
      .map(([x, y]) => `<span class="network-node vi" style="left:${x - 40}px;top:${y - 40}px">${icons.person}</span>`)
      .join('')}
    <div class="stats vi">
      <div><strong>+2M</strong><span>users</span></div>
      <div><strong>+1.5K</strong><span>companies</span></div>
      <div><strong>+14</strong><span>countries</span></div>
    </div>
    ${anchor('dot', 395, 275, 110)}`,

  rankmi: () => `
    <svg class="growth-line vi" viewBox="0 0 900 720" aria-hidden="true">
      <defs>
        <linearGradient id="rankmi-growth" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stop-color="#ff66a1"/><stop offset="0.8" stop-color="#ff5d2c"/><stop offset="1" stop-color="#ffb10f"/>
        </linearGradient>
      </defs>
      <path d="M70 640 C 320 620, 430 470, 560 380 S 760 200, 820 150"/>
    </svg>
    <div class="growth-card vi">
      <img class="growth-card__logo" src="${asset('brand/rankmi-logo.svg')}" alt="Rankmi">
      <span>People</span>
      <strong>connected</strong>
      <small>Feedback · Goals · Growth</small>
    </div>
    ${anchor('dot', 784, 114, 72)}`,

  progress: () => `
    ${[['feedback', 'Feedback', 'pink'], ['goal', 'Goals', 'blue'], ['growth', 'Progress', 'green']]
      .map(([icon, label, tone], i) => `<div class="progress-card progress-card--${tone} vi" style="left:${50 + i * 280}px"><span class="icon">${icons[icon]}</span><b>${label}</b>${i === 2 ? '<i class="bar"><i></i></i>' : ''}</div>`)
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
    id: 'hero', act: 'anyelo', kicker: '01 · The spark',
    title: 'My profession', role: 'Software Developer',
    body: 'From ideas to useful digital experiences.',
    notes: 'Introduce yourself and explain that a small idea can become a useful digital experience.',
  },
  {
    id: 'memories', act: 'anyelo', kicker: '02 · Who I am',
    title: 'People first, technology second',
    body: 'Curiosity helps me keep learning and building.',
    notes: 'Mention that curiosity and learning are part of your professional life.',
  },
  {
    id: 'everywhere', act: 'anyelo', kicker: '03 · Everyday life',
    title: 'Software is everywhere',
    body: 'We use software to buy, talk, travel, and work.',
    notes: 'Ask the class for one example of software they used today.',
  },
  {
    id: 'architect', act: 'anyelo', kicker: '04 · The digital architect',
    title: 'I build digital spaces',
    body: 'I turn an idea into something people can use.',
    notes: 'Compare a software developer with an architect: an architect designs buildings, I design digital spaces.',
  },
  {
    id: 'method', act: 'anyelo', kicker: '05 · The method',
    title: 'From problem to solution',
    body: 'Understand. Design. Build. Improve.',
    notes: 'Explain the four steps with one simple project example.',
  },
  {
    id: 'visitor', act: 'hellotext', kicker: '06 · A visitor',
    title: 'Imagine an online store',
    body: 'A visitor has a question before buying.',
    notes: 'Describe a visitor who needs help before buying something online.',
  },
  {
    id: 'hellotext', act: 'hellotext', kicker: '07 · Hellotext',
    title: 'The right message',
    body: 'Useful conversations help stores support visitors.',
    notes: 'Explain that Hellotext helps stores start useful conversations with visitors.',
  },
  {
    id: 'timing', act: 'hellotext', kicker: '08 · Timing',
    title: 'The right moment',
    body: 'A clear message should arrive when it can help.',
    notes: 'Emphasize that a helpful message must arrive at the right moment, not too early and not too late.',
  },
  {
    id: 'team', act: 'hellotext', kicker: '09 · My role',
    title: 'Building with a team',
    body: 'Design, product, and engineering solve problems together.',
    notes: 'Explain how design, product, and engineering collaborate to build one product.',
  },
  {
    id: 'bridge', act: 'bridge', kicker: '10 · The bridge',
    title: 'Technology connects people',
    body: 'Good tools make communication easier.',
    notes: 'Connect the message with the human goal: clearer communication.',
  },
  {
    id: 'network', act: 'rankmi', kicker: '11 · Rankmi',
    title: 'A company is a <em>network</em>',
    body: 'People need information, feedback, goals, and support.',
    notes: 'Introduce a company as a group of connected people and information.',
  },
  {
    id: 'rankmi', act: 'rankmi', kicker: '12 · Rankmi',
    title: 'Technology helps people <em>grow</em>',
    body: 'One place can make work experiences clearer.',
    notes: 'Explain that Rankmi organizes processes about people, goals, feedback, and professional growth.',
  },
  {
    id: 'progress', act: 'rankmi', kicker: '13 · Progress',
    title: 'A better <em>conversation</em>',
    body: 'Feedback and goals help people understand their progress.',
    notes: 'Give an example: with feedback and clear goals, a person understands their progress better.',
  },
  {
    id: 'purpose', act: 'anyelo', kicker: '14 · Why it matters',
    title: 'Code has a human purpose',
    body: 'I make difficult tasks simpler for real people.',
    notes: 'Make the key point: code matters because it simplifies real tasks.',
  },
  {
    id: 'ending', act: 'anyelo', kicker: '15 · The returning spark',
    title: 'Ideas become experiences',
    body: 'Thank you.',
    notes: 'Return to the opening spark: everything starts with an idea, and my job is to turn it into something people can use. Thank the class.',
  },
].map(scene => ({ ...scene, visual: visuals[scene.id] }))

// Reveal backgrounds per act: Anyelo's night blue, Hellotext's pink, Rankmi's bright white-blue.
export const backgrounds = {
  anyelo: 'radial-gradient(circle at 72% 28%, #133777 0%, #07142e 48%, #040b1c 100%)',
  hellotext: 'radial-gradient(circle at 78% 22%, #eee5ff 0%, #ffdef2 58%)',
  bridge: 'linear-gradient(90deg, #ffdef2 0%, #f3f5f9 100%)',
  rankmi: 'radial-gradient(circle at 82% 18%, #cfe7fd 0%, #f3f5f9 46%, #ffffff 100%)',
}
