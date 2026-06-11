# Vijay Hosapeti Portfolio Website

This is a personal portfolio website for Vijay Hosapeti. It is built with React, TypeScript, Vite, GSAP, Three.js, and custom CSS. The website includes a landing section, 3D character animation, about section, skills/services section, career timeline, project showcase, 3D tech stack, social links, resume link, and contact/footer section.

## Main Purpose

Use this project to show:

- Personal introduction and role.
- About me summary.
- Backend and frontend skills.
- Career and education timeline.
- Selected projects with GitHub links.
- Tech stack with 3D floating icons.
- Resume, social profiles, email, and phone number.

## Tech Stack

- React 18 for UI components.
- TypeScript for type-safe code.
- Vite for fast local development and production builds.
- GSAP for scroll animations.
- GSAP ScrollTrigger for pinned and scroll-based animations.
- GSAP Trial ScrollSmoother and SplitText for smooth scrolling and text effects.
- Three.js for 3D rendering.
- React Three Fiber for React-based Three.js scenes.
- Drei for Three.js helpers.
- React Three Rapier for physics in the tech stack section.
- React Icons for social, resume, and link icons.
- CSS files for component-level styling.

## Folder Structure

```text
Portfolio-Website/
  index.html
  package.json
  package-lock.json
  README.md
  LICENSE
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  eslint.config.js
  test.js

  public/
    draco/
      draco_decoder.js
      draco_decoder.wasm

    images/
      placeholder.webp
      react.webp
      react2.webp
      next.webp
      next1.webp
      next2.webp
      nextBL.webp
      node.webp
      node2.webp
      express.webp
      mongo.webp
      mysql.webp
      typescript.webp
      javascript.webp

    models/
      character.glb
      character.enc
      char_enviorment.hdr
      encrypt.cjs

  src/
    main.tsx
    App.tsx
    App.css
    index.css
    vite-env.d.ts

    assets/
      react.svg

    context/
      LoadingProvider.tsx

    data/
      boneData.ts

    components/
      MainContainer.tsx
      Landing.tsx
      About.tsx
      WhatIDo.tsx
      Career.tsx
      Work.tsx
      WorkImage.tsx
      TechStack.tsx
      Contact.tsx
      Navbar.tsx
      SocialIcons.tsx
      Cursor.tsx
      HoverLinks.tsx
      Loading.tsx

      Character/
        index.tsx
        Scene.tsx
        exports.ts

        utils/
          animationUtils.ts
          character.ts
          decrypt.ts
          lighting.ts
          mouseUtils.ts
          resizeUtils.ts

      styles/
        About.css
        Career.css
        Contact.css
        Cursor.css
        Landing.css
        Loading.css
        Navbar.css
        SocialIcons.css
        WhatIDo.css
        Work.css
        style.css

      utils/
        GsapScroll.ts
        initialFX.ts
        splitText.ts
```

## Application Flow

1. `src/main.tsx` starts the React application.
2. `src/App.tsx` loads `MainContainer` and wraps the site with `LoadingProvider`.
3. `src/components/MainContainer.tsx` arranges all main sections in this order:
   - Navbar
   - Social icons and resume button
   - Landing
   - About
   - What I Do
   - Career
   - Work
   - Tech Stack
   - Contact/Footer
4. `src/components/Navbar.tsx` creates the smooth scroll behavior and navigation links.
5. `src/components/Character/Scene.tsx` loads and animates the 3D character.
6. `src/components/Work.tsx` renders the project list and horizontal pinned scroll section.
7. `src/components/TechStack.tsx` renders the 3D floating technology icons.
8. `src/components/Contact.tsx` renders email, phone, social links, and footer text.

## Important Files To Edit

### Navigation Links

Edit this file:

```text
src/components/Navbar.tsx
```

Current navigation:

