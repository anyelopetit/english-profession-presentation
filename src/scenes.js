const asset = path => import.meta.env.BASE_URL + path
const photo = name => asset('photos/' + name)

// Muted product clips. Reveal loads them when their scene is near; main.js plays only the one on
// stage and loops the [start, end] segment that tells that scene's story.
const video = (name, label, start = 0, end = 0) =>
  `<video data-src="${asset('video/' + name)}" data-start="${start}" data-end="${end}" muted loop playsinline preload="auto" aria-label="${label}"></video>`

// Where the shared spark lands in a scene, in px inside the 900×720 visual box.
const anchor = (shape, x, y, w, h = w) =>
  `<i class="spark-anchor" data-shape="${shape}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></i>`

const at = (x, y) => `left:${x}px;top:${y}px`

const svg = path =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`

const icons = {
  feedback: svg('<path d="M4 5.5h16v10H9l-5 4z"/><path d="M8.5 10.5h7"/>'),
  goal: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
  growth: svg('<path d="M4 18l5.5-5.5 3.5 3.5L20 9"/><path d="M15 9h5v5"/>'),
  check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
  wallet: svg('<rect x="3.5" y="6" width="17" height="13" rx="2.5"/><path d="M15.5 12.5h5"/><path d="M6 6l9-3 1.5 3"/>'),
  sprout: svg('<path d="M12 21v-9"/><path d="M12 12c0-4 3-6.5 7.5-6.5 0 4.5-3 6.5-7.5 6.5z"/><path d="M12 14c0-3.5-2.5-5.5-6.5-5.5 0 4 2.5 5.5 6.5 5.5z"/>'),
  heart: svg('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z"/>'),
  sparkles: svg('<path d="M10 3.5l1.6 4.9 4.9 1.6-4.9 1.6L10 16.5l-1.6-4.9L3.5 10l4.9-1.6z"/><path d="M18 14l.8 2.2 2.2.8-2.2.8L18 20l-.8-2.2-2.2-.8 2.2-.8z"/>'),
  globe: svg('<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5s1.1-6.1 3.5-8.5z"/>'),
  refresh: svg('<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4v4.5H15"/>'),
  users: svg('<circle cx="9" cy="8.5" r="3.3"/><path d="M3 19.5c.9-3.4 3.2-5 6-5s5.1 1.6 6 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M16.5 14.6c2.3.2 3.9 1.8 4.5 4.4"/>'),
}

// Outline of the Hellotext "10% off" pop-up, drawn to the same proportions as the real editor
// screenshot. Scene 03 draws it as a blueprint; scene 06 lays it over the finished product.
const wireframe = className => `
  <svg class="wireframe ${className}" viewBox="0 0 370 622" aria-hidden="true">
    <rect class="draw" x="2" y="2" width="366" height="618" rx="30" pathLength="1"/>
    <path class="draw" d="M2 212 H368" pathLength="1"/>
    <circle class="draw" cx="340" cy="30" r="16" pathLength="1"/>
    <path class="draw" d="M110 380 H260" pathLength="1"/>
    <rect class="draw" x="33" y="440" width="304" height="43" rx="10" pathLength="1"/>
    <rect class="draw" x="33" y="518" width="304" height="57" rx="28" pathLength="1"/>
  </svg>`

// Scene 02: pins for the teammates' countries; Uruguay is where most of the team is.
const AVATAR_CENTER = [220, 310]
const pins = [
  { label: 'Mexico', x: 560, y: 60 },
  { label: 'Colombia', x: 640, y: 190 },
  { label: 'Uruguay', x: 600, y: 330, main: true },
  { label: 'Chile', x: 500, y: 480 },
]
const pinDot = ({ x, y, main }) => (main ? [x + 50, y + 46] : [x + 29, y + 29])

const visuals = {
  hero: () => `
    <div class="arch vi"></div>
    <img class="portrait vi" data-flip-id="portrait" src="${photo('portrait-studio.jpg')}" alt="Anyelo Petit smiling with arms crossed at his desk at home">
    ${anchor('dot', 40, 170, 120)}`,

  office: () => `
    <svg class="route-lines vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="${pins.map(pin => `M${AVATAR_CENTER.join(' ')} L${pinDot(pin).join(' ')}`).join(' ')}"/>
    </svg>
    <img class="avatar vi" data-flip-id="portrait" src="${photo('portrait-studio.jpg')}" alt="Anyelo at his desk at home">
    ${pins.map(pin => `<div class="pin vi${pin.main ? ' pin--main' : ''}" style="${at(pin.x, pin.y)}"><i></i>${pin.label}</div>`).join('')}
    <div class="day vi">${['Plan', 'Code', 'Meet', 'Test', 'Ship'].map(step => `<span>${step}</span>`).join('')}</div>
    ${anchor('dot', 622, 348, 56)}`,

  architect: () => `
    <div class="blueprint-grid"></div>
    <div class="blueprint-plan vi">
      ${wireframe('wireframe--plan')}
      <span class="blueprint-label anim">10% off</span>
    </div>
    <div class="blueprint-dim vi">a plan</div>
    ${anchor('dot', 250, 40, 70)}`,

  maria: () => `
    <div class="video-frame vi">${video('hellotext-shopping.mp4', 'Maria asks the Crocs store on WhatsApp for clogs in cool colors, gets options, and buys a pair', 1.8, 12.4)}</div>
    ${anchor('bubble', 640, 560, 200, 110)}`,

  night: () => `
    <div class="video-frame vi">${video('hellotext-shopping.mp4', 'At 1:47 in the morning a sneaker store sends a message, and the customer adds a product to the cart', 22, 31)}</div>
    ${anchor('dot', 770, 26, 100)}`,

  building: () => `
    <svg class="team-links vi" viewBox="0 0 900 720" aria-hidden="true">
      <path d="M150 60 L820 580 M750 60 L820 580 M180 670 L820 580"/>
    </svg>
    <div class="shot-frame vi">
      <img class="anim" src="${asset('brand/hellotext-builder.jpg')}" alt="The Hellotext editor for a pop-up that offers 10% off the next purchase">
      ${wireframe('wireframe--echo anim')}
    </div>
    ${[['Design', 30, 24], ['Product', 640, 24], ['Engineering', 40, 634]]
      .map(([label, x, y]) => `<div class="role-chip vi" style="${at(x, y)}"><i></i>${label}</div>`)
      .join('')}
    ${anchor('core', 772, 532, 96)}`,

  people: () => `
    <div class="video-frame video-frame--short vi">${video('hellotext-inbox.mp4', 'Rachel asks to return shoes in the wrong color; the AI writes a summary and a person from the store solves it', 1, 17.5)}</div>
    <div class="csat vi"><i></i>Customer satisfaction <b>100%</b></div>
    <div class="side vi" style="${at(60, 560)}"><img src="${asset('brand/hellotext-logo.png')}" alt="Hellotext"><b>customers</b></div>
    <div class="side vi" style="${at(620, 560)}"><img src="${asset('brand/rankmi-logo.svg')}" alt="Rankmi"><b>teams</b></div>
    ${anchor('line', 300, 614, 300, 6)}`,

  paper: () => `
    <img class="brand-logo brand-logo--rankmi vi" src="${asset('brand/rankmi-logo.svg')}" alt="Rankmi">
    <div class="sheet sheet--back vi"></div>
    <div class="sheet sheet--middle vi"></div>
    <div class="sheet sheet--front vi"><span>Salaries</span><span>Vacations</span><span>Reviews</span></div>
    <div class="app-card vi">
      ${['Salaries', 'Vacations', 'Reviews'].map(item => `<span><i>${icons.check}</i>${item}</span>`).join('')}
    </div>
    <div class="stats vi">
      <div><strong>+2M</strong><span>users</span></div>
      <div><strong>+1.5K</strong><span>companies</span></div>
      <div><strong>+14</strong><span>countries</span></div>
    </div>
    ${anchor('dot', 400, 265, 100)}`,

  modules: () => `
    ${[
      ['wallet', 'Payroll', 'Get paid correctly', 'blue', 40, 40],
      ['sprout', 'Talent', 'Grow in your career', 'green', 460, 40],
      ['heart', 'Culture', 'Feel good at work', 'yellow', 40, 380],
      ['sparkles', 'AI', 'Less repetitive work', 'pink', 460, 380],
    ]
      .map(([icon, title, text, tone, x, y]) => `<div class="module module--${tone} vi" style="${at(x, y)}"><span class="icon">${icons[icon]}</span><b>${title}</b><span>${text}</span></div>`)
      .join('')}
    ${anchor('dot', 405, 315, 90)}`,

  conversation: () => `
    ${[['feedback', 'Feedback', 'pink'], ['goal', 'Goals', 'blue'], ['growth', 'Progress', 'green']]
      .map(([icon, label, tone], i) => `<div class="progress-card progress-card--${tone} vi" style="left:${50 + i * 280}px"><span class="icon">${icons[icon]}</span><b>${label}</b>${i === 2 ? '<i class="bar"><i></i></i>' : ''}</div>`)
      .join('')}
    ${anchor('dot', 766, 166, 68)}`,

  love: () => `
    <div class="word word-complex vi">complex</div>
    <div class="word word-clear vi">clear</div>
    ${[['globe', 'No borders'], ['refresh', 'Always new'], ['users', 'People use it'], ['sparkles', 'The AI era']]
      .map(([icon, label], i) => `<div class="love-card vi" style="left:${40 + i * 210}px"><span class="icon">${icons[icon]}</span><b>${label}</b></div>`)
      .join('')}
    ${anchor('dot', 385, 91, 110)}`,

  ending: () => `
    <div class="orbit-ring orbit-ring--final vi"></div>
    ${anchor('final', 320, 230, 260)}`,
}

// Extra choreography for scenes that need more than the shared entrance.
const entrances = {
  architect(timeline, section) {
    timeline
      .fromTo(section.querySelectorAll('.wireframe--plan .draw'),
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, stagger: 0.09, ease: 'power2.inOut' }, 0.45)
      .from(section.querySelector('.blueprint-label'), { autoAlpha: 0, duration: 0.5 }, 1.2)
  },

  // The blueprint from scene 03 fades away as the real product appears underneath it.
  building(timeline, section) {
    timeline
      .from(section.querySelector('.shot-frame img'), { autoAlpha: 0, duration: 0.8 }, 0.75)
      .to(section.querySelector('.wireframe--echo'), { autoAlpha: 0, duration: 0.8 }, 1.05)
  },
}

export const scenes = [
  {
    id: 'hero', act: 'anyelo', kicker: '01 · Hello',
    title: 'Hi, I’m Anyelo', role: 'Software Developer',
    body: 'Every app starts as an idea. I build them.',
    notes: 'Good morning, everyone. My name is Anyelo Petit, and I’m a software developer. Before I start, a quick question: how many apps did you use today before this class? (Wait for answers.) WhatsApp, Google Maps, Instagram, maybe your bank app. Every one of those apps started as a small idea, and somebody had to build it. That is my job. Today I want to show you what I build, and why I love it.',
  },
  {
    id: 'office', act: 'anyelo', kicker: '02 · My team',
    title: 'My office is my home',
    body: 'My team works from Uruguay, Chile, Mexico, and Colombia.',
    notes: 'My office is my home. You can see it in the photo: my desk, my computer, and my screens. But my team is not here. My teammates live in Uruguay, Chile, Mexico, and Colombia, and most of them are in Uruguay. We talk every day on video calls and chat. A normal day has five steps: I plan my tasks, I write code, which is a list of instructions for the computer, I meet with my team, I test my work, and I ship it. “Ship” means that real people can start using it.',
  },
  {
    id: 'architect', act: 'anyelo', kicker: '03 · My job',
    title: 'An architect for things you can’t touch',
    body: 'An architect designs houses. I design websites and apps.',
    notes: 'The easiest way to explain my job is with a comparison. An architect designs a house: where the doors are, where the kitchen is, and how people move inside. I do the same thing, but my “houses” are websites and apps. You can’t touch them, but you use them every day. Like an architect, I start with a plan. Look at this plan: it’s a small message for an online store. Remember it, because you will see it again in a few minutes.',
  },
  {
    id: 'maria', act: 'hellotext', kicker: '04 · Hellotext · today',
    title: 'Maria has a question',
    body: 'She writes to the store on WhatsApp. The answer arrives in seconds.',
    notes: 'This is where I work today: Hellotext. Let me show you a real example. This is Maria. She wants new clogs, so she writes to the Crocs store on WhatsApp: “Can you help me find great price clogs? And in cool colors!” In a few seconds, she gets an answer with different options. She chooses one and buys it. Hellotext helps online stores answer their customers quickly, with the help of artificial intelligence.',
  },
  {
    id: 'night', act: 'hellotext', kicker: '05 · Hellotext · today',
    title: '1:47 in the morning',
    body: 'The store is closed, but the right message arrives. Stores sell while they sleep.',
    notes: 'Now look at the time: it’s 1:47 in the morning. The store is closed and everybody is sleeping. But this customer bought new sneakers, so the store sends a useful message: “We have some clothes that go really well with your new sneakers.” The message is not random. It arrives at the right moment, for the right person. That’s why we say: stores sell while they sleep.',
  },
  {
    id: 'building', act: 'hellotext', kicker: '06 · My work',
    title: 'What I’m building right now',
    body: 'A tool to create messages like “10% off”, without writing code.',
    notes: 'So, what is my part? Remember the plan from the architect slide? This is the real building. Right now, I’m building this tool. It helps a store create its own messages, like “10% off your next purchase”, without writing any code. The store can see how the message looks on a phone before it goes live. And I don’t build it alone: a designer decides how it looks, a product manager decides what the stores need, and engineers like me make it work.',
  },
  {
    id: 'people', act: 'bridge', kicker: '07 · People',
    title: 'Technology helps people help people',
    body: 'The AI writes a summary. A person answers. The customer is happy.',
    notes: 'Here is another real example. Rachel’s shoes arrived in the wrong color, so she wants to return them. The artificial intelligence reads the conversation and writes a short summary. But a person from the store answers her and solves the problem. In the end, the customer is 100% satisfied. Technology doesn’t replace people. It helps people help other people. And people inside a company need the same thing. That brings me to the company where I worked before.',
  },
  {
    id: 'paper', act: 'rankmi', kicker: '08 · Rankmi · before',
    title: 'No more <em>paper</em> for HR',
    body: 'Before Hellotext, I worked at Rankmi. More than 2 million people use it.',
    notes: 'Before Hellotext, I worked at Rankmi. Imagine a company with two thousand employees. Every month there are salaries to pay, vacations to approve, and goals to review. For many years, companies did all of this with paper and spreadsheets. It was slow, and it was easy to make mistakes. Rankmi puts all of this online. Today, more than two million people in fourteen countries use it.',
  },
  {
    id: 'modules', act: 'rankmi', kicker: '09 · Rankmi · before',
    title: 'Everything about people, in <em>one place</em>',
    body: 'Get paid correctly. Grow in your career. Feel good at work.',
    notes: 'Rankmi has four big parts, and each one helps people at work. Payroll: you get paid correctly and on time. Talent: you can grow in your career. Culture: the company listens to you and recognizes your work, so you feel good at work. And artificial intelligence does the repetitive tasks, so people have more time for other people.',
  },
  {
    id: 'conversation', act: 'rankmi', kicker: '10 · Rankmi · before',
    title: 'A better <em>conversation</em>',
    body: 'Feedback and goals help people see their progress.',
    notes: 'Imagine you work there. During the year, your manager gives you feedback. You can see your goals and your progress at any moment. So when you meet your manager, you don’t talk about old memories. You talk about facts, and you know exactly what to do next. The software doesn’t replace the conversation. It makes the conversation better.',
  },
  {
    id: 'love', act: 'anyelo', kicker: '11 · Why',
    title: 'Why I love my job',
    body: 'Technology makes complicated problems simple.',
    notes: 'Maria, Rachel, and the employees at Rankmi all had a complicated problem, and technology made it simple. That’s why I love my job. There are no borders: I work with people from different countries. It’s always new: I learn something every week. Real people use what I build. And now, with artificial intelligence, it’s a very exciting time to be a developer.',
  },
  {
    id: 'ending', act: 'anyelo', kicker: '12 · Thank you',
    title: 'I don’t just write code.',
    body: 'I build things people use.',
    outro: 'Thank you! Questions?',
    notes: 'At the beginning, I said that every app starts with a small idea. My job is to take that idea and turn it into something useful for real people. So, I don’t just write code. I build things people use. Thank you very much. Do you have any questions?',
  },
].map(scene => ({ ...scene, visual: visuals[scene.id], enter: entrances[scene.id] }))

// Reveal backgrounds per act: Anyelo's night blue, Hellotext's pink, Rankmi's bright white-blue.
export const backgrounds = {
  anyelo: 'radial-gradient(circle at 72% 28%, #133777 0%, #07142e 48%, #040b1c 100%)',
  hellotext: 'radial-gradient(circle at 78% 22%, #eee5ff 0%, #ffdef2 58%)',
  bridge: 'linear-gradient(90deg, #ffdef2 0%, #f3f5f9 100%)',
  rankmi: 'radial-gradient(circle at 82% 18%, #cfe7fd 0%, #f3f5f9 46%, #ffffff 100%)',
}
