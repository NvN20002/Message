const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Generate a public/private key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// Sign endpoint
app.post('/sign', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const signature = crypto.sign('sha256', Buffer.from(message), privateKey);
    res.json({ signature: signature.toString('base64') }); // Return signature as base64
  } catch (error) {
    console.error('Error signing message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Verify endpoint
// Verify endpoint
app.post('/verify', (req, res) => {
  const { message, signature } = req.body;

  if (!message || !signature) {
    return res.status(400).json({ error: 'Message and signature are required' });
  }

  try {
    const isValid = crypto.verify('sha256', Buffer.from(message), publicKey, Buffer.from(signature, 'base64'));
    if (isValid) {
      res.json({ 
        isValid: true, 
        message: "The message sender sent and the message you received are the same before and after hashing." 
      });
    } else {
      res.json({ 
        isValid: false, 
        message: "The messages do not match." 
      });
    }
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