```tsx
<a data-href="#about" href="#about">
  <HoverLinks text="ABOUT" />
</a>

<a data-href="#work" href="#work">
  <HoverLinks text="WORK" />
</a>

<a data-href="#contact" href="#contact">
  <HoverLinks text="CONTACT" />
</a>
```

To add a new navigation item:

1. Add an `id` to the target section, for example `id="career"`.
2. Add a matching nav link:

```tsx
<li>
  <a data-href="#career" href="#career">
    <HoverLinks text="CAREER" />
  </a>
</li>
```

Important: `data-href` and `href` must point to the same section id.

### Navbar Email

Edit this file:

```text
src/components/Navbar.tsx
```

Current email:

```tsx
<a
  href="mailto:hosapetivijay18@gmail.com"
  className="navbar-connect"
  data-cursor="disable"
>
  hosapetivijay18@gmail.com
</a>
```

Change both:

- `href="mailto:your-email@example.com"`
- visible email text inside the tag

### Resume Link

Edit this file:

```text
src/components/SocialIcons.tsx
```

Current resume button:

```tsx
<a
  className="resume-button"
  href="https://drive.google.com/file/d/14WyYDh4xMAIsDqH95oNRvXsWd5Pyx74-/view?usp=sharing"
  target="_blank"
>
  <HoverLinks text="RESUME" />
  <span>
    <TbNotes />
  </span>
</a>
```

Replace the `href` value with your new resume link.

Example:

```tsx
href="https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
```

If you want to store the resume inside the project:

1. Put the PDF in `public/`, for example:

```text
public/resume.pdf
```

2. Change the resume link to:

```tsx
href="/resume.pdf"
```

### Social Links

Edit this file:

```text
src/components/SocialIcons.tsx
```

Current social links:

```tsx
<a href="https://github.com/Vijay417-sys" target="_blank">
  <FaGithub />
</a>

<a href="https://www.linkedin.com/in/vijay-hosapeti-7b48b9364/" target="_blank">
  <FaLinkedinIn />
</a>

<a href="https://unstop.com/u/vijayhos5193" target="_blank">
  <FaXTwitter />
</a>

<a href="https://vijayshportfolio.netlify.app" target="_blank">
  <FaInstagram />
</a>
```

Replace each `href` with your own profile URL.

If you want to change icons, update the icon imports at the top of the file:

```tsx
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
```

### Contact Details And Footer

Edit this file:

```text
src/components/Contact.tsx
```

Current contact fields:

```tsx
href="mailto:hosapetivijay18@gmail.com"
hosapetivijay18@gmail.com

href="tel:+919483069267"
+91 94830 69267
```

Change both the link value and visible text.

For email:

```tsx
href="mailto:your-email@example.com"
your-email@example.com
```

For phone:

```tsx
href="tel:+911234567890"
+91 12345 67890
```

Footer name is also inside `Contact.tsx`:

```tsx
Designed and Developed <br /> by <span>Vijay Hosapeti</span>
```

Change this if you want to update the footer name.

### Landing Page Name And Role

Edit this file:

```text
src/components/Landing.tsx
```

Current name:

```tsx
VIJAY
<br />
<span>HOSAPETI</span>
```

Current role text:

```tsx
<div className="landing-h2-1">Backend</div>
<div className="landing-h2-2">Developer</div>
```

Change these values to update the first screen.

### About Me Content

Edit this file:

```text
src/components/About.tsx
```

The main paragraph is inside:

```tsx
<p className="para">
  ...
</p>
```

Update this paragraph with your latest education, experience, CGPA, internship, and skills.

### What I Do / Skills Section

Edit this file:

```text
src/components/WhatIDo.tsx
```

This section currently has two skill cards:

- Backend
- Frontend

Each card contains:

- Heading: `<h3>`
- Subtitle: `<h4>`
- Description: `<p>`
- Tags: `<div className="what-tags">...</div>`

Example tag:

```tsx
<div className="what-tags">Spring Boot</div>
```

Add, remove, or rename tags here.

