import { useState, useEffect } from 'react';

function Account() {
  const [account, setAccount] = useState(null);

  //Hook
  useEffect(()=>{
    getAccountInfo()
  }, []);

  const getAccountInfo = ()=>{
    const localData = localStorage.getItem('wallet');
    console.log(localData)
    if(localData){
      setAccount(JSON.parse(localData));
    }
  }

  return (
    <>
      <div className="container">
        {account &&
          <div className="row">
            <div className="alert alert-info alert-dismissible fade show text-break mt-4" role="alert">
              <div className="row">
                <div className="col">
                <strong>Nid : </strong>{account.nid}
                </div>
                <div className="col">
                <strong>Vote : </strong>{account.vote}
                </div>
              </div>
            </div>
            <div className="alert alert-success alert-dismissible fade text-break show mt-2" role="alert">
              <strong>Public Key : </strong>{account.public_key}
            </div>
            <div className="alert alert-danger alert-dismissible fade text-break show mt-2" role="alert">
              <strong>Private Key : </strong>{account.private_key}
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Account;
