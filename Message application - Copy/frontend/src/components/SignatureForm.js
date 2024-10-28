import React, { useState } from 'react';

function SignatureForm() {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleSign = async () => {
    const res = await fetch('http://localhost:5000/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setSignature(data.signature);
  };

  const handleVerify = async () => {
    const res = await fetch('http://localhost:5000/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    });

    const data = await res.json();
    setIsValid(data.isValid);
  };

  return (
    <div>
      <textarea
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        cols="50"
      />
      <br />
      <button onClick={handleSign}>Sign Message</button>
      <button onClick={handleVerify}>Verify Signature</button>

      {signature && (
        <div>
          <h3>Signature:</h3>
          <p>{signature}</p>
        </div>
      )}

      {isValid !== null && (
        <h3>Verification Status: {isValid ? 'Valid' : 'Invalid'}</h3>
      )}
    </div>
  );
}

export default SignatureForm;
