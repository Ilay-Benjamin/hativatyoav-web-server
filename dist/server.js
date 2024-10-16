"use strict";
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();
const port = 9175; // Set your web server port here


///////////////
///////////////
///////////////
///////////////
///////////////
///////////////
///////////////



// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// Serve the main index page
app.get('/', (req, res) => {
    res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/', '/public', '/home.html')); // Serve the index.html file
});


// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.get('/home', (req, res) => {
    res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/', '/public', '/index.html')); // Serve the index.html file
});


// Proxy requests to /admin to the external site (hativatyoav.site)
app.use('/view', createProxyMiddleware({
    target: 'https://client.hativatyoav.site/index.php?project=landing&app=view',
    changeOrigin: true,
    pathRewrite: {
        '^/view': '/', // Serve the admin page
    },
    secure: false, // Ignore SSL certificate issues if any
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('There was an error with the proxy.');
    }
}));


// Proxy requests to /admin to the external site (hativatyoav.site)
app.use('/admin', createProxyMiddleware({
    target: 'https://client.hativatyoav.site/index.php?project=landing&app=admin',
    changeOrigin: true,
    pathRewrite: {
        '^/admin': '/', // Serve the admin page
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


// Start the web server
app.listen(port, () => {
    console.log(`Web server running at http://hativatyoav.site:${port}`);
});


// 5
// 5
