// components/AdminPanel.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AdminPanel() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const navigate = useNavigate();
  const [newCar, setNewCar] = useState({
    model: "",
    title: "",
    price: "",
    desc: "",
    wheels: "",
    type: "",
    range: "",
    options: "",
    img: "",
  });

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  // Fetch data + localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedCars = localStorage.getItem("cars");
      if (storedCars) {
        setCars(JSON.parse(storedCars));
      } else {
        const fetchData = async () => {
          try {
            const res = await fetch("/data/teslaApi.json");
            const data = await res.json();
            setCars(data.inventory);
            localStorage.setItem("cars", JSON.stringify(data.inventory));
          } catch (error) {
            console.error("Data fetch error:", error);
          }
        };
        fetchData();
      }
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
    } else {
      // Toast notification
          toast.error("Password Invalid!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      
          // Navigate after a short delay (optional)
          setTimeout(() => { 
          }, 1500);
    }
  };

  // Create
  const handleAddCar = () => {
    const carToAdd = { ...newCar, id: Date.now() };
    const updatedCars = [...cars, carToAdd];
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setNewCar({
      model: "",
      title: "",
      price: "",
      desc: "",
      wheels: "",
      type: "",
      range: "",
      options: "",
      img: "",
    });
  };

  // Update
  const handleUpdateCar = () => {
    const updatedCars = cars.map((c) => (c.id === editingCar.id ? editingCar : c));
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
    setEditingCar(null);
  };

  // Delete
  const handleDeleteCar = (id) => {
    const updatedCars = cars.filter((c) => c.id !== id);
    setCars(updatedCars);
    localStorage.setItem("cars", JSON.stringify(updatedCars));
  };

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="p-6 border rounded shadow-md w-80 text-center">
          <h2 className="text-lg font-bold mb-4">Admin Login</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Parol daxil edin"
            className="border p-2 w-full mb-3 rounded"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Create Form */}
      <div className="my-4 p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-2">Yeni Maşın Əlavə Et</h2>
        {Object.keys(newCar).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            value={newCar[key]}
            onChange={(e) => setNewCar({ ...newCar, [key]: e.target.value })}
            className="border p-2 mb-2 w-full rounded"
          />
        ))}
        <button
          onClick={handleAddCar}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Əlavə et
        </button>
      </div>

      {/* Edit Form */}
      {editingCar && (
        <div className="my-4 p-4 border rounded shadow">
          <h2 className="text-lg font-bold mb-2">Maşını Redaktə Et</h2>
          {Object.keys(editingCar)
            .filter((k) => k !== "id")
            .map((key) => (
              <input
                key={key}
                type="text"
                value={editingCar[key]}
                onChange={(e) =>
                  setEditingCar({ ...editingCar, [key]: e.target.value })
                }
                placeholder={key}
                className="border p-2 mb-2 w-full rounded"
              />
            ))}
          <button
            onClick={handleUpdateCar}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Yadda saxla
          </button>
          <button
            onClick={() => setEditingCar(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-2"
          >
            Ləğv et
          </button>
        </div>
      )}

      {/* Cars Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Model</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Wheels</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Range</th>
            <th className="border p-2">Options</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border p-2">{car.model}</td>
              <td className="border p-2">{car.title}</td>
              <td className="border p-2">{car.price}</td>
              <td className="border p-2">{car.desc}</td>
              <td className="border p-2">{car.wheels}</td>
              <td className="border p-2">{car.type}</td>
              <td className="border p-2">{car.range}</td>
              <td className="border p-2">{car.options}</td>
              <td className="border p-2">
                <img src={car.img} alt={car.title} className="w-20" />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setEditingCar(car)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Redaktə et
                </button>
                <button
                  onClick={() => handleDeleteCar(car.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Sil
                </button>
              </td>
               <ToastContainer /> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
