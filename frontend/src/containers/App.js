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
import AuthState from "../contexts/auth/AuthState";
import TipoVehiculos from "../pages/TipoVehiculos";
import Proveedores from "../pages/Proveedores";
import Vehiculos from "../pages/Vehiculos";
import VehiculoDetails from "../pages/Vehiculos/[id]";
import Perfil from "../pages/Perfil";
import CrearUsuario from "../pages/CrearUsuario";
import PrivateRoute from "../components/Common/PrivateRoute";
import TipoVehiculoDetails from "../pages/TipoVehiculos/[id]";
import ProveedorDetails from "../pages/Proveedores/[id]";
import Usuarios from "../pages/Usuarios";

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
    AuthState,
    SidebarState,
    CarTypeState,
    ProviderState,
    CarState,
    BrowserRouter,
  ]);

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/crear-pedido" element={<CreateOrder/>} />
        <Route path="/crear-usuario" element={<CrearUsuario/>} />

        <Route path="/home" element={<PrivateRoute/>}>
          <Route path="/home" element={<Home />}/>
        </Route>

        <Route path="/vehiculos" element={<PrivateRoute/>}>
          <Route path="/vehiculos" element={<Vehiculos />}/>
        </Route>

        <Route path="/vehiculos/:id" element={<PrivateRoute/>}>
          <Route path="/vehiculos/:id" element={<VehiculoDetails />}/>
        </Route>

        <Route path="/tipo-de-vehiculos" element={<PrivateRoute/>}>
          <Route path="/tipo-de-vehiculos" element={<TipoVehiculos />}/>
        </Route>

        <Route path="/tipo-de-vehiculos/:id" element={<PrivateRoute/>}>
          <Route path="/tipo-de-vehiculos/:id" element={<TipoVehiculoDetails />} />
        </Route>

        <Route path="/proveedores" element={<PrivateRoute/>}>
          <Route path="/proveedores" element={<Proveedores />}/>
        </Route>

        <Route path="/proveedores/:id" element={<PrivateRoute/>}>
          <Route path="/proveedores/:id" element={<ProveedorDetails />} />
        </Route>

        <Route path="/perfil" element={<PrivateRoute/>}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/usuarios" element={<PrivateRoute/>}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </Providers>
  );
}

export default App;
