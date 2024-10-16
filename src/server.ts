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



app.use(express.static('/root/develop/codes/my_business/customers/hativatyoav/landing/public/'));
app.use(express.static('/root/develop/codes/my_business/customers/hativatyoav/landing/src/client/build/'));



///////////////
///////////////



// טיפול בסוגי קבצים (CSS/JS)
app.use((req: any, res: any, next: any) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});



// מסלול למשיכת HTML משרת ה-PHP והחזרה ללקוח
app.get('/hey', async (req, res) => {

});



// מסלול להצגת דף הבית הראשי
app.get('/home', (req, res) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', 'welcome.html')); // להציג את הקובץ welcome.html
});



// מסלול להצגת דף ה-index הראשי
app.get('/', (req, res) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', 'index.html')); // להציג את index.html
});



// מסלול לפרוקסי ל-view לאתר חיצוני
app.use('/view', createProxyMiddleware({
  target: 'https://hatmaryoav-site.web.app',
  changeOrigin: true,
  pathRewrite: {
    '^/view': '/', // שינוי הנתיב מ-view ל-root של האתר החיצוני
  },
  secure: false // להתעלם מבעיות תעודת SSL אם ישנן
}));



// מסלול לפרוקסי ל-admin לאתר חיצוני
app.use('/xxx', (req: any, res: any) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/src/client/build/', 'index.html'));
});


// מסלול לדף שגיאה 404
app.get('/error', (req, res) => {
  res.sendFile(path.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', '404.html')); // להציג את 404.html
});



// הפעלת השרת
app.listen(port, () => {
  console.log(`Web server running at http://hativatyoav.site:${port}`);
});