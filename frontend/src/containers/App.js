import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateOrder from "../pages/CreateOrder";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ProviderState from "../contexts/providers/ProviderState";
import CarState from "../contexts/cars/CarState";
import CarTypeState from "../contexts/carTypes/CarTypeState";
import SidebarState from "../contexts/sidebar/SidebarState";
import TipoVehiculos from "../pages/TipoVehiculos";
import Proveedores from "../pages/Proveedores";
import Vehiculos from "../pages/Vehiculos";
import VehiculoDetails from "../pages/Vehiculos/[id]";
import Perfil from "../pages/Perfil";

function App() {

  const combineProviders = (providers) => providers.reduce(
    // eslint-disable-next-line react/display-name
    (Combined, Provider) => ({ children }) => (
      <Combined>
        <Provider>{children}</Provider>
      </Combined>
    )
  );

  const Providers = combineProviders([
    SidebarState,
    CarTypeState,
    CarState,
    ProviderState,
    BrowserRouter,
  ]);

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crear-pedido" element={<CreateOrder/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/vehiculos/:id" element={<VehiculoDetails />} />
        <Route path="/tipo-de-vehiculos" element={<TipoVehiculos />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Providers>
  );
}

export default App;
