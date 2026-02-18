[![Build Status](https://travis-ci.org/Automattic/_s.svg?branch=master)](https://travis-ci.org/Automattic/_s)

Welcome to "I am News" Wordpress Theme
===

"I am News" is a modern, fast, and highly customizable WordPress news theme built for publishers, bloggers, developers and online magazines. Designed with performance and flexibility in mind, it helps you create professional news websites without touching a single line of code.

Whether you're running a daily news portal, tech blog, magazine site, or niche content platform, "I am News" theme provides clean layouts, powerful customization options, and seamless integration with the WordPress ecosystem.

Motivation
===
The motivation behind "I am News" was to create a fast, deverloper-friendly news that that prioritizes performance, UI / UX and SEO. A lot of news theme are either messy or don't provide enough features to properly customize. This project exists to provide:
* Clean and modular architecture
* Easy child-theme overrides
* Amazing UI / UX
* Ultimate Performance
* Tons of features

Code Style
===
This theme follows:
* WordPress HTML coding standards
* WordPress CSS coding standards
* WordPress PHP coding standards
* WordPress JavaScript Coding Standards
* React Functional Components
* Use IIFE for jQuery

Object-Oriented Programming (OOP)
===
This project is built usin Object-Oriented Programming principles.
### Architecture
- Namespaced class structure
- Modular components

### Patterns Used
- Singleton pattern for core loaders
- Trait usage for shared functionality
- Interface usage

### Namespacing
All classes are properly namespaced to avoid global scope conflicts

Example:
IAN\Customizer

Tech / Framework Used
===
* WordPress ( Block Editor / Gutenberg )
* PHP 8+
* jQuery
* React
* CSS

File / Structure
===
i-am-news/
|
|___ assets/
|     |___css/
|     |     |__ theme.css               # Main css file
|     |     |__ builder.css             # Builder css file
|     |     |__ responsive.css          # Responsive css file
|     |
|     |___image/
|     |
|     |___js/
|     |     |__ theme.js                # Main Js file
|     |
|     |___libraries/
|
|___ inc/
|       |___ customizer/
|       |       |___ assets/
|       |       |       |___ image/                         # Add customizer images
|       |       |       |___ customizer-controls.css        # Add customizer images
|       |       |       |___ customizer-extends.js          # Add customizer images
|       |       |       |___ customizer-preview.js          # Add customizer images
|       |       |
|       |       |___ controller/
|       |       |           |___ src/
|       |       |           |       |___ components/
|       |       |           |                  |___ box-shadow.js       # Box shadow control
|       |       |           |                  |___ components.js       # Holds resuable components
|       |       |           |                  |___ icon-picker.js      # Icon Picker control
|       |       |           |
|       |       |           |___ index.js                   # Main react file
|       |       |           |___ functions.js               # Holds react functions
|       |       |
|       |       |___ custom-controls/
|       |       |           |___ base.php                   # Base class
|       |       |           |___ box-shadow.php             # Extends base
|       |       |           |___ icon-picker.php            # Extends base
|       |       |
|       |       |___ sections/
|       |       |           |___ sections.php               # Base class
|       |       |           |___ scroll-to-top.php          # Extends sections
|       |       |           |___ main-banner.php            # Extends sections
|       |       |
|       |       |___ customizer.php                         # Register customizer controls
|       |
|       |___ enqueue.php     # Enqueue files
|       |
|       |___ template-functions.php     # theme template functions
|
|___ functions.php          # Theme functions
|
|___ style.css              # Theme main stylesheet
|
|___ README.md              # Project documentation

Features
===
* Header & Footer builder
* Lightweight and performance optimized
* Dark mode support
* Fully responsive design
* Child theme friendly
* Modular template-parts structure

Code Example
===
Example: Adding a customizer setting
Example: Adding a customizer setting

Now you're ready to go! The next step is easy to say, but harder to do: make an awesome WordPress theme. :)

Good luck!
