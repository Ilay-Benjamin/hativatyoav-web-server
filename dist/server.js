"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
///////////////
///////////////
const app = (0, express_1.default)();
const port = 9175; // Set your web server port here
///////////////
///////////////
app.use(express_1.default.static('/root/develop/codes/my_business/customers/hativatyoav/landing/public/'));
///////////////
///////////////
// טיפול בסוגי קבצים (CSS/JS)
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    else if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});
// מסלול למשיכת HTML משרת ה-PHP והחזרה ללקוח
app.get('/hey', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // כתובת URL של שרת ה-PHP להחזרת HTML
        const phpServerUrl = 'https://client.hativatyoav.site/index.php?project=landing&app=admin';
        // בקשה לשרת ה-PHP לקבלת הקובץ
        const response = yield axios_1.default.get(phpServerUrl);
        // החזרת ה-HTML שהתקבל ללקוח
        res.send(response.data);
    }
    catch (error) {
        console.error('Error fetching HTML from PHP server:', error);
        res.status(500).send('Error fetching HTML from PHP server.');
    }
}));
// מסלול להצגת דף הבית הראשי
app.get('/home', (req, res) => {
    res.sendFile(path_1.default.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', 'welcome.html')); // להציג את הקובץ welcome.html
});
// מסלול להצגת דף ה-index הראשי
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', 'index.html')); // להציג את index.html
});
// מסלול לפרוקסי ל-view לאתר חיצוני
app.use('/view', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://hatmaryoav-site.web.app',
    changeOrigin: true,
    pathRewrite: {
        '^/view': '/', // שינוי הנתיב מ-view ל-root של האתר החיצוני
    },
    secure: false // להתעלם מבעיות תעודת SSL אם ישנן
}));
// מסלול לפרוקסי ל-admin לאתר חיצוני
app.use('/admin', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://hativatyoav.site',
    secure: false, // להתעלם מבעיות תעודת SSL אם ישנן
    changeOrigin: true,
    pathRewrite: {
        '^/admin': '/landing/applications/admin/build/index.html', // להגיש את דף ה-admin
    },
}));
// מסלול לדף שגיאה 404
app.get('/error', (req, res) => {
    res.sendFile(path_1.default.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', '404.html')); // להציג את 404.html
});
// הפעלת השרת
app.listen(port, () => {
    console.log(`Web server running at http://hativatyoav.site:${port}`);
});
