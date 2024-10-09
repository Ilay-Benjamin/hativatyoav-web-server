GNU nano 7.2                                                                                                                                                                 server.js
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = 9175; // Set your port here


// HEYYY
// Display the URLs to the client
const displayUrls = (req, res) => {
    const urls = `
        <h1>Welcome to the Server</h1>
        <ul>
            <li><a href="/view">/view - Landing Page</a></li>
            <li><a href="/admin">/admin - Admin Page</a></li>
            <li><a href="/404">/404 - Custom 404 Error</a></li>
        </ul>
    `;
    res.send(urls);
};

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

// Serve a custom 404 page for all other routes
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public/404.html'));
});

// Root URL displays the correct client URLs
app.get('/', displayUrls);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});







