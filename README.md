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

## File Structure

```plaintext
i-am-news/
├── assets/
│   ├── css/
│   │   ├── theme.css               # Main CSS file
│   │   ├── builder.css             # Builder CSS file
│   │   └── responsive.css          # Responsive CSS file
│   ├── images/                      # All theme images
│   └── js/
│       ├── theme.js                 # Main JS file
│       └── libraries/               # Third-party JS libraries
├── inc/
│   ├── customizer/
│   │   ├── assets/
│   │   │   ├── images/             # Customizer images
│   │   │   ├── customizer-controls.css
│   │   │   ├── customizer-extends.js
│   │   │   └── customizer-preview.js
│   │   ├── controller/             # Controllers for customizer modules
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── box-shadow.js   # Box shadow control
│   │   │   │   ├── components.js   # Reusable JS components
│   │   │   │   └── icon-picker.js  # Icon picker control
│   │   │   ├── index.js            # Main React entry file
│   │   │   └── functions.js        # React helper functions
│   │   ├── custom-controls/
│   │   │   ├── base.php            # Base class for controls
│   │   │   ├── box-shadow.php      # Extends base class
│   │   │   └── icon-picker.php     # Extends base class
│   │   ├── sections/
│   │   │   ├── sections.php        # Base class for sections
│   │   │   ├── scroll-to-top.php   # Extends sections
│   │   │   └── main-banner.php     # Extends sections
│   │   ├── customizer.php          # Register all customizer controls
│   │   ├── enqueue.php             # Enqueue CSS and JS files
│   │   └── template-functions.php  # Customizer-related template functions
├── functions.php                   # Theme functions
├── style.css                        # Theme main stylesheet
└── README.md                        # Project documentation
```

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

Installation
===
### Method 1: WordPress Admin
1. Download the theme .zip file
2. Go to WordPress Dashboard → Appearance → Themes
3. Click Add New → Upload Theme
4. Upload the zip file
5. Click Install and then Activate

### Method 2: Manual Installation
1. Extract the theme folder
2. Upload it to: /wp-content/themes/
3. Activate the theme from the WordPress dashboard

How to Use?
===
1. Install and activate the theme
2. Go to Appearance → Customize
3. Configure:
    * Header layouts
    * Colors & typography
    * Frontpage sections
    * News ticker
    * Main banner
4. Create categories and posts
5. Assign categories to homepage sections
6. Publish and enjoy your news website

License
===
MIT © YourName

This project is licensed under the MIT License — feel free to use, modify, and distribute it in accordance with the license terms.

===
Now you're ready to go! The next step is easy to say, but harder to do: make an awesome WordPress theme. :)

Good luck!
