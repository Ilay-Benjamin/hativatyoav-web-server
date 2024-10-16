import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import path from 'path';
import axios from 'axios';



///////////////
///////////////



const app = express();
const port = 9175; // Set your web server port here



///////////////
///////////////



app.use(express.static(path.join(__dirname, 'public')));



///////////////
///////////////



// Route to fetch HTML from PHP server and return to client
app.get('/hey', async (req, res) => {
  try {
      // The URL of your PHP server that returns the HTML file
      const phpServerUrl = 'https://client.hativatyoav.site/index.php?project=landing&app=admin';
      // Make the request to the PHP server
      const response = await axios.get(phpServerUrl);

      // Send the HTML response received from the PHP server to the client
      res.send(response.data);
  } catch (error) {
      console.error('Error fetching HTML from PHP server:', error);
      res.status(500).send('Error fetching HTML from PHP server.');
  }
});



///////////////
///////////////



// Serve the main index page
app.get('/home', (req: any, res: any) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', '/welcome.html')); // Serve the index.html file
});


// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.get('/', (req: any, res: any) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/', '/public', '/index.html')); // Serve the index.html file
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
  secure: false, // Ignore SSL certificate issues if any
  changeOrigin: true,
  pathRewrite: {
    '^/landing/admin': '/landing/applications/admin/build/index.html', // Serve the admin page
  },
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