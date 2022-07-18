import { useState } from 'react';
import axios from 'axios'

function Login() {

    const EdDSA = require('elliptic').eddsa
    const ec = new EdDSA('ed25519')
    
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

    // Public Key : efca40505b961f611c6db18ed7632caa29bea730b66bf3179a32749620be343e
    // Private Key : 1173a41bce0403ed67d54b26b0927c9d2ed3be4479d99740adcf3253f7dbe78d
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const keyPair = ec.keyFromSecret(priKey)
        const publicKey = keyPair.getPublic('hex')
        console.log(publicKey);
        console.log(priKey);

        const response = await axios.get('http://127.0.0.1:8000/api/voterGetByPubKey/'+publicKey);
        if(response.data.query_status === '404'){
            setMessage(response.data.message);
        }else if(response.data.query_status === '200'){
            setMessage(response.data.message);
            const walletData = {
                'nid':response.data.nid, 
                'public_key': publicKey,
                'private_key': priKey,
                'vote': response.data.vote
            }
            localStorage.setItem('wallet', JSON.stringify(walletData));
        }
        
        setPriKey('');
    }

    return (
        <>
            <div className="container">
            <div className="row">
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="priKey" className="form-label">Your Account Private Key : </label>
                    <input type="text" className="form-control" id="priKey" name='priKey' value={priKey} onChange={(e) => setPriKey(e.target.value)} placeholder="Enter Your Private Key Here" aria-describedby="emailHelp" />
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

export default Login;
