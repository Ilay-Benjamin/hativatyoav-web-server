const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000; // Set your webhook server port here

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Webhook handler for GitHub Webhooks
app.post('/webhook', (req, res) => {
  const payload = req.body;
  if (payload.ref === 'refs/heads/production') {
    console.log('Webhook received, running git pull...');
    
    // Execute git pull to update your files
    exec('cd /develop/codes/my_business/customers/hativatyoav/landing && git pull origin production', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        return res.status(500).send('Error during git pull');
      }
      console.log(`Git pull successful: ${stdout}`);
      return res.status(200).send('Git pull successful');
    });
  } else {
    return res.status(400).send('Not the production branch');
  }
});

// Start the webhook server
app.listen(port, () => {
  console.log(`Webhook server running at http://localhost:${port}`);
});


//qadftr wadgad

//ADGWSDFGSAF

//ADGWSDFGSAF

//ADGWSDFGSAF