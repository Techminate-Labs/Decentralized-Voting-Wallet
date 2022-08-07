import { useState } from 'react';
window.Buffer = window.Buffer || require("buffer").Buffer;

function Vote() {
  var nacl = require('tweetnacl');

  const [candidate, setCandidate] = useState('');

  function generateSignature (message, keyPair) {
    // Encode message to Uint8Array
    const encodedMessage = new TextEncoder().encode(JSON.stringify(message))
    return Buffer.from(nacl.sign(encodedMessage, keyPair.secretKey)).toString('hex').substring(0, 128);
  }

  function generateKeyPair (signingKey) {
    // Convert signingKey from string to Uint8Array
    const key = new Uint8Array(64)
    const encodedKey = new Uint8Array(Buffer.from(signingKey, 'hex'))
    key.set(encodedKey)
    // Generating nacl keyPair Object
    const keyPair = nacl.sign.keyPair.fromSeed(encodedKey);
    return keyPair;
  }

  function isValid (key) {
    if (!/^[A-F0-9]+$/i.test(key)) return false
  
    if (key.length !== 64) return false
  
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Candidate public key : ',candidate);
    const localData = localStorage.getItem('wallet');
    const voterData = JSON.parse(localData);
    if(localData !== null){
      const keyPair = generateKeyPair(voterData.private_key);
      const voterAddress = Buffer.from(keyPair.publicKey).toString('hex');
      //might have a check in the db
      // const msgHash = nacl.hash(voterAddress + candidate + voterData.vote + Date.now());
      const sign = generateSignature ('hello', keyPair)
      console.log(sign)
      //creating a vote
    }

  }

  return (
    <>
      <div className="container">
        <div className="row">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="priKey" className="form-label">Select Candidate to Vote : </label>
                  <select className="form-select form-select-sm" 
                    aria-label=".form-select-sm example"
                    value={candidate}
                    onChange={(e) => setCandidate(e.target.value)}
                    >
                    <option value=''>Click here to select a candidate</option>
                    <option value="17c9eed63b84914f6f14dadf6ac14be8aa8aed5a31eabb066a68d18ccc281e79">Boat</option>
                    <option value="4bd3973fcbe8a0046b90992d8b91effd1e68ad0db4bbb5247cf281a06bd04cb1">Rose</option>
                    <option value="7935f36bbdfbe1357ef32f683ec7d721952f39115adf929ac26aeb9b047c82e5">Kite</option>
                  </select>
              </div>
              <button type="submit" className="btn btn-primary">Confirm Your Vote</button>
            </form>
        </div>
      </div>
    </>
  );
}

export default Vote;
