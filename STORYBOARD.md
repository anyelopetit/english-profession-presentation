# English Profession: cinematic scene direction

## North star

This is a guided visual story, not a scrolling website and not a conventional deck. The audience should feel one idea changing shape until it becomes the next one.

The recurring object is **the blue spark**. It represents an idea. It becomes your profile, everyday software, a browser, a Hellotext message, conversations, an employee network, measurable progress, and finally an illuminated circle.

The presentation must be understandable without prior technology knowledge. Every image explains the sentence being spoken. No code, product UI screenshots, acronyms, or dense diagrams appear on stage.

## Format and visual language

- **Stage:** 16:9, designed at 1920 × 1080.
- **Duration:** 7–9 minutes, plus questions.
- **Color:** midnight `#07111F`, bright blue `#3DADFF`, teal `#5AD8CC`, warm white `#F6F7FB`, soft violet only for Rankmi.
- **Typography:** one calm sans-serif family. Large title, one short sentence at a time.
- **Composition:** the stage is mostly empty. The active object occupies the center; spoken text sits lower-left or lower-center.
- **Movement:** purposeful and readable. Standard ease is `power3.inOut`; no looping motion except the quiet breathing of the spark on the final scene.

## Direction rules

1. An animation starts only when its scene appears or when the presenter advances.
2. Input is locked while a timeline is running. Wheel, swipe, arrows, Space, clicks, and repeated key presses are ignored.
3. After a scene finishes its entrance, it holds still while you speak. The presenter decides when to move forward.
4. Every outgoing object is classified as `exit`, `shared`, or `new`.
5. A `shared` object remains in the global stage, is moved into its next layout, and animates with GSAP Flip. It must never flash, duplicate, or jump.
6. Text never competes with motion. It enters after the main visual has settled.
7. The final frame is motionless for questions.

## Runtime choreography

```text
scene enters
  → lock input
  → play scene.enter timeline
  → unlock input
  → presenter speaks and advances
  → lock input
  → play scene.exit + move shared elements with Flip
  → mount next scene
  → play next scene.enter
  → unlock input
```

The implementation uses **GSAP Timeline** for each phase, **Observer** for mouse wheel and touch gestures, native keyboard handling for `Space`, `ArrowRight`, and `ArrowLeft`, and **Flip** for shared elements. Actual SVG shape morphing is optional and should be used only when it reads clearly; otherwise transform and reparent the same object.

## Scene bible

### 01. The Spark

- **Purpose:** establish that the story is about turning ideas into useful things.
- **Frame:** a midnight screen. One small blue spark at center. Your name is absent at first.
- **Spoken English:** “Hello everyone. Today I want to show you what I create as a software developer.”
- **Entrance:** 1.2 seconds. The spark pulses twice, expands into a thin ring, then reveals your name and the title: “My profession: software development.”
- **Hold:** 12–15 seconds.
- **Exit / shared object:** the ring contracts back to the spark. The spark is shared with Scene 02.

### 02. Who I Am

- **Purpose:** define your occupation in human language.
- **Frame:** the spark becomes the center of a simple profile orbit. Three labels surround it: `Developer`, `Problem Solver`, `Creator`.
- **Spoken English:** “I am a software developer. I use technology to solve real problems for people and companies.”
- **Entrance:** 1.4 seconds. The spark grows into a profile circle. The three labels arrive one after another, not all at once.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** the profile orbit opens and releases four tiny icons. The orbit line and spark are shared with Scene 03.

### 03. Software Is Everywhere

- **Purpose:** place your work in familiar daily life.
- **Frame:** four icons orbit the spark: phone, map, chat, online store. Thin lines connect them.
- **Spoken English:** “Software is part of the tools we use every day. We use it to communicate, find places, buy things, and organize information.”
- **Entrance:** 1.8 seconds. Icons travel from the profile orbit and settle into a calm constellation.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the icons fade. Their connecting lines flatten into a technical-but-friendly blueprint grid. The spark and lines are shared with Scene 04.

### 04. The Digital Architect

- **Purpose:** explain the profession through an easy analogy.
- **Frame:** the grid becomes a blueprint. It draws a browser window as if it were a small building.
- **Spoken English:** “I like to compare my job with an architect’s job. An architect designs buildings. I design digital tools that people can use on a computer or phone.”
- **Entrance:** 2.0 seconds. The blueprint lines draw a browser frame, then the interior becomes warm and usable.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the browser is kept intact. Blueprint lines disappear. The browser is shared with Scene 05.

### 05. From Problem to Solution

- **Purpose:** show the working process before showing products.
- **Frame:** inside the browser: `Problem → Idea → Build → Improve`. One blue beam moves through each step.
- **Spoken English:** “My work does not start with code. It starts by understanding a problem. Then I design, build, test, and improve a solution.”
- **Entrance:** 2.0 seconds. The beam lights each word in sequence. The last word stays lit.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the browser zooms toward an online store inside it. The browser and beam are shared with Scene 06.

### 06. The Online Visitor

- **Purpose:** introduce the simple business problem behind Hellotext.
- **Frame:** the browser now contains a friendly online store. Product cards appear; a visitor cursor moves in.
- **Spoken English:** “For example, an online business needs a clear way to communicate with people who visit its website.”
- **Entrance:** 1.6 seconds. The store shelves rise gently; the cursor enters from the right.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** the cursor stops at a product. A small blank speech bubble grows from it. Browser, cursor, and bubble are shared with Scene 07.

