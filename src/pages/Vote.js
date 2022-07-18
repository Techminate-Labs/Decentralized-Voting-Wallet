import { useState } from 'react';

function Vote() {
  const Transaction = require('../utilities/Transaction');
  const EdDSA = require('elliptic').eddsa;
  const ec = new EdDSA('ed25519')

  const [candidate, setCandidate] = useState('');
  const [voter, setVoter] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(candidate);
    const localData = localStorage.getItem('wallet');
    if(localData){
      setVoter(JSON.parse(localData));
      const keyPair = ec.keyFromSecret(voter.private_key);
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
