

# Usman Khan - Dance & Fitness Website

A modern, responsive website showcasing Usman Khan's dance and fitness workshops, services, and testimonials.

## 🌟 Features

- **Dynamic Workshop Display** - JSON-driven content with real-time countdown timers
- **Responsive Design** - Works perfectly on all devices
- **Interactive Elements** - Hover effects, lightbox gallery, smooth animations
- **First-person Branding** - Usman speaks directly to visitors
- **Booking System** - Contact form for workshop bookings
- **Video Showcase** - Multiple banner videos with auto-rotation
- **Testimonials Wall** - Infinite scrolling customer reviews
- **Achievement Statistics** - Animated counters showing experience

## 🚀 Deployment on Vercel

### Option 1: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository or upload files directly
4. Vercel will automatically detect it's a static site
5. Click "Deploy" - your site will be live in seconds!

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow the prompts - your site will be live!
```

## 📁 Project Structure

```
usmanbhaiwebsite/
├── index.html              # Main website
├── styles.css              # All styling (1688 lines)
├── script.js               # JavaScript functionality (920 lines)
├── vercel.json             # Vercel configuration
├── data/
│   └── workshops.json      # Workshop data (JSON)
├── photos/                 # Image assets
│   ├── workshop posters
│   ├── gallery images
│   └── testimonial avatars
└── videos/                 # Video assets
    └── 13 banner videos
```

## 🔧 Adding New Workshops

1. **Add workshop image** to `photos/` folder
2. **Add workshop data** to `data/workshops.json`:
```json
{
  "id": "new-workshop",
  "title": "Workshop Title",
  "location": "City Name",
  "date": "2025-MM-DD",
  "time": "HH:MM",
  "description": "Workshop description",
  "image": "photos/your-image.jpg",
  "features": ["Feature 1", "Feature 2"],
  "price": 2500,
  "available": true
}
```

3. **Timer automatically appears** showing countdown to workshop date

## 🎯 Key Features

### JSON-Driven Content
- All workshop data stored in `data/workshops.json`
- Easy to update without touching code
- Dynamic rendering with real-time timers

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Smooth animations and transitions

### Performance Optimized
- Static site - fast loading
- Optimized images and videos
- Minimal dependencies

## 🌐 Live Demo

Your site will be available at: `https://your-project-name.vercel.app`

## 📞 Support

For any issues or questions about the website, contact the development team.

---

**Built with ❤️ for Usman Khan's Dance & Fitness Business**
