import { useState } from "react";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

export default function Appa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <Login onLogin={setIsLoggedIn} />
      ) : (
        <AdminPanel />
      )}
    </div>
  );
}
