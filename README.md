# Orion Solidified, Inc. Website

A stunning fullscreen website featuring an interactive Three.js animation of the Orion constellation, showcasing Orion Solidified, Inc. - a tech-related venture firm.

## Features

- **Interactive Orion Constellation**: Accurate 3D representation of the Orion constellation with real star positions, colors, and spectral classifications
- **Smooth Animations**: 
  - Slow auto-rotation of the constellation
  - Twinkling star effects
  - Interactive camera controls (drag to rotate, scroll to zoom)
- **Immersive Experience**: Fullscreen layout with dark night sky aesthetic
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Content Sections**:
  - Hero section with company name and tagline "Dare to believe"
  - About section
  - Contact information
  - Portfolio showcase with company logos

## Technologies

- **HTML5** - Page structure
- **CSS3** - Styling with glassmorphism effects and responsive design
- **JavaScript (ES6+)** - Application logic
- **Three.js** - 3D constellation rendering and animation
- **OrbitControls** - Interactive camera controls

## Project Structure

```
site/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styling and responsive design
├── js/
│   ├── main.js            # Three.js scene initialization
│   ├── constellation.js   # Orion constellation data and rendering
│   └── controls.js        # Animation and interaction controls
├── assets/
│   └── logos/             # Portfolio company logos
│       ├── logo-1.svg
│       ├── logo-2.svg
│       ├── logo-3.svg
│       └── logo-4.svg
└── README.md
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No build process or dependencies required - all libraries are loaded via CDN

## Browser Requirements

- Modern browser with ES6 module support
- WebGL support for Three.js rendering
- Recommended: Chrome, Firefox, Safari, or Edge (latest versions)

## Constellation Details

The Orion constellation includes:
- **Major Stars**: Betelgeuse (reddish-orange), Rigel (blue-white), Bellatrix, and the three belt stars (Mintaka, Alnilam, Alnitak)
- **Orion's Sword**: Stars including the Orion Nebula region
- **Accurate Colors**: Star colors match their spectral classifications
- **Constellation Lines**: Subtle lines connecting major stars
- **Background Starfield**: 2000+ background stars for depth

## Customization

### Contact Information
Update the contact details in `index.html`:
- Address: 15555 Main Street, Hesperia, California 92345
- Phone: 818 483 0100
- Email: hello@orionsolidified.io

### Portfolio Logos
Replace the placeholder logos in `assets/logos/` with actual portfolio company logos (SVG format recommended).

### Colors
The color palette is defined in `styles/main.css`:
- Background: `#0a0e27` (deep indigo/black)
- Text: `#ffffff` (white)
- Accent glows: Purple/indigo tones

### Animation Speed
Adjust animation parameters in `js/controls.js`:
- `autoRotateSpeed`: Controls rotation speed (default: 0.5)
- Twinkling effect speed in the animation loop

## License

Copyright © Orion Solidified, Inc. All rights reserved.

## Contact

**Orion Solidified, Inc.**  
15555 Main Street  
Hesperia, California 92345  
Phone: 818 483 0100  
Email: hello@orionsolidified.io

---

*Dare to believe*
