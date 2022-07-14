import { useState } from 'react';

function Login() {

    // const EdDSA = require('elliptic').eddsa
    // const ec = new EdDSA('ed25519')

    var EC = require('elliptic').ec;
    var ec = new EC('secp256k1');
    
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

    // 0477541a0f1e7e2bab8495cd759423da6e1a03facada166b2b4c02933fcfd44da372660ad494300ab3c755fc3599f607b92112f190491c8958f4bf7df1f4844020

    // d6742460a0db0bf13a695c49a241a1b09427d3efd6ceb2b8e60ed9dba674198b

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const keyPair = ec.keyFromSecret(priKey)
        let keyPair = ec.keyFromPrivate(priKey)
        const publicKey = keyPair.getPublic('hex')
        console.log(publicKey);
        console.log(priKey);
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
