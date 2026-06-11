# 🚀 Vijay Hosapeti — Portfolio Website: Full Technical Documentation

> **For Interview Reference** — A deep-dive into every technology, architecture decision, function, and 3D system used to build this portfolio.

---

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Architecture](#project-architecture)
4. [Component Breakdown](#component-breakdown)
5. [3D Character Model — How It Was Built](#3d-character-model)
6. [3D Model Movement & Interaction System](#3d-model-movement)
7. [Animation System (GSAP)](#animation-system)
8. [Physics-Based Tech Stack Section](#physics-tech-stack)
9. [Custom Cursor System](#custom-cursor)
10. [Loading Screen System](#loading-screen)
11. [Theme (Day/Night) System](#theme-system)
12. [Performance Optimizations](#performance)
13. [Key Functions Reference](#key-functions)
14. [Interview Q&A Cheatsheet](#interview-qa)

---

## 1. Project Overview <a name="project-overview"></a>

This is a **fully custom, high-performance developer portfolio** built from scratch using React + TypeScript + Vite. What makes it unique:

- A **real-time 3D animated character** rendered using Three.js that follows your mouse cursor
- **Physics-simulated** floating tech-stack balls using Rapier physics engine
- **Scroll-driven cinematic animations** powered by GSAP ScrollTrigger
- **Encrypted 3D model** loaded at runtime using the Web Crypto API
- A **custom cursor**, smooth scrolling, split-text animations, and day/night theme toggle
- Deployed via **Vercel** with analytics

---

## 2. Technology Stack <a name="technology-stack"></a>

### Core Framework
| Technology | Version | Why Used |
|---|---|---|
| **React** | 18.3.1 | Component-based UI, hooks, Suspense for lazy loading |
| **TypeScript** | 5.5.3 | Type safety for 3D math, component props, events |
| **Vite** | 5.4.1 | Blazing-fast dev server and build tool |

### 3D Rendering
| Technology | Version | Why Used |
|---|---|---|
| **Three.js** | 0.168.0 | Core 3D engine — scenes, cameras, lights, meshes |
| **three-stdlib** | 2.33.0 | GLTFLoader, DRACOLoader, RGBELoader for HDR |
| **@react-three/fiber** | 8.17.10 | React renderer for Three.js (used in TechStack section) |
| **@react-three/drei** | 9.120.4 | Helpers: Environment HDR, abstractions |
| **@react-three/rapier** | 1.5.0 | Rapier physics engine — floating ball physics |
| **@react-three/postprocessing** | 2.16.3 | N8AO ambient occlusion post-processing effect |

### Animation
| Technology | Version | Why Used |
|---|---|---|
| **GSAP** | 3.12.7 | Timeline animations, ScrollTrigger, SplitText |
| **gsap-trial** | 3.12.7 | ScrollSmoother + SplitText plugins |
| **@gsap/react** | 2.1.1 | `useGSAP` hook — proper GSAP cleanup in React |

### UI & Icons
| Technology | Version | Why Used |
|---|---|---|
| **react-icons** | 5.3.0 | Social media and tech icons |
| **react-fast-marquee** | 1.6.5 | Infinite scrolling text on loading screen |

### Deployment
| Technology | Purpose |
|---|---|
| **Vercel** | Hosting + CDN |
| **@vercel/analytics** | Page view and event analytics |

---

## 3. Project Architecture <a name="project-architecture"></a>

```
src/
├── App.tsx                    # Root — wraps ThemeProvider + LoadingProvider + lazy loads
├── main.tsx                   # React DOM entry point
├── context/
│   ├── ThemeContext.tsx        # Day/Night mode global state
│   └── LoadingProvider.tsx    # Loading state shared across components
├── components/
│   ├── MainContainer.tsx      # Layout shell — renders all page sections
│   ├── Navbar.tsx             # Navigation + ScrollSmoother init + theme toggle
│   ├── Landing.tsx            # Hero/intro section
│   ├── About.tsx              # About Me section
│   ├── WhatIDo.tsx            # Skills cards (Backend/Frontend/DevOps)
│   ├── Career.tsx             # Timeline of experience + education
│   ├── Work.tsx               # Projects with horizontal scroll
│   ├── TechStack.tsx          # Physics 3D floating tech balls (React Three Fiber)
│   ├── Contact.tsx            # Contact section
│   ├── Cursor.tsx             # Custom animated cursor
│   ├── Loading.tsx            # Loading screen with progress bar
│   ├── SocialIcons.tsx        # Fixed social sidebar
│   ├── ErrorBoundary.tsx      # Catches 3D rendering failures gracefully
│   ├── Character/
│   │   ├── index.tsx          # Entry — exports Scene
│   │   ├── Scene.tsx          # THREE.js scene setup, render loop, event binding
│   │   └── utils/
│   │       ├── character.ts   # GLTF model loader + DRACO decompression
│   │       ├── animationUtils.ts  # Bone animations: intro, typing, blink, hover
│   │       ├── mouseUtils.ts  # Mouse/touch tracking → head rotation math
│   │       ├── lighting.ts    # Directional + point lights + HDR environment
│   │       ├── resizeUtils.ts # Responsive resize handler
│   │       └── decrypt.ts     # AES-CBC Web Crypto API decryption
│   └── utils/
│       ├── GsapScroll.ts      # All scroll-driven GSAP timelines
│       ├── initialFX.ts       # Post-loading entry animations
│       └── splitText.ts       # GSAP SplitText scroll-reveal for paragraphs
└── data/
    └── boneData.ts            # Bone name arrays for targeted animation filtering
```

**Data Flow:**
```
App.tsx
  └── ThemeProvider (global theme context)
       └── LoadingProvider (loading % context)
            └── MainContainer (layout)
                 ├── Cursor, Navbar, SocialIcons
                 └── [sections: Landing > About > WhatIDo > Career > Work > TechStack > Contact]
            └── CharacterModel (3D canvas — absolutely positioned over landing)
```

---

## 4. Component Breakdown <a name="component-breakdown"></a>

### `App.tsx` — Root Component
Uses **React.lazy + Suspense** to code-split the heavy 3D components:
```tsx
const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer  = lazy(() => import("./components/MainContainer"));
```
This means the 3D code is only downloaded when needed — improving initial page load.

### `MainContainer.tsx` — Layout Shell
- Detects screen width (`window.innerWidth > 1024`) to toggle **desktop vs mobile** layout
- On desktop: the 3D character floats **fixed** over the page
- On mobile: the 3D character is embedded inside the Landing section
- Calls `setSplitText()` on every resize to recalculate text animation triggers
- Uses `window.addEventListener("resize", resizeHandler)` with proper cleanup

### `Navbar.tsx` — Navigation + Scroll Engine
- Initializes **GSAP ScrollSmoother** — the engine that gives the silky smooth scroll feel:
  ```ts
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.7,   // scroll lag for smooth feel
    speed: 1.7,
    effects: true,
  });
  ```
- Intercepts nav link clicks and uses `smoother.scrollTo(section)` for smooth section jumps
- Exports `smoother` instance for use in `initialFX.ts`

### `Work.tsx` — Horizontal Scroll Projects
- Uses `useGSAP()` hook (GSAP's React-aware version with auto-cleanup)
- Dynamically calculates how much to translate: total box widths minus container width
- Pins the section with ScrollTrigger while scrolling horizontally:
  ```ts
  scrollTrigger: { trigger: ".work-section", pin: true, scrub: true }
  ```

### `WhatIDo.tsx` — Skills Cards
- On touch devices, adds click-to-expand behavior replacing CSS hover
- Uses `ScrollTrigger.refresh()` to fix scroll calculations after mount

---

## 5. 3D Character Model — How It Was Built <a name="3d-character-model"></a>

### Model Format: GLTF + DRACO
The character is a **GLTF 3D model** (GL Transmission Format) — the standard format for web 3D. It contains:
- **Mesh geometry** (the character's body shape)
- **Skeletal rig** (bones: spine, head, fingers, feet, etc.)
- **Embedded animations** (intro walk-in, typing, blink, eyebrow raise)
- **Materials/textures** (skin, clothing, laptop screen)

DRACO compression reduces file size by ~70%:
```ts
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
loader.setDRACOLoader(dracoLoader);
```

### Security: AES-CBC Encryption
The model file is **encrypted on disk** as `character.enc` to prevent easy downloading. At runtime, it's decrypted using the **Web Crypto API**:

```ts
// Step 1: Hash the password with SHA-256
const hashedPassword = await crypto.subtle.digest("SHA-256", passwordBuffer);
// Step 2: Import as AES-CBC key
const key = await crypto.subtle.importKey("raw", hashedPassword.slice(0, 32), { name: "AES-CBC" }, false, ["decrypt"]);
// Step 3: Extract IV (first 16 bytes) and decrypt
const iv = new Uint8Array(encryptedData.slice(0, 16));
return crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, data);
```
This runs entirely in the browser — no server needed. The decrypted binary is converted to a Blob URL and fed directly to GLTFLoader.

### Renderer Setup
```ts
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;  // cinematic color grading
renderer.toneMappingExposure = 1;
renderer.setPixelRatio(window.devicePixelRatio);     // crisp on retina displays
```

### Camera
```ts
const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
camera.position.set(0, 13.1, 24.7);
camera.zoom = 1.1;
```
A narrow FOV (14.5°) creates a telephoto effect — makes the character look more professional and less distorted.

### HDR Environment Lighting
```ts
new RGBELoader().load("char_enviorment.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;  // used for reflections on model
});
```
An HDR image provides realistic ambient lighting and reflections on the character's materials.

### Shadow Optimizations
Every mesh has `frustumCulled = true` — Three.js skips rendering meshes outside the camera view, saving GPU cycles.

---

## 6. 3D Model Movement & Interaction System <a name="3d-model-movement"></a>

### Head Tracking — Mouse Follow
The character's **head bone** (`spine006`) rotates to follow your cursor in real-time:

```ts
// Convert screen coordinates to normalized -1 to +1 range
const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
```

Then in every animation frame, the head rotation is updated using **linear interpolation (lerp)**:
```ts
headBone.rotation.y = lerp(headBone.rotation.y, mouseX * maxRotation, 0.2);
headBone.rotation.x = lerp(headBone.rotation.x, targetX, 0.1);
```
`lerp(a, b, t)` means: move from current value `a` toward target `b` by `t` (0–1) each frame. This creates the smooth, lagging follow effect instead of instant snapping.

**Clamping:** Max rotation is `Math.PI / 6` (30°) to keep it natural. The vertical range is also clamped between `-0.3` and `0.4`.

**Scroll-aware:** When scrolled down >200px on desktop, the head transitions to a "looking at laptop" pose:
```ts
if (window.scrollY > 200 && window.innerWidth > 1024) {
  headBone.rotation.x = lerp(headBone.rotation.x, -0.4, 0.03);
  headBone.rotation.y = lerp(headBone.rotation.y, -0.3, 0.03);
}
```

### Touch Support
On mobile, `touchmove` events are mapped the same as mouse events, with a debounce:
```ts
// Debounce: wait 200ms after touchstart before listening to touchmove
debounce = setTimeout(() => { element.addEventListener("touchmove", handler); }, 200);
```
After touch ends, the head smoothly returns to center over 3 seconds using two nested timeouts.

### Render Loop (requestAnimationFrame)
```ts
const animate = () => {
  requestAnimationFrame(animate);      // schedules next frame (~60fps)
  handleHeadRotation(...);            // update head bone
  light.setPointLight(screenLight);   // sync screen glow with laptop emissive
  const delta = clock.getDelta();     // time since last frame
  mixer.update(delta);                // advance skeleton animations
  renderer.render(scene, camera);     // draw frame
};
animate();
```
`clock.getDelta()` ensures animations play at the correct speed regardless of frame rate.

### Screen Light Effect
The laptop screen has an emissive material that randomly flickers (simulating a working screen):
```ts
gsap.timeline({ repeat: -1, repeatRefresh: true }).to(object.material, {
  emissiveIntensity: () => intensity * 8,   // random each repeat
  duration: () => Math.random() * 0.6,
});
```
A point light is then synced to the screen's opacity — so the character's face is actually lit by the "screen":
```ts
function setPointLight(screenLight) {
  if (screenLight.material.opacity > 0.9) {
    pointLight.intensity = screenLight.material.emissiveIntensity * 20;
  }
}
```

---

## 7. Animation System (GSAP) <a name="animation-system"></a>

### Scroll-Driven Cinematic Timeline (`GsapScroll.ts`)

Three GSAP timelines (`tl1`, `tl2`, `tl3`) are linked to scroll sections using ScrollTrigger `scrub: true` — meaning animations are scrubbed forward/backward as you scroll.

**Timeline 1 — Landing scroll-out:**
```ts
tl1.fromTo(character.rotation, { y: 0 }, { y: 0.7 })   // character rotates right
   .to(camera.position, { z: 22 })                       // camera pulls back
   .fromTo(".character-model", { x: 0 }, { x: "-25%" }) // model shifts left
   .to(".landing-container", { opacity: 0, y: "40%" })   // text fades + slides down
   .fromTo(".about-me", { y: "-50%" }, { y: "0%" });     // about section rises up
```

**Timeline 2 — About → WhatIDo transition:**
- Camera zooms far back (`z: 75`) while rotating the character to face the laptop
- Laptop monitor fades in, screen light turns on
- The WhatIDo cards become visible (`display: flex`)

**Timeline 3 — Character exits:**
- Character slides up off screen as WhatIDo section comes into view

### Bone Animation System (`animationUtils.ts`)

**Why filter bone tracks?**  
A single GLTF animation clip can contain tracks for ALL bones. We only want to play, say, the typing animation on the *fingers*, not the whole body. Solution:
```ts
const filterAnimationTracks = (clip, boneNames) => {
  const filteredTracks = clip.tracks.filter(track =>
    boneNames.some(boneName => track.name.includes(boneName))
  );
  return new THREE.AnimationClip(clip.name + "_filtered", clip.duration, filteredTracks);
};
```

**AnimationMixer** manages all active bone animations simultaneously. Each animation is an `AnimationAction`:
- `introAnimation` — character walks/sits in (plays once, clamps at end)
- `typing` — finger bones loop continuously
- `Blink` — eyelid bones blink periodically (fades in 2.5s after intro)
- `browup` — eyebrow bones raise on mouse hover over the face area
- `key1/2/5/6` — keyboard key press animations

**Eyebrow Hover Interaction:**
```ts
hoverDiv.addEventListener("mouseenter", () => {
  eyeBrowUpAction.reset().fadeIn(0.5).play();  // smooth fade-in
});
hoverDiv.addEventListener("mouseleave", () => {
  eyeBrowUpAction.fadeOut(0.6);               // smooth fade-out
});
```

### Entry Animations (`initialFX.ts`)
After loading completes, a chain of entrance animations fires:
1. GSAP SplitText splits heading characters individually
2. Each character animates from `{opacity: 0, y: 80, blur: 5px}` → `{opacity: 1, y: 0, blur: 0}` with stagger
3. Navbar + social icons fade in
4. Two rotating text phrases loop with vertical slide animations (`LoopText` function)

### Scroll-Reveal Text (`splitText.ts`)
Every `.para` and `.title` element on the page has scroll-triggered reveal:
- Paragraphs: words animate up with `stagger: 0.02`
- Titles: characters animate up + rotate from 10° → 0° with `stagger: 0.03`
- Triggered at `"20% 60%"` — when 20% of the element is at 60% of viewport height

---

## 8. Physics-Based Tech Stack Section <a name="physics-tech-stack"></a>

The "My Techstack" section uses **@react-three/fiber** (React bindings for Three.js) with **@react-three/rapier** (Rust-based Rapier physics engine compiled to WebAssembly).

### How the Physics Work
30 spheres are created with random sizes. Each sphere has:
- `RigidBody` — a physics body with linear/angular damping
- `BallCollider` — spherical collision shape
- `CylinderCollider` — for the keychain ring on top

Every frame, each sphere has an impulse applied toward the center (like gravity toward origin):
```ts
useFrame((_state, delta) => {
  const impulse = vec.copy(api.current.translation())
    .normalize()
    .multiply(new THREE.Vector3(-50 * delta, -150 * delta, -50 * delta));
  api.current.applyImpulse(impulse, true);
});
```

### Pointer Interaction
An invisible kinematic (user-controlled) rigid body follows the mouse:
```ts
useFrame(({ pointer, viewport }) => {
  const target = vec.lerp(
    new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0),
    0.2
  );
  ref.current.setNextKinematicTranslation(target);
});
```
When your mouse enters the canvas, this invisible ball pushes the tech spheres around.

### Material System
Each sphere uses `THREE.MeshPhysicalMaterial` with:
- A tech logo texture (`react.webp`, `docker.webp`, etc.)
- `emissiveMap` = same texture at 30% intensity (subtle glow)
- `metalness: 0.5`, `clearcoat: 0.1` — for a premium 3D plastic look

**Post-processing:** `N8AO` (Screen-Space Ambient Occlusion) adds realistic shadows where balls touch each other.

**Performance trick:** Physics is only enabled (`isActive`) once the user scrolls to the Tech section — detected by comparing scroll position to the `#work` element's bounding rect.

---

## 9. Custom Cursor System <a name="custom-cursor"></a>

The custom cursor uses a **requestAnimationFrame loop** with interpolation for smooth lag:
```ts
requestAnimationFrame(function loop() {
  cursorPos.x += (mousePos.x - cursorPos.x) / 6;  // lag factor = 6
  cursorPos.y += (mousePos.y - cursorPos.y) / 6;
  gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
  requestAnimationFrame(loop);
});
```

**Modes controlled via `data-cursor` attribute:**
- `data-cursor="disable"` → cursor shrinks/hides (used on links)
- `data-cursor="icons"` → cursor snaps to and wraps around social icons (using `getBoundingClientRect()`)

---

## 10. Loading Screen System <a name="loading-screen"></a>

The loading progress is simulated in two phases (`setProgress` function in `Loading.tsx`):

**Phase 1 (0–50%):** Random increments every 100ms (feels fast/organic)  
**Phase 2 (51–91%):** Very slow increments every 2000ms (waiting for 3D model)  
**Phase 3 (model loaded):** Rapidly increments to 100% at 2ms intervals

When `percent >= 100`, the loading button transforms to "Welcome", and clicking it:
1. Triggers `initialFX()` — plays all entrance animations
2. Unpauses ScrollSmoother
3. Removes the loading overlay

The loading screen features a **marquee** (`react-fast-marquee`) and a mouse-tracked radial gradient spotlight effect using CSS variables `--mouse-x` and `--mouse-y`.

---

## 11. Theme (Day/Night) System <a name="theme-system"></a>

Uses React Context API:
```tsx
const ThemeContext = createContext<{ theme: string; toggleTheme: () => void }>();
```

The theme value is applied as a `data-theme` attribute on `<html>`, allowing pure CSS theming:
```css
[data-theme="light"] {
  --bg-color: #e0f0ff;
  --text-color: #0a0a0a;
}
```

The Navbar shows `<SunIcon>` in dark mode and `<MoonIcon>` in light mode.

---

## 12. Performance Optimizations <a name="performance"></a>

| Technique | Where | Benefit |
|---|---|---|
| `React.lazy()` + `Suspense` | App.tsx | 3D code only loads when needed |
| DRACO compression | character.ts | ~70% smaller 3D model file |
| `renderer.compileAsync()` | character.ts | Pre-compiles shaders before reveal — no stutter |
| `frustumCulled = true` | character.ts | Skip rendering off-screen meshes |
| `isActive` physics gate | TechStack.tsx | Physics engine only runs when visible |
| `useMemo` for materials | TechStack.tsx | Materials created once, not on every render |
| `scrollTrigger.invalidateOnRefresh` | GsapScroll.ts | Recalculates on window resize |
| `ignoreMobileResize` | splitText.ts | Prevents layout recalc on mobile scroll |
| Shared geometry | TechStack.tsx | All 30 spheres share ONE `SphereGeometry` instance |
| ErrorBoundary | MainContainer.tsx | 3D failures don't crash the whole site |

---

## 13. Key Functions Reference <a name="key-functions"></a>

| Function | File | Purpose |
|---|---|---|
| `loadCharacter()` | `character.ts` | Decrypt + load GLTF, compile shaders, init timelines |
| `setAnimations(gltf)` | `animationUtils.ts` | Setup AnimationMixer, create all actions |
| `createBoneAction()` | `animationUtils.ts` | Filter clips to specific bones + create action |
| `filterAnimationTracks()` | `animationUtils.ts` | Strip unwanted bone tracks from a clip |
| `startIntro()` | `animationUtils.ts` | Reset + play intro, schedule blink after 2.5s |
| `hover()` | `animationUtils.ts` | Bind eyebrow raise to mouse enter/leave |
| `handleMouseMove()` | `mouseUtils.ts` | Normalize screen coords to -1..+1 NDC range |
| `handleHeadRotation()` | `mouseUtils.ts` | Lerp head bone toward normalized mouse position |
| `handleTouchEnd()` | `mouseUtils.ts` | Return head to center over 3s after touch |
| `setLighting()` | `lighting.ts` | Create directional + point lights, load HDR |
| `turnOnLights()` | `lighting.ts` | GSAP tween lights from 0 to full intensity |
| `setPointLight()` | `lighting.ts` | Sync point light intensity with screen emissive |
| `handleResize()` | `resizeUtils.ts` | Resize renderer + camera + rebuild all scroll triggers |
| `decryptFile()` | `decrypt.ts` | AES-CBC decrypt the .enc model file at runtime |
| `setCharTimeline()` | `GsapScroll.ts` | Create 3 scroll-scrub timelines for character movement |
| `setAllTimeline()` | `GsapScroll.ts` | Career section scroll-reveal timeline |
| `initialFX()` | `initialFX.ts` | Post-load entry animations for all text + UI elements |
| `LoopText()` | `initialFX.ts` | Loop two split texts alternating up/down |
| `setSplitText()` | `splitText.ts` | Bind scroll-reveal to all `.para` and `.title` elements |
| `setProgress()` | `Loading.tsx` | Simulated loading bar with 3-phase progress |
| `getTranslateX()` | `Work.tsx` | Calculate exact horizontal scroll distance for projects |

---

## 14. Interview Q&A Cheatsheet <a name="interview-qa"></a>

**Q: How does the 3D character follow the mouse?**  
A: Mouse coordinates are normalized to -1..+1 (NDC). Each frame, the head bone's rotation is linearly interpolated (lerped) toward the target angle. `THREE.MathUtils.lerp(current, target, 0.1)` moves 10% closer each frame, creating smooth lag. Max rotation is clamped to ±30°.

**Q: How is the 3D model protected?**  
A: The GLTF file is AES-CBC encrypted. At runtime, the browser's Web Crypto API decrypts it in memory using SHA-256 hashed password, converts it to a Blob URL, and feeds it to GLTFLoader. The plaintext model never touches the disk.

**Q: How do scroll-driven animations work?**  
A: GSAP ScrollTrigger with `scrub: true` links animation progress directly to scroll position. So scrolling 50% through a section = animation is at 50%. GSAP timelines are attached to DOM section triggers. The Three.js camera position is animated this way too.

**Q: Why use React.lazy() for the 3D component?**  
A: Three.js + the entire 3D pipeline is hundreds of KB. Lazy loading means the browser downloads that code only after the main UI renders, making first contentful paint faster.

**Q: How does the physics in TechStack work?**  
A: Rapier physics engine (WebAssembly) runs in the browser. Each sphere is a RigidBody with BallCollider. Each frame, a gravity-like impulse pushes them toward center. An invisible kinematic body follows the mouse pointer — when it collides with spheres, they scatter.

**Q: Why compile shaders with `renderer.compileAsync()`?**  
A: WebGL shaders must be compiled on the GPU before first render. Without pre-compilation, there's a visible stutter when the character first appears. `compileAsync()` runs this during the loading phase so the reveal is smooth.

**Q: How does the custom cursor work?**  
A: A `requestAnimationFrame` loop runs infinitely. It calculates the cursor position by interpolating toward the actual mouse position by 1/6 each frame — creating elastic lag. GSAP `to()` handles the actual DOM transform for smoothness.

**Q: What is SplitText and how is it used?**  
A: GSAP SplitText splits an HTML element's text into individual `<span>` wrappers for each character or word. Then we animate each span from `{y: 80, opacity: 0}` to visible with a `stagger` delay — creating the cascading text reveal effect.

---

## 🏗️ Build & Run

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 File Structure Summary

```
Portfolio-Website/
├── public/
│   ├── models/
│   │   ├── character.enc        # AES-CBC encrypted GLTF model
│   │   └── char_enviorment.hdr  # HDR environment map
│   ├── images/                  # Project screenshots, tech logos
│   └── draco/                   # DRACO decoder WASM files
├── src/                         # All React + TS source code
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

*Built with passion by **Vijay Hosapeti** — Java Full-Stack Developer & Creative Engineer*

> GitHub: [Vijay417-sys](https://github.com/Vijay417-sys) | Email: hosapetivijay18@gmail.com
