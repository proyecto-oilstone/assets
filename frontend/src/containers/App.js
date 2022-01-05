import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrderPage from "../components/CreateOrderPage/CreateOrderPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import ProviderState from "../contexts/providers/ProviderState";

function App() {
  return (
    <ProviderState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/crear-pedido" element={CreateOrderPage()} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ProviderState>
  );
}

export default App;
