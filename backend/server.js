const express = require('express');
const path = require('path');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 8000;

// ===== SECURITY MIDDLEWARE =====

// 1. Helmet - Set various HTTP headers for security
app.use(helmet());

// 2. Content Security Policy
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
    },
}));

// 3. HTTP Method Validation - Only allow safe methods
app.use((req, res, next) => {
    const allowedMethods = ['GET', 'HEAD', 'OPTIONS'];
    
    if (!allowedMethods.includes(req.method)) {
        console.warn(`⚠️ Security Alert: ${req.method} request attempted on ${req.path}`);
        return res.status(405).json({ 
            error: 'Method Not Allowed',
            message: `${req.method} requests are not allowed on this server`,
            allowedMethods: allowedMethods
        });
    }
    next();
});

// 4. Prevent MIME type sniffing
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
});

// 5. Prevent Clickjacking
app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
});

// 6. XSS Protection
app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// 7. Referrer Policy
app.use((req, res, next) => {
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// 8. Strict Transport Security (for HTTPS deployments)
app.use((req, res, next) => {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

// ===== STATIC FILE SERVING =====

// Serve static files (CSS, JS, images)
app.use('/static', express.static(path.join(__dirname, 'static'), {
    etag: true,
    maxAge: '1h'
}));

// Serve HTML templates
app.use(express.static(path.join(__dirname, 'templates'), {
    etag: true,
    maxAge: '1h'
}));

// ===== SECURITY LOGGING =====

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`📊 ${new Date().toISOString()} - ${req.method} ${req.path} - ${req.ip}`);
    next();
});

// ===== ERROR HANDLING =====

// Handle 404
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: 'The requested resource does not exist'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});

// ===== START SERVER =====

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                    🔒 SECURE SERVER 🔒                    ║
╚════════════════════════════════════════════════════════════╝
✅ Server running at http://localhost:${PORT}
🔐 Security Features Enabled:
   • HTTP Method Validation (GET, HEAD, OPTIONS only)
   • Helmet.js Security Headers
   • Content Security Policy (CSP)
   • X-Frame-Options (Clickjacking Prevention)
   • X-Content-Type-Options (MIME Sniffing Prevention)
   • XSS Protection Headers
   • HSTS (for HTTPS deployments)
   • Referrer Policy

📝 Press Ctrl+C to stop the server
╚════════════════════════════════════════════════════════════╝
    `);
});
