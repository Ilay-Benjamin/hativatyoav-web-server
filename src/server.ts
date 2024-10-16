const express = require('express');
const path = require('path');
const app = express();
const port = 9175;  // The port where your Node.js server runs


// Serve static files from the public directory (e.g., favicon.ico, robots.txt)
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the React app's build directory
app.use('/admin', express.static(path.join(__dirname, 'src/client/build')));

// Route to website main home page (static html from public dir - index.html)files from the public directory

app.get('/', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to admin dashboard (static html from public dir - admin/index.html) files from the public directory

// Fallback for client-side routing (SPA) in React
app.get('/admin/*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, 'src/client/build', 'index.html'));
});

// Handle API or backend routes here
app.get('/api/some-endpoint', (req: any, res: any) => {
    res.json({ message: 'This is an API endpoint' });
});

// Catch-all route for undefined routes and show 404 error
app.get('*', (req: any, res: any) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