### 07. Hellotext Arrives

- **Purpose:** explain Hellotext in one concrete, recognizable image.
- **Frame:** a clean welcome message in the store: `Welcome! Get 10% off your first purchase.`
- **Spoken English:** “Hellotext helps businesses show useful messages on their websites. For example, a store can welcome a new visitor with an offer.”
- **Entrance:** 1.8 seconds. The bubble expands from the cursor and the sentence types in naturally, word by word.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the message stays. The store becomes softer in the background. The message bubble is shared with Scene 08.

### 08. The Right Moment

- **Purpose:** avoid the misconception that every visitor receives spam.
- **Frame:** three simple visitor routes. Two are quiet and dim. One reaches the relevant message bubble.
- **Spoken English:** “The goal is not to interrupt everyone. The goal is to show the right message, to the right person, at the right moment.”
- **Entrance:** 2.0 seconds. Three paths draw on screen; only the useful path turns blue and connects to the bubble.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the two unused paths dissolve. The winning bubble expands into the center. It is shared with Scene 09.

### 09. My Role at Hellotext

- **Purpose:** name your contribution without technical jargon.
- **Frame:** the bubble is circled by three verbs: `Create`, `Improve`, `Test`.
- **Spoken English:** “My role is to create, improve, and test these experiences, so they are clear and useful for both businesses and visitors.”
- **Entrance:** 1.6 seconds. Each verb enters on a quarter-turn around the message and then aligns evenly.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** the circle fragments into several smaller bubbles. The bubbles are shared with Scene 10.

### 10. A Bridge to People

- **Purpose:** make the conceptual bridge from customers to employees.
- **Frame:** the smaller message bubbles float across the stage; each reveals a person icon behind it.
- **Spoken English:** “Communication is also important inside a company. People need clear conversations, goals, and feedback.”
- **Entrance:** 1.8 seconds. Bubbles travel outward and resolve into a small group of people.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** the group grows into a structured network. Person icons and bubbles are shared with Scene 11.

### 11. A Company Is a Network

- **Purpose:** introduce the human-scale challenge addressed by Rankmi.
- **Frame:** a larger network of employees. Only a few intentional connection lines remain, so the image stays calm.
- **Spoken English:** “In a large company, it can be difficult to organize information and support many employees at the same time.”
- **Entrance:** 1.6 seconds. The network builds from the existing people instead of appearing from nowhere.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** the network folds into three cards. The people become small portraits inside them. The cards are shared with Scene 12.

### 12. Rankmi

- **Purpose:** explain Rankmi with three plain-language concepts.
- **Frame:** three cards: `Goals`, `Performance`, `Feedback`. Portraits sit inside the cards.
- **Spoken English:** “Rankmi helps companies organize goals, performance reviews, and feedback. It gives people a clearer way to work together.”
- **Entrance:** 2.0 seconds. The three cards rise in a small stagger, then settle at the same height.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the `Feedback` card comes forward. It is shared with Scene 13; the other cards fade.

### 13. A Better Conversation

- **Purpose:** show the human result, not the dashboard.
- **Frame:** a manager and an employee face the same goal. Between them, the feedback card changes into a blue progress line.
- **Spoken English:** “A good digital tool does not replace people. It helps a manager and an employee have a clearer, more useful conversation.”
- **Entrance:** 2.0 seconds. The feedback card rotates gently and flattens into the shared progress line.
- **Hold:** 25–30 seconds.
- **Exit / shared object:** the line separates into four symbols: clock, clear path, chat bubble, check mark. They are shared with Scene 14.

### 14. Why My Work Matters

- **Purpose:** state the value in terms everyone understands.
- **Frame:** four symbols with four short words: `Time`, `Clarity`, `Communication`, `Fewer mistakes`.
- **Spoken English:** “This is why my work matters. A good tool can save time, make information clearer, improve communication, and reduce mistakes.”
- **Entrance:** 1.8 seconds. The symbols arrive one at a time in a square, then synchronize with a subtle pulse.
- **Hold:** 20–25 seconds.
- **Exit / shared object:** all four symbols draw inward and return their energy to one blue spark. The spark is shared with Scene 15.

### 15. The Returning Spark

- **Purpose:** close the circle and leave space for questions.
- **Frame:** the original spark is now a large, complete blue circle. Under it: `Technology is useful when it helps people.`
- **Spoken English:** “My goal is not only to build software. My goal is to solve real problems and make everyday work easier for people. Thank you.”
- **Entrance:** 1.5 seconds. The four symbols converge; the spark becomes the circle; the final sentence fades in.
- **Hold:** remain still after the last sentence. No automatic outro.
- **Exit:** none. This is the question frame.

## Asset list

- One reusable `spark.svg` / circle primitive.
- One profile outline, four everyday icons, browser frame, online-store cards, cursor, message bubble, person icon, goal card, progress line, clock, path, chat, and check mark.
- All assets are single-color SVGs and are created in Figma first. No stock photography is needed.
- Every shared object has one stable name in Figma and code, such as `spark`, `browser`, `message-bubble`, `person-network`, `feedback-card`, or `impact-symbols`.

## Rehearsal checklist

- Open the deployed page in the exact browser used in class.
- Test keyboard navigation with no mouse.
- Try rapid repeated key presses; no scene may skip or double-play.
- Test backward navigation only after the forward version is stable.
- Test in reduced-motion mode; scenes must still communicate their content without motion.
- Practice the spoken script until every hold feels intentional rather than like waiting for an animation.
