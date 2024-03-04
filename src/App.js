import React, { useState, useCallback } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Users from "./user/pages/Users";
import NewP from "./places/pages/NewP";
import UserPlaces from "./places/pages/Userplaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" exact Component={Users} />
        <Route path="/:userId/places" Component={UserPlaces} />
        <Route path="/places/new" Component={NewP} />
        <Route path="/places/:placeId" Component={UpdatePlace} />
        
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" exact Component={Users} />
        <Route path="/:userId/places" Component={UserPlaces} />
        <Route path="/auth" Component={Auth} />
        
        
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
           {routes}
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