### Career / Education Timeline

Edit this file:

```text
src/components/Career.tsx
```

Each timeline item uses:

```tsx
<div className="career-info-box">
  <div className="career-info-in">
    <div className="career-role">
      <h4>Role or Degree</h4>
      <h5>Company or College</h5>
    </div>
    <h3>Year</h3>
  </div>
  <p>
    Description
  </p>
</div>
```

To add a new timeline item, copy one full `career-info-box` block and edit the role, organization, year, and paragraph.

### Projects / My Work Section

Edit this file:

```text
src/components/Work.tsx
```

Projects are stored in this array:

```tsx
const projects = [
  {
    num: "01",
    name: "Blocktix",
    category: "Blockchain / Web3",
    tools: "Solidity, Web Technologies, Smart Contracts",
    image: "/images/placeholder.webp",
    link: "https://github.com/Vijay417-sys/Blocktix",
  },
];
```

To add a new project, add a new object:

```tsx
{
  num: "07",
  name: "Project Name",
  category: "Project Category",
  tools: "Java, Spring Boot, React, MySQL",
  image: "/images/project-name.webp",
  link: "https://github.com/your-username/project-name",
}
```

Project image files should be placed in:

```text
public/images/
```

Use the image like:

```tsx
image: "/images/project-name.webp"
```

### Tech Stack 3D Icons

Edit this file:

```text
src/components/TechStack.tsx
```

Current icon list:

```tsx
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
```

To add a new technology:

1. Put the image in `public/images/`.
2. Add the image path to `imageUrls`.

Example:

```tsx
"/images/springboot.webp",
```

### Website Colors And Global Styles

Edit this file:

```text
src/index.css
```

Main theme variables:

```css
:root {
  --accentColor: #c2a4ff;
  --backgroundColor: #0b080c;
}
```

Change `--accentColor` to update the purple highlight color.

Change `--backgroundColor` to update the site background.

### Section Width

Edit this file:

```text
src/App.css
```

Main section width:

```css
.section-container {
  width: 1300px;
}
```

Responsive widths are also controlled in this file.

### Component CSS Files

Most components have matching CSS files:

```text
src/components/styles/Landing.css
src/components/styles/About.css
src/components/styles/WhatIDo.css
src/components/styles/Career.css
src/components/styles/Work.css
src/components/styles/Contact.css
src/components/styles/Navbar.css
src/components/styles/SocialIcons.css
src/components/styles/Cursor.css
src/components/styles/Loading.css
```

Use these files to change spacing, font sizes, layout, colors, and responsive behavior.

## File Responsibility Guide

