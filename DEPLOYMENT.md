# 🚀 Deploy to Vercel - Step by Step Guide

## Quick Deploy (5 minutes)

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or email

2. **Create New Project**
   - Click "New Project"
   - Choose "Upload" or connect your GitHub repo

3. **Upload Files**
   - If uploading: Drag and drop your entire `usmanbhaiwebsite` folder
   - If GitHub: Select your repository

4. **Deploy**
   - Vercel will auto-detect it's a static site
   - Click "Deploy"
   - Your site will be live in 30 seconds!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run this in your project folder)
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - Project name? → usman-khan-website (or any name)
# - In which directory is your code located? → ./ (current directory)
# - Want to override the settings? → No

# Your site will be live at: https://your-project-name.vercel.app
```

## ✅ What Works on Vercel

- ✅ **Static HTML/CSS/JS** - Perfect for your site
- ✅ **JSON data loading** - Your workshops.json will work
- ✅ **Image and video assets** - All your photos and videos
- ✅ **Custom domain** - You can add your own domain later
- ✅ **HTTPS** - Automatic SSL certificate
- ✅ **CDN** - Global content delivery
- ✅ **Free tier** - 100GB bandwidth/month

## 🔧 Post-Deployment

### 1. Custom Domain (Optional)
- Go to your Vercel dashboard
- Click on your project
- Go to "Settings" → "Domains"
- Add your custom domain

### 2. Environment Variables (If needed)
- Go to "Settings" → "Environment Variables"
- Add any API keys or configuration

### 3. Analytics (Optional)
- Go to "Settings" → "Analytics"
- Enable Vercel Analytics for free

## 📊 Performance

Your site will be:
- ⚡ **Lightning fast** - Static files served from CDN
- 📱 **Mobile optimized** - Responsive design
- 🔒 **Secure** - HTTPS by default
- 🌍 **Global** - Served from edge locations

## 🆘 Troubleshooting

### If JSON doesn't load:
- Check that `data/workshops.json` is in the correct location
- Verify JSON syntax is valid
- Check browser console for errors

### If images don't show:
- Ensure all image paths are correct
- Check that images are in the `photos/` folder
- Verify file names match exactly

### If videos don't play:
- Check video file formats (MP4 recommended)
- Ensure videos are in the `videos/` folder
- Verify file names match exactly

## 🎯 Success!

Your website will be live at: `https://your-project-name.vercel.app`

**Features that will work perfectly:**
- ✅ Workshop countdown timers
- ✅ JSON-driven content updates
- ✅ Responsive design
- ✅ Contact form
- ✅ Image gallery
- ✅ Video rotation
- ✅ All animations and interactions

---

**Need help?** Check Vercel's documentation or contact their support! 