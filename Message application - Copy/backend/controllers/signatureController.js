const crypto = require('crypto');
const fs = require('fs');

// Load Keys
const privateKey = fs.readFileSync('./keys/private_key.pem', 'utf8');
const publicKey = fs.readFileSync('./keys/public_key.pem', 'utf8');

// Sign Message
exports.signMessage = (req, res) => {
  const { message } = req.body;
  const signer = crypto.createSign('sha256');
  signer.update(message);
  const signature = signer.sign(privateKey, 'hex');
  res.json({ signature });
};

// Verify Message
exports.verifyMessage = (req, res) => {
  const { message, signature } = req.body;
  const verifier = crypto.createVerify('sha256');
  verifier.update(message);
  const isValid = verifier.verify(publicKey, Buffer.from(signature, 'hex'));
  res.json({ isValid });
};
