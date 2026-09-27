# ApexPlanet Task 4 — Full Project Implementation

## Overview

This project was built for the **ApexPlanet Software Pvt. Ltd. 45-Day Web Development Internship** under **Task 4 — Full Project Implementation**. It represents a cohesive, production-grade frontend web application combining a **Multi-Page Personal Developer Portfolio**, a **LocalStorage-Persisted To-Do Productivity Suite**, and an **Interactive E-Commerce Product Catalog with Dynamic Multi-Criteria Filtering & Sorting**.

Developed with pure **HTML5**, modern **CSS3 (Custom Properties, Flexbox, and CSS Grid)**, and modular **Vanilla JavaScript (ES6+)**, this project demonstrates complete frontend engineering capabilities without external frameworks or dependencies.

---

## Features

### 1. Personal Portfolio Website (Multi-Page Architecture)
- **Home Page (`index.html`)**: Developer introduction, interactive hero section with dynamic status badges, core stack overview, live statistics counters, and featured internship project showcases.
- **About Page (`about.html`)**: In-depth developer background, technical interests, comprehensive self-assessment skill competency cards (Markup, Styling, JavaScript, Tools), and internship milestone timeline.
- **Projects Page (`projects.html`)**: Interactive catalog of all internship tasks (Task 1 through Task 4), feature lists, technology badges, live application links, and GitHub repository links.
- **Contact Page (`contact.html`)**: Accessible client-side contact portal with real-time regex email and string validation, live character counter, inline feedback error states, and non-blocking toast notifications.
- **Global Responsive Navigation**: Sticky glassmorphism header, active page indicator, accessible ARIA attributes, and an animated mobile hamburger drawer.

### 2. To-Do Application (`todo.html`)
- **CRUD Operations**: Add, view, edit (modal-based inline updates), mark complete/active, and delete individual tasks.
- **localStorage Persistence**: Task state is serialized to JSON and persisted using the browser's native `localStorage.setItem()` and restored via `localStorage.getItem()` upon page refresh or session restart.
- **Multi-Level Filtering & Search**: Instant filter tabs for *All*, *Active*, and *Completed* tasks, combined with real-time text search.
- **Analytics & Progress**: Real-time counters for Total, Pending, and Completed tasks, coupled with an animated percentage progress bar.
- **User Experience Polish**: Empty state messaging, priority tags (High, Medium, Low), task timestamping, and clear completed action with modal confirmation.

### 3. Product Listing & Filter Suite (`products.html`)
- **Dynamic JavaScript Dataset**: 12 realistic sample products managed in memory with structured metadata (images, prices, ratings, categories, descriptions, badges).
- **Category Filtering**: Instant category filtering across *All*, *Electronics*, *Audio & Accessories*, *Wearables*, *Fashion*, and *Home Living* with live product counts.
- **Price Filtering**: Dual price control via predefined price brackets (*Under ₹2,000*, *₹2,000–₹5,000*, *₹5,000–₹15,000*, *Above ₹15,000*) and a continuous maximum price range slider.
- **Customer Rating Filtering**: Filter items by star rating thresholds (★ 4.8+, ★ 4.5+).
- **Dynamic Sorting**: Real-time sorting by *Price: Low to High*, *Price: High to Low*, *Rating: High to Low*, and *Name: A to Z*.
- **Combined Filtering Engine**: Search query, category selection, price range, rating threshold, and sorting criteria work simultaneously in unison without page reload.
- **Quick View Modal & Cart Feedback**: Interactive product modal showing full specifications and dynamic cart badge increments with toast feedback.
- **Clear Filters & Empty State**: One-click reset restoring all filters and clean empty-state fallback when zero results match.

---

## Technologies

