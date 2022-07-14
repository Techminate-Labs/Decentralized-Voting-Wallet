import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Topnav from './components/layout/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Explorer from './pages/Explorer';
import Account from './pages/Account';
import Vote from './pages/Vote';

function App() {

  return (
  <>
    <BrowserRouter>
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
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/account" element={<Account />} />
          <Route path="/vote" element={<Vote />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
