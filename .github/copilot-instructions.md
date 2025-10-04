# LUGAV Audiovisual Portfolio - AI Agent Instructions

## Project Overview

This is a Bootstrap-based Spanish audiovisual portfolio website for LUGAV, featuring a multi-page photography/videography showcase. It's built from a customized template with specific branding and content modifications.

## Core Architecture & File Structure

### HTML Structure Pattern
- **Consistent Header**: All pages share identical header structure with navigation (`index.html`, `about-me.html`, `portfolio.html`, `contact.html`)
- **Spanish Language**: Content is in Spanish with specific terminology ("Inicio", "Sobre Mi", "Portafolio", "Contacto")
- **Preloader System**: Every page includes the same SVG preloader with rotating facts about photography/video
- **Bootstrap Classes**: Heavy use of Bootstrap 4 grid system and components

### CSS Architecture
```
css/
├── core-style.css       # Main styles (1251 lines) - DO NOT MODIFY directly
├── bootstrap.min.css    # Bootstrap framework - NEVER edit
├── responsive.css       # Responsive overrides
├── animate.css          # Animation library
├── owl.carousel.css     # Carousel styles
├── magnific-popup.css   # Lightbox styles
└── font-awesome.min.css # Icon fonts
```

**CRITICAL**: Custom styles go in root `style.css` only. This file is intentionally minimal with a comment header indicating it's for custom CSS.

### JavaScript Dependencies & Loading Order
```javascript
// Required loading sequence (see all HTML files):
1. jquery-2.2.4.min.js   # jQuery 2.x (legacy version)
2. popper.min.js         # Bootstrap dependency
3. bootstrap.min.js      # Bootstrap JS
4. plugins.js            # Third-party plugins (Owl Carousel, Waypoints, etc.)
5. active.js            # Custom site functionality
```

## Key Development Patterns

### Image Asset Organization
```
img/
├── bg-img/    # Background images: numbered 1.jpg through 13.jpg + additional
├── core-img/  # UI elements: logo.png, icons, favicon, etc.
```

**Pattern**: Background images follow numeric naming (1.jpg, 2.jpg, etc.) used in carousel indicators and slides.

### Portfolio Gallery System
- **Filter Categories**: Uses data-filter attributes (`*`, `.portraits`, `.weddings`, `.studio`, `.fashion`, `.life`)
- **Isotope Integration**: `active.js` handles masonry layout and filtering via Isotope plugin
- **Video Embedding**: Portfolio currently shows YouTube iframes instead of image gallery items
- **Responsive Grid**: Uses Bootstrap classes: `col-12 col-sm-6 col-md-4 col-lg-6`

### Carousel Implementation (Homepage)
```javascript
// 13-slide carousel with thumbnail indicators
$('#welcomeSlider').carousel({
    pause: false,
    interval: 4000
})
```

**Important**: Carousel uses both `data-slide-to` attributes AND background-image styles on indicators.

### Preloader Facts System
```javascript
// Rotating facts display (5-second intervals)
setInterval(function () {
    // Rotates through <li> items in .questions-area > ul
}, 5000);
```

## Styling Conventions

### Brand Colors & Typography
- **Font**: 'Poppins', sans-serif (loaded via Google Fonts)
- **Dark Theme**: Primary color #1d1d1d for headings
- **Accent**: #838383 for body text
- **Background**: #f2f4f8 for preloader

### Component Classes
- `.studio-btn` - Primary button styling
- `.gallery_img` - Magnific popup trigger for images
- `.column_single_gallery_item` - Gallery item wrapper
- `.carousel-item` - Bootstrap carousel slides with .bg-img class

## Critical Development Rules

### File Modification Guidelines
1. **NEVER edit**: `css/core-style.css`, `css/bootstrap.min.css`, or any `.min.js` files
2. **Custom CSS**: Add only to root `style.css` file
3. **Images**: Follow numeric naming for bg-img (14.jpg, 15.jpg, etc.)
4. **JavaScript**: Extend functionality in `js/active.js` or create separate custom files

### Content Localization
- All user-facing text is in Spanish
- Navigation: "Inicio" (Home), "Sobre Mi" (About), "Portafolio" (Portfolio), "Contacto" (Contact)
- Page titles follow pattern: "LUGAV - Audiovisual | [Page Name]"

### Portfolio Content Management
```html
<!-- Replace placeholder videos with actual portfolio items -->
<div class="col-12 col-sm-6 col-md-4 col-lg-6 column_single_gallery_item [CATEGORY]">
    <img src="img/bg-img/[PROJECT].jpg" alt="">
    <div class="hover_overlay">
        <a class="gallery_img" href="img/bg-img/[PROJECT].jpg">
            <i class="fa fa-eye"></i>
        </a>
    </div>
</div>
```

### JavaScript Plugin Integration
- **Isotope**: For portfolio filtering - initialization in `active.js`
- **Magnific Popup**: For image lightboxes - auto-binds to `.gallery_img`
- **Owl Carousel**: For Instagram feeds (if needed)
- **Waypoints**: For scroll-triggered animations

## Common Tasks

### Adding New Portfolio Items
1. Add image to `img/bg-img/` with descriptive name
2. Create gallery item HTML with appropriate category class
3. Ensure hover overlay and magnific popup structure

### Modifying Navigation
- Update all 4 HTML files simultaneously (header section)
- Maintain Bootstrap navbar structure and Spanish labels

### Customizing Styles
- Add overrides to root `style.css`
- Use specific selectors to override core styles
- Test responsiveness across breakpoints

### Performance Optimization
- Optimize images before adding to `img/bg-img/`
- Consider lazy loading for large portfolios
- Minify custom CSS/JS for production