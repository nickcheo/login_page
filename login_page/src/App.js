import React, { useContext } from 'react';
import UserProvider, { UserContext } from './contexts/UserProvider';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Question from './pages/Question';
import './App.css';

function App() {
  const { user, setUser } = useContext(UserContext); // destructure setUser here
  console.log("this is the app component " + user);

  return (
    <div className="App">
      <UserProvider>
      <Router>
        <Navbar expand="lg">
          <Container>
            <NavLink to="/" exact className="nav-link">
              <Navbar.Brand href="#home">
                <NavLink
                  to="/"
                  style={{
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '1.6rem',
                    marginRight: '1rem',
                  }}
                >
                  Productivity
                </NavLink>
              </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavLink to="/" exact className="nav-link">
                  <span style={{ textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem' }}>
                    Home
                  </span>
                </NavLink>
                <NavLink to="/about" exact className="nav-link">
                  <span style={{ textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem' }}>
                    About
                  </span>
                </NavLink>
                <NavLink to="/register" exact className="nav-link">
                  <span style={{ textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem' }}>
                    Register
                  </span>
                </NavLink>
                <NavLink to="/login" exact className="nav-link">
                  <span style={{ textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem' }}>
                    Login
                  </span>
                </NavLink>
                <NavLink to="/question" exact className="nav-link">
                  <span style={{ textDecoration: 'none', fontSize: '1.1rem', marginRight: '1rem' }}>
                    Question
                  </span>
                </NavLink>
              </Nav>
              <Nav>
                {user ? (
                  <>
                    <span style={{ marginRight: '1rem' }}>Welcome, {user.displayName}</span>
                    <button className="btn btn-danger" onClick={() => setUser(null)}>
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink to="/login" className="nav-link">
                    <span style={{ textDecoration: 'none', fontSize: '1.1rem' }}>Login</span>
                  </NavLink>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Question />} />
        </Routes>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
