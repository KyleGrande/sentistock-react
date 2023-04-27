import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Error from './components/Error';
import StockInfo from './components/StockInfo';
import StockSearch from './components/StockSearch';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser) {
      setLoggedIn(true);
      setUser(localStorageUser);
    }
  }, []);


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/signin"
            element={<SignIn setLoggedIn={setLoggedIn} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stockinfo/:symbol" element={<StockInfo />} />
          <Route element={<SignIn />} />
          <Route path="error" element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

