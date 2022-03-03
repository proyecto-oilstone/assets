import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import EventState from "../contexts/events/EventState";
import Sectores from "../pages/Sectores";
import SectorDetails from "../pages/Sectores/[id]";
import SectorState from "../contexts/sectors/SectorState";
import Workshops from "../pages/Workshops/index";
import OtherProvider from "../pages/OtherProviders";
import TipoProblemas from "../pages/TipoProblemas";
import ProblemsTypeState from "../contexts/problemTypes/ProblemsTypeState";

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
    EventState,
    CarTypeState,
    ProblemsTypeState,
    ProviderState,
    CarState,
    SectorState,
    BrowserRouter,
  ]);

  return (
    <Providers>
      <Routes>
        <Route path="/" element={<Login />} />
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

        <Route path="/tipo-de-problemas" element={<PrivateRoute/>}>
          <Route path="/tipo-de-problemas" element={<TipoProblemas />}/>
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

        <Route path ="/sectores" element={<PrivateRoute/>}>
          <Route path="/sectores" element={<Sectores />} />
        </Route>
        
        <Route path="/sectores/:id" element={<PrivateRoute/>}>
          <Route path="/sectores/:id" element={<SectorDetails />} />
        </Route>

        <Route path="/perfil" element={<PrivateRoute/>}>
          <Route path="/perfil" element={<Perfil />} />
        </Route>

        <Route path="/usuarios" element={<PrivateRoute/>}>
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>

        <Route path="/talleres" element={<PrivateRoute/>}>
          <Route path="/talleres" element={<Workshops />} />
        </Route>

        <Route path="/otrosProveedores" element={<PrivateRoute/>}>
          <Route path="/otrosProveedores" element={<OtherProvider />} />
        </Route>

      </Routes>
    </Providers>
  );
}

export default App;
