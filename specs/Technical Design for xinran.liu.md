# Personal Portfolio Website – Technical Specification

## 1\. Project Overview

This project is a personal portfolio website for a freelance frontend developer.  
 It will not only showcase projects and experience but will also **serve as a live demonstration** of technical capabilities in React, Next.js, and Tailwind CSS.  
 The site will feature an optional **Developer Mode** that reveals technical details about the implementation.

## 2\. Goals

* **Portfolio**: Present professional projects and skills.  
* **Technical showcase**: The website itself should demonstrate modern frontend best practices.  
* **Client conversion**: Make it easy for potential clients to understand your value and contact you.  
* **Interactive learning**: Give technical viewers insights into the site’s structure and implementation.  
* **SEO optimization**: Ensure the website is search engine friendly with proper metadata, Open Graph tags, semantic HTML, and optimized loading performance.

## 3\. Site Structure

The website will consist of 5 main pages:

| Page | Path | Purpose |
| ----- | ----- | ----- |
| **Home** | / | Minimal, focused landing page introducing the developer, skills, and main calls-to-action. |
| **About Me** | /about | Biography, career timeline, skill map, and technical philosophy. |
| **Projects** | /projects | Portfolio project cards with tags and filters; each project has a detailed page (/projects/\[slug\]). |
| **Blog** | /blog | Technical and personal articles which are fetched from Medium. |
| **Hire Me** | /hire | Contact form, collaboration process, testimonials. |

## **4\. Design Requirements**

### 4.1 General Design

* **Theme**: Minimalist, modern, premium feel.  
* **Color palette**:  
  * Light gray background  
  * Low-saturation pink for text and accents  
* **Typography**: Clean sans-serif font  
* **Layout:** Desktop-first design, then adapted for mobile devices.

### 4.2 Homepage (Landing Page)

#### Sections

1. Navbar  
   1. Links: About, Projects, Blog, Hire Me  
   2. **Developer Mode toggle**  
2. Hero Section  
   1. Headline: "Hi, I’m Liu"  
   2. Subheadline: "待定"  
   3. Call-to-Action buttons: \[🚀 View Projects\] \[💼 Hire Me\]  
   4. Tech badges: React / Next.js / Tailwind / Vue / Vite  
3. Footer  
   1. Copyright, social links (GitHub, LinkedIn, Email)

### 4.3 About Me Page

### 4.4 Projects Page

### 4.5 Blog Page

## 5\. Developer Mode (Technical Showcase)

### 5.1 Overview

Developer Mode will overlay technical details onto the live website, allowing visitors (especially technical ones) to see **how the site works under the hood**.

### 5.2 Features

When Developer Mode is enabled, 弹出 submode 进行选择查看 tailwind, react 和 nextjs 信息，默认的 submode 是 tailwind。

#### 1.Tailwind CSS Class Names

* displayed on hover or as inline badges above elements.

#### 2\. React Component Information

* Component name (e.g., `<HeroSection />`)  
* Props used (e.g., `{ title: "Hi, I’m Li" }`)  
* Hooks used (`useState`, `useEffect`, `useSWR`, etc.)  
* Optional: clickable link to source file (`/components/HeroSection.tsx`)

#### 3\. Next.js Page Information

* Page file path (e.g., /pages/projects/\[slug\].tsx)  
* Data fetching method:  
  * getStaticProps  
  * getServerSideProps  
  * getStaticPaths  
* Dynamic route status (\[slug\] parameters)  
* ISR (Incremental Static Regeneration) enabled or not

#### 4\. SEO Metadata

* \<title\> and \<meta description\> values  
* Open Graph (og:title, og:image, etc.)  
* Robots directives (index, follow)  
* Canonical URL

#### 5\. Technical Specification Reference

Technical Specification *(link to detailed Dev Mode spec document)*

## 6\. Implementation

### 6.1 Stack

* Frontend framework: React \+ Next.js  
* Styling: Tailwind CSS  
* Form handling: Next.js API routes (/api/contact)

### 6.2 Key Components

1. #### \<Inspectable /\>

2. #### fetch posts from Medium

## 7\. Roadmap

### Phase 1 – MVP

* Basic site structure with all 5 pages  
* Hero section \+ Tailwind hover class tooltips  
* Static content for About, Projects, Blog, Hire Me

### Phase 2 – Interactivity

* Developer Mode basic implementation  
* Blog with Medium  
* Project detail pages

### Phase 3 – Advanced Features

* Full Developer Mode overlays (React, Next.js, SEO info)  
* Search/filter for Projects and Blog  
* Contact form integration

### Phase 4 – Deployment

