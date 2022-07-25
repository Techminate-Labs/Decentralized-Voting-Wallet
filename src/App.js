import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
      <Topnav />
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
