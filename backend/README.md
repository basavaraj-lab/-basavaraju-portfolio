# Backend Folder Structure

This folder contains the secure backend server and frontend templates for your portfolio.

## 📁 Directory Structure

```
backend/
├── server.js                  # Secure Express.js server with HTTP validation
├── package.json              # Node.js dependencies
├── .env                       # Environment configuration
├── .gitignore                # Git ignore file
│
├── templates/                # HTML template files
│   ├── index.html            # Home page
│   ├── about.html            # About page
│   ├── projects.html         # Projects showcase
│   ├── skills.html           # Skills page
│   ├── resume.html           # Resume page
│   └── contact.html          # Contact page
│
└── static/                   # Static assets
    ├── css/
    │   └── style.css         # Main stylesheet
    ├── js/
    │   └── script.js         # JavaScript functionality
    └── images/               # Project and portfolio images
        ├── project1.png
        ├── project2.png
        └── project3.png
```

## 🚀 Quick Start

### 1. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Start Server
\`\`\`bash
npm start
\`\`\`

The server will run on: **http://localhost:8000**

## 🔒 Security Features

✅ **HTTP Method Validation** - Only GET, HEAD, OPTIONS allowed
✅ **Security Headers** - Helmet.js protection
✅ **Content Security Policy** - XSS prevention
✅ **X-Frame-Options** - Clickjacking protection
✅ **Request Logging** - All requests tracked

## 📝 File Organization

- **templates/** → All HTML files (served from root)
- **static/css/** → Stylesheets
- **static/js/** → JavaScript files
- **static/images/** → Images and assets

## 🔗 File References in Templates

All files reference the static assets with the correct paths:
```html
<!-- CSS -->
<link rel="stylesheet" href="../static/css/style.css">

<!-- JavaScript -->
<script src="../static/js/script.js"></script>

<!-- Images -->
<img src="../static/images/project1.png">
```

## 📦 Dependencies

- **Express.js** - Web framework
- **Helmet.js** - Security headers

## 🛠️ Development

For development with auto-reload:
\`\`\`bash
npm run dev
\`\`\`
(Requires nodemon installation)

## 📋 Production Checklist

- [ ] Set NODE_ENV=production in .env
- [ ] Enable HTTPS with SSL certificates
- [ ] Configure proper CORS if needed
- [ ] Set up reverse proxy (Nginx/Apache)
- [ ] Add rate limiting middleware
- [ ] Monitor server logs
- [ ] Update security headers for HTTPS

## 🐛 Troubleshooting

**Port already in use?**
\`\`\`bash
lsof -i :8000 | grep -v COMMAND | awk '{print \$2}' | xargs kill -9
\`\`\`

**Images not loading?**
- Check that images are in: `backend/static/images/`
- Verify HTML paths: `../static/images/filename.png`

**Styles not applying?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Verify CSS is at: `backend/static/css/style.css`

---

For more information, see [SECURITY.md](../SECURITY.md)