- **HTML5**: Semantic tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`), ARIA accessibility attributes, and responsive viewport configuration.
- **CSS3**: CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, Glassmorphism (`backdrop-filter`), CSS transitions, and keyframe animations.
- **Vanilla JavaScript (ES6+)**: Event-driven architecture, DOM manipulation, JSON serialization, array methods (`filter`, `map`, `sort`, `find`, `reduce`), and `localStorage` API.
- **Media Queries**: Mobile-first responsive breakpoints (1920px, 1440px, 1024px, 768px, 480px, 375px).
- **Google Fonts**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [Inter](https://fonts.google.com/specimen/Inter).

---

## Project Structure

```text
Task 4/
├── index.html              # Multi-page Portfolio Home
├── about.html              # Developer Background & Skill Competencies
├── projects.html           # Project Showcase & Internship Tasks
├── contact.html            # Contact Portal with Real-Time Validation
├── todo.html               # To-Do Application with localStorage Persistence
├── products.html           # Product Listing with Dynamic Filters & Sorting
│
├── css/
│   └── styles.css          # Design tokens, global utilities, components & media queries
│
├── js/
│   ├── main.js             # Mobile nav drawer, active link detector, form validation, toast
│   ├── todo.js             # To-Do CRUD state engine, filters & localStorage sync
│   └── products.js         # Product dataset, multi-faceted filter/sort engine & quick view
│
├── assets/
│   ├── images/             # Vector SVG product artwork & developer profile photo
│   │   ├── backpack.svg
│   │   ├── camera.svg
│   │   ├── chair.svg
│   │   ├── headphones.svg
│   │   ├── keyboard.svg
│   │   ├── lamp.svg
│   │   ├── laptop.svg
│   │   ├── monitor.svg
│   │   ├── profile.jpg
│   │   ├── smartwatch.svg
│   │   ├── sneakers.svg
│   │   ├── speaker.svg
│   │   └── sunglasses.svg
│   └── icons/
│
└── README.md               # Official task documentation
```

---

## How to Run

1. Clone or download the repository to your local system.
2. Navigate to the `Task 4` directory.
3. Open `index.html` directly in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
4. Alternatively, serve using a lightweight local development server:
   ```bash
   # Using VS Code Live Server extension or Python built-in HTTP server:
   python -m http.server 8000
   ```
5. Navigate through the top navigation bar to explore all 6 pages and applications.

---

## Task 4 Requirement Mapping

| Official Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Requirement 1: Multi-Page Portfolio** | Distinct HTML pages (`index.html`, `about.html`, `projects.html`, `contact.html`) with unified navigation, active page highlighting, mobile hamburger drawer, and complete media query responsiveness (1920px to 375px). | **100% SATISFIED** |
| **Requirement 2: To-Do with localStorage** | Dedicated `todo.html` application with full CRUD (Add, Edit, Complete, Delete), filter tabs (*All/Active/Completed*), search, real-time analytics, and guaranteed data retention across refreshes via native `localStorage.setItem()` and `localStorage.getItem()`. | **100% SATISFIED** |
| **Requirement 3: Product Listing with Filtering & Sorting** | Dedicated `products.html` page driven by JavaScript data structures. Supports simultaneous category filtering (6 categories), price filtering (brackets + slider), rating filtering, live text search, multi-criteria sorting, quick view modals, and zero-reload DOM rendering. | **100% SATISFIED** |

---

## GitHub Repository Information

- **Repository**: [https://github.com/Nirnaywork2004/ApexPlanet-Task-4](https://github.com/Nirnaywork2004/ApexPlanet-Task-4)
- **Clone URL**: `git clone https://github.com/Nirnaywork2004/ApexPlanet-Task-4.git`
- **Branch**: `main`

---

## Developer Details

- **Developer**: Priyotosh Mandal
- **Internship**: ApexPlanet Software Pvt. Ltd. (45-Day Web Development Internship)
- **GitHub**: [@priyotosh22](https://github.com/priyotosh22)
- **LinkedIn**: [priyotoshnmandal](https://www.linkedin.com/in/priyotoshnmandal)

