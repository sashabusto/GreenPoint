import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      {loggedIn ? (
        <Home />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
