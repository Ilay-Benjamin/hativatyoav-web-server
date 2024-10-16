"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
const port = 3000; // Set your webhook server port here
app.use(express_1.default.json());
// Webhook handler for GitHub Webhooks
app.post('/webhook', (req, res) => {
    const payload = req.body;
    if (payload.ref === 'refs/heads/production') {
        console.log('Webhook received, running git pull...');
        // Execute git pull to update your files
        (0, child_process_1.exec)('cd develop/codes/my_business/customers/hativatyoav/landing && git pull origin production', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${stderr}`);
                return res.status(500).send('Error during git pull');
            }
            console.log(`Git pull successful: ${stdout}`);
            return res.status(200).send('Git pull successful');
        });
    }
    else {
        return res.status(400).send('Not the production branch');
    }
});
// Start the webhook server
app.listen(port, () => {
    console.log(`Webhook server running at http://localhost:${port}`);
});
// sfdgsdfgsdgsdfg      wdgdsfg
//qadftr wadgad
//ADGWSDFGSAF
//ADGWSDFGSAF
//ADGWSDFGSAF
