const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const payload = req.body;
  if (payload.ref === 'refs/heads/production') {
    exec('cd develop/codes/my_business/customers/hativatyoav/landing && git pull origin production', (err, stdout, stderr) => {
      if (err) {
        console.error(`Error: ${stderr}`);
        return res.sendStatus(500);
      }
      console.log(`Success: ${stdout}`);
      return res.sendStatus(200);
    });
  } else {
    return res.sendStatus(400);
  }
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
