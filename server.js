////////////
////////////
<<<<<<< HEAD
=======
////////////
////////////
////////////
>>>>>>> @{-1}


const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 9175; // Set your port here

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.use('/view', createProxyMiddleware({
    target: 'https://hatmaryoav-site.web.app',
    changeOrigin: true,
    pathRewrite: {
        '^/view': '/', // Rewrite the /view path to the root of the external site
    },
    secure: false // Ignore SSL certificate issues if any
}));

// Proxy requests to /admin to the external site (hativatyoav.site)
app.use('/admin', createProxyMiddleware({
    target: 'https://hativatyoav.site',
    changeOrigin: true,
    pathRewrite: {
        '^/admin': '/landing/applications/admin/build/index.html', // Serve the admin page
    },
    secure: false, // Ignore SSL certificate issues if any
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('There was an error with the proxy.');
    }
}));

// Serve the 404 error page directly instead of redirecting
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html')); // Serve the 404.html file
});

// Handle all other routes with a 404 page
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Directly serve 404.html for undefined routes
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
