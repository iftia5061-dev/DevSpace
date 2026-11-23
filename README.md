# DevSpace Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and Vanilla JavaScript.

## 🎨 Color System

- **Primary Dark**: #4F7260
- **Secondary Green**: #64A47A
- **Background**: #F5F7F4
- **Dark Text**: #18251D
- **Accent**: #E6B879

## 📁 Project Structure

```
if-web/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── main.js
│   ├── projects.js
│   ├── contact.js
│   └── animations.js
├── pages/
│   ├── about.html
│   ├── projects.html
│   ├── project-details.html
│   ├── services.html
│   └── contact.html
├── index.html
├── favicon.ico
└── README.md
```

## 📄 Pages

1. **Home** - Landing page with hero, stats, featured projects, skills, services, and CTA
2. **About Me** - Personal introduction, experience timeline, technical skills, tools, and working process
3. **Projects** - Project gallery with category filter and search
4. **Project Details** - Dynamic template for individual project showcases
5. **Services** - Service cards, what I offer, working process, and FAQ
6. **Contact** - Contact info, email, WhatsApp, social links, and contact form

## ✨ Features

- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Smooth Scrolling
- ✅ Mobile Navigation with Hamburger Menu
- ✅ Project Filtering & Search
- ✅ Animated Counters
- ✅ Scroll Animations
- ✅ Skill Progress Bars
- ✅ Contact Form Validation
- ✅ Dark/Light Mode Ready

## 🚀 How to Use

1. Clone or download the project
2. Open `index.html` in your browser
3. Navigate through the pages using the navigation menu

## 📱 Responsive Breakpoints

- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1024px
- **Desktop**: 1025px+

## 🔧 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome / Lucide Icons (add via CDN)
- Google Fonts (add via CDN)

## 📝 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-dark: #4F7260;
    --secondary-green: #64A47A;
    /* ... other colors */
}
```

### Content
Edit text and content in respective HTML files.

### Images
Replace placeholder divs with actual images in `assets/images/`.

## 🌐 Deployment

Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3

## 📧 Contact Form

Currently uses client-side validation. For production:
- Integrate FormSubmit or EmailJS
- Or connect to a backend API

## 📄 License

This project is open source and available for personal and commercial use.

---

Built with ❤️ by DevSpace
