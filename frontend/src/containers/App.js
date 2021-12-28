import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateOrderPage from '../components/CreateOrderPage/CreateOrderPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/crear-pedido" element={CreateOrderPage()}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
