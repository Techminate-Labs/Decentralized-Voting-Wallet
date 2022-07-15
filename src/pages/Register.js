import { useState } from 'react';
import axios from 'axios'

function Register() {

const EdDSA = require('elliptic').eddsa
const ec = new EdDSA('ed25519')
  
const [nid, setNid] = useState('');
const [pubKey, setPubKey] = useState('');
const [priKey, setPriKey] = useState('');
const [message, setMessage] = useState('');

const closeAlert = () => {
  setPubKey('');
  setPriKey('');
  setNid('');
  setMessage('');
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = {nid}
  const config = {
    headers:{
      "Content-Type": "application/json"
    }
  }

  const response = await axios.post('http://127.0.0.1:8000/api/validateNid', JSON.stringify(data), config);
 
  if(response.data.message === '404'){
    const privateKey = genRanHex(64);
    const keyPair = ec.keyFromSecret(privateKey);
    const publicKey = keyPair.getPublic('hex');

    const dataVoter = {nid, publicKey}
    const res = await axios.post('http://127.0.0.1:8000/api/voterRegistration', JSON.stringify(dataVoter), config);
    if(res){
      console.log(res)
      setPubKey(publicKey);
      setPriKey(privateKey);
      setMessage(res.data.message);
      const walletData = {
        'nid':nid, 
        'public_key': publicKey,
        'private_key': privateKey
      }
      localStorage.setItem('wallet', JSON.stringify(walletData));
    }
  }else{
    setMessage(response.data.message);
  }

}

  return (
  <>
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nid" className="form-label">Your National ID : </label>
            <input type="text" className="form-control" id="nid" name='nid' value={nid} onChange={(e) => setNid(e.target.value)} placeholder="Enter Your National ID Here" aria-describedby="emailHelp" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="row">
        {message &&
        <div className="alert alert-warning alert-dismissible fade show text-break mt-4" role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() =>closeAlert()}></button>
        </div>
        }
        {pubKey &&
        <div className="alert alert-success alert-dismissible fade text-break show mt-2" role="alert">
          <strong>Nid : </strong>{nid} <br />
          <strong>Public Key : </strong>{pubKey} <br />
          <strong>Private Key : </strong>{priKey}
          <button type="button" className="btn-close" onClick={() =>closeAlert()}></button>
        </div>
        }
      </div>
    </div>
  </>
  );
}

export default Register;
