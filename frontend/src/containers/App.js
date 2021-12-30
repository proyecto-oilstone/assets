import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrderPage from "../components/CreateOrderPage/CreateOrderPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crear-pedido" element={CreateOrderPage()} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
