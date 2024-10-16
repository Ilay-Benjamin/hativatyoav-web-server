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
app.use(express.static(path.join(__dirname, '/../public')));


// Serve the main index page
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/../public', 'welcome.html')); // Serve the index.html file
});


// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.get('/home', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html')); // Serve the 404.html file
});


// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.use('/ladning/view', createProxyMiddleware({
  target: 'https://hatmaryoav-site.web.app',
  changeOrigin: true,
  pathRewrite: {
    '^/ladning/view': '/', // Rewrite the /view path to the root of the external site
  },
  secure: false // Ignore SSL certificate issues if any
}));


// Proxy requests to /admin to the external site (hativatyoav.site)
app.use('/ladning/admin', createProxyMiddleware({
  target: 'https://hativatyoav.site',
  changeOrigin: true,
  pathRewrite: {
    '^/landing/admin': '/landing/applications/admin/build/index.html', // Serve the admin page
  },
  secure: false, // Ignore SSL certificate issues if any
  onError: (err: any, req: any, res: any) => {
    console.error('Proxy error:', err);
    res.status(500).send('There was an error with the proxy.');
  }
}));


// Serve the 404 error page directly instead of redirecting
app.get('/error', (req: any, res: any) => {
  res.sendFile(path.join(__dirname, 'public', '404.html')); // Serve the 404.html file
});



// Start the web server
app.listen(port, () => {
  console.log(`Web server running at http://hativatyoav.site:${port}`);
});

// 5


// 5