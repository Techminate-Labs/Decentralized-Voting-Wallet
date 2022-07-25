import { Link } from 'react-router-dom'

const Topnav = () => {
  return (  
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/vote" className="nav-link active">Vote</Link>
            </li>
            <li className="nav-item">
            <Link to="/explorer" className="nav-link active">Explorer</Link>
            </li>
            <li className="nav-item">
            <Link to="/account" className="nav-link active">Account</Link>
            </li>
            <li className="nav-item">
            <Link to="/login" className="nav-link active">Login</Link>
            </li>
            <li className="nav-item">
            <Link to="/register" className="nav-link active">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default Topnav;