| File | Purpose | Edit When |
| --- | --- | --- |
| `src/main.tsx` | React entry point | Usually do not edit |
| `src/App.tsx` | Root app wrapper | Change app-level providers or lazy loading |
| `src/components/MainContainer.tsx` | Page section order | Add, remove, or reorder major sections |
| `src/components/Navbar.tsx` | Top navigation and smooth scroll | Edit navigation links or navbar email |
| `src/components/SocialIcons.tsx` | Fixed social icons and resume button | Edit GitHub, LinkedIn, Unstop, portfolio, resume link |
| `src/components/Landing.tsx` | First hero screen | Edit name, intro, role |
| `src/components/About.tsx` | About section | Edit personal summary |
| `src/components/WhatIDo.tsx` | Skills/services cards | Edit backend/frontend skills and tags |
| `src/components/Career.tsx` | Career and education timeline | Edit internship, education, experience |
| `src/components/Work.tsx` | Project data and horizontal scroll | Add/edit/remove projects |
| `src/components/WorkImage.tsx` | Project image and project link rendering | Change project image behavior |
| `src/components/TechStack.tsx` | 3D tech stack balls | Edit tech stack images |
| `src/components/Contact.tsx` | Contact and footer | Edit email, phone, social footer links, footer name |
| `src/components/Cursor.tsx` | Custom cursor | Change cursor behavior |
| `src/components/HoverLinks.tsx` | Animated hover text links | Change reusable hover link effect |
| `src/components/Loading.tsx` | Loading screen/progress | Change loading UI |
| `src/context/LoadingProvider.tsx` | Loading state provider | Usually do not edit |
| `src/components/utils/GsapScroll.ts` | Scroll-based 3D and timeline animations | Edit scroll animation behavior |
| `src/components/utils/initialFX.ts` | Initial entrance effects | Edit intro animations |
| `src/components/utils/splitText.ts` | Text split animations | Edit text animation behavior |
| `src/components/Character/Scene.tsx` | Main Three.js character scene | Edit 3D scene behavior |
| `src/components/Character/utils/character.ts` | Character model loading | Change character model loading |
| `src/components/Character/utils/animationUtils.ts` | Character animation setup | Change character animations |
| `src/components/Character/utils/lighting.ts` | Three.js lighting | Change 3D lights |
| `src/components/Character/utils/mouseUtils.ts` | Mouse/touch movement | Change pointer interaction |
| `src/components/Character/utils/resizeUtils.ts` | 3D resize behavior | Change responsive 3D sizing |
| `src/index.css` | Global styles and variables | Change theme colors, global layout, tech stack spacing |
| `src/App.css` | Shared section container width | Change section width/responsive sizing |
| `public/images/` | Static images/icons | Add project images and tech icons |
| `public/models/` | 3D model and HDR files | Replace or update 3D assets |
| `public/draco/` | Draco decoder files | Usually do not edit |

## How To Add A New Page Section

1. Create a new component in `src/components/`.

Example:

```text
src/components/Certificates.tsx
```

2. Add a matching CSS file:

```text
src/components/styles/Certificates.css
```

3. Import and render the component in `src/components/MainContainer.tsx`.

Example:

```tsx
import Certificates from "./Certificates";
```

Then place it in the section order:

```tsx
<Career />
<Certificates />
<Work />
```

4. Add an `id` to the new section:

```tsx
<div className="certificates-section section-container" id="certificates">
```

5. Add a navigation link in `src/components/Navbar.tsx`:

```tsx
<li>
  <a data-href="#certificates" href="#certificates">
    <HoverLinks text="CERTIFICATES" />
  </a>
</li>
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app usually opens at:

```text
http://localhost:5173/
```

If port `5173` is busy, Vite will use another port such as `5174`.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

## Deployment

This is a static Vite project.

For Netlify, Vercel, or other static hosting:

```text
Build command: npm run build
Publish directory: dist
```

## Important Notes

- The Work section uses GSAP ScrollTrigger with a pinned horizontal scroll.
- The TechStack section uses a 3D canvas and can create a large production bundle.
- The project imports GSAP trial plugins from `gsap-trial`. For production, use properly licensed GSAP Club plugins or replace trial-only effects.
- Keep images optimized. Prefer `.webp` for project images and tech icons.
- After editing navigation ids, always make sure `href`, `data-href`, and the target section `id` match exactly.

## Quick Edit Checklist

- Change name: `src/components/Landing.tsx`
- Change role: `src/components/Landing.tsx`
- Change about text: `src/components/About.tsx`
- Change skills: `src/components/WhatIDo.tsx`
- Change career/education: `src/components/Career.tsx`
- Change projects: `src/components/Work.tsx`
- Change project images: `public/images/`
- Change tech stack icons: `src/components/TechStack.tsx`
- Change navbar links: `src/components/Navbar.tsx`
- Change navbar email: `src/components/Navbar.tsx`
- Change resume link: `src/components/SocialIcons.tsx`
- Change social icons/links: `src/components/SocialIcons.tsx`
- Change contact email/phone: `src/components/Contact.tsx`
- Change footer text: `src/components/Contact.tsx`
- Change colors: `src/index.css`
- Change section width: `src/App.css`
