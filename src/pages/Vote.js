import { useState } from 'react';

function Vote() {
  const Transaction = require('../utilities/Transaction');
  const EdDSA = require('elliptic').eddsa;
  const ec = new EdDSA('ed25519')

  const [candidate, setCandidate] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Candidate public key : ',candidate);
    const localData = localStorage.getItem('wallet');
    const voterData = JSON.parse(localData);
    if(localData !== null){
      const keyPair = ec.keyFromSecret(voterData.private_key);
      const voterAddress = keyPair.getPublic('hex');
      //might have a check in the db
      const vote = voterData.vote;
      console.log('Voter private key : ',voterData.private_key);
      console.log('Voter public key : ',voterAddress);

      //creating a vote
      const txs = new Transaction(voterAddress, candidate, Number(vote));
      const signature = txs.signTransaction(keyPair);
      console.log(signature)
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
