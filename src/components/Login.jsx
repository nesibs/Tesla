 
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function Login( ) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = (e) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === adminPass) { 
      navigate("/AdminPanel");  
    } else {
      setError("Invalid password!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
