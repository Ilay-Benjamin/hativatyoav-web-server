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
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
///////////////
///////////////
app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});
///////////////
///////////////
// Route to fetch HTML from PHP server and return to client
app.get('/hey', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // The URL of your PHP server that returns the HTML file
        const phpServerUrl = 'https://client.hativatyoav.site/index.php?project=landing&app=admin';
        // Make the request to the PHP server
        const response = yield axios_1.default.get(phpServerUrl);
        // Send the HTML response received from the PHP server to the client
        res.send(response.data);
    }
    catch (error) {
        console.error('Error fetching HTML from PHP server:', error);
        res.status(500).send('Error fetching HTML from PHP server.');
    }
}));
///////////////
///////////////
// Serve the main index page
app.get('/home', (req, res) => {
    res.sendFile(path_1.default.join('/root/develop/codes/my_business/customers/hativatyoav/landing/public/', '/welcome.html')); // Serve the index.html file
});
// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join('/root/develop/codes/my_business/customers/hativatyoav/landing/', '/public', '/index.html')); // Serve the index.html file
});
// Proxy requests to /view to the external site (hatmaryoav-site.web.app)
app.use('/ladning/view', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://hatmaryoav-site.web.app',
    changeOrigin: true,
    pathRewrite: {
        '^/ladning/view': '/', // Rewrite the /view path to the root of the external site
    },
    secure: false // Ignore SSL certificate issues if any
}));
// Proxy requests to /admin to the external site (hativatyoav.site)
app.use('/ladning/admin', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://hativatyoav.site',
    secure: false, // Ignore SSL certificate issues if any
    changeOrigin: true,
    pathRewrite: {
        '^/landing/admin': '/landing/applications/admin/build/index.html', // Serve the admin page
    },
}));
// Serve the 404 error page directly instead of redirecting
app.get('/error', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', '404.html')); // Serve the 404.html file
});
// Start the web server
app.listen(port, () => {
    console.log(`Web server running at http://hativatyoav.site:${port}`);
});
// 5
// 5
