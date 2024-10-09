import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Admin from "./components/Admin";

export const DataContext = createContext();

function App() {
  const [token, setToken] = useState("");

  return (
    <BrowserRouter>
      <DataContext.Provider value={{token, setToken}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
