function Vote() {

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  return (
    <>
      <div className="container">
        <div className="row">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="priKey" className="form-label">Your Account Private Key : </label>
                <input type="text" className="form-control" id="priKey" name='priKey' placeholder="Enter Your Private Key Here" aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
      </div>
    </>
  );
}

export default Vote;
