# LUGAV Audiovisual Portfolio - AI Agent Instructions

## Project Overview

This is a Bootstrap-based Spanish audiovisual portfolio website for LUGAV, featuring a multi-page photography/videography showcase. It's built from a customized template with **component-based architecture** using Fetch API for reusable HTML components.

## Core Architecture & File Structure

### Component System (NEW)
```
components/
├── preloader.html  # SVG loading animation with rotating facts
├── header.html     # Navigation bar (auto-configures per page)
└── footer.html     # Contact information footer
```

**Usage Pattern**:
```html
<!-- In any page -->
<body>
    <div data-component="preloader"></div>
    <div data-component="header"></div>
    <!-- Page content -->
    <div data-component="footer"></div>
</body>
```

**JavaScript Loading**: `components-loader.js` MUST load before jQuery:
```html
<script src="js/components-loader.js"></script>
<script src="js/jquery/jquery-2.2.4.min.js"></script>
```

### HTML Structure Pattern
- **Component Placeholders**: Use `<div data-component="name"></div>` for shared elements
- **Auto-Configuration**: Header automatically marks active page and adds background (except index.html)
- **Spanish Language**: Content is in Spanish with specific terminology ("Inicio", "Sobre Mi", "Portafolio", "Contacto")
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
// UPDATED loading sequence:
1. components-loader.js  # Component system - MUST BE FIRST
2. jquery-2.2.4.min.js   # jQuery 2.x (legacy version)
3. popper.min.js         # Bootstrap dependency
4. bootstrap.min.js      # Bootstrap JS
5. plugins.js            # Third-party plugins (Owl Carousel, Waypoints, etc.)
6. active.js            # Custom site functionality
```

## Key Development Patterns

### Component Development
**Creating New Components**:
1. Add HTML file to `components/` directory
2. Register in `js/components-loader.js` COMPONENTS object
3. Use `<div data-component="name"></div>` placeholder in pages

**Component Features**:
- **Dynamic Header**: Detects current page, adds `.active` class to nav-item
- **Background Management**: Automatically adds header background to all pages except index
- **Event System**: Fires `componentsLoaded` event when all components are ready

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
3. **Components**: Edit `components/*.html` files, NOT individual pages
4. **Images**: Follow numeric naming for bg-img (14.jpg, 15.jpg, etc.)
5. **JavaScript**: Extend functionality in `js/active.js` or create separate custom files

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

### Adding New Pages
1. Create HTML file with component placeholders
2. Include `components-loader.js` before jQuery
3. Add data-page attribute to header component for nav highlighting

### Modifying Shared Elements
- **Header/Footer**: Edit `components/header.html` or `components/footer.html`
- Changes apply to ALL pages automatically
- No need to update multiple HTML files

### Adding New Portfolio Items
1. Add image to `img/bg-img/` with descriptive name
2. Create gallery item HTML with appropriate category class
3. Ensure hover overlay and magnific popup structure

### Customizing Styles
- Add overrides to root `style.css`
- Use specific selectors to override core styles
- Test responsiveness across breakpoints

### Development Server
**IMPORTANT**: Component system requires HTTP server (not `file://` protocol)
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: PHP
php -S localhost:8000

# Option 3: Node.js
npx http-server
```

### Performance Optimization
- Optimize images before adding to `img/bg-img/`
- Consider lazy loading for large portfolios
- Minify custom CSS/JS for production
- Components are cached by browser after first load