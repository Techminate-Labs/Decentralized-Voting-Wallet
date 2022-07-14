import { useState, useEffect } from 'react';
import Topnav from './components/layout/Navbar';
import { FaRegCheckCircle } from 'react-icons/fa';
import axios from 'axios'

function App() {

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
  
const [nid, setNid] = useState('');
const [pubKey, setPubKey] = useState('');
const [priKey, setPriKey] = useState('');
const [message, setMessage] = useState(null);

const closeAlert = () => {
  setPubKey('');
  setPriKey('');
  setNid('');
  setMessage('');
}

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
    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    const dataVoter = {nid, publicKey}
    const res = await axios.post('http://127.0.0.1:8000/api/voterRegistration', JSON.stringify(dataVoter), config);
    if(res){
      console.log(res)
      setPubKey(publicKey);
      setPriKey(privateKey);
      setMessage(res.data.message);
    }
  }else{
    console.log(response.data.message)
    setMessage(response.data.message);
  }

}

  return (
  <>
    <Topnav />
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
      {message &&
      <div className="alert alert-warning alert-dismissible fade show mt-4" role="alert">
        {message}
        <button type="button" className="btn-close" onClick={() =>closeAlert()}></button>
      </div>
      }
      {pubKey &&
      <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
        <strong>Nid : </strong>{nid} <br />
        <strong>Public Key : </strong>{pubKey} <br />
        <strong>Private Key : </strong>{priKey}
        <button type="button" className="btn-close" onClick={() =>closeAlert()}></button>
      </div>
      }
    </div>
  </>
  );
}

export default App;
