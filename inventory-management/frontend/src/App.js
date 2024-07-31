import './App.css';
import "./index.css";
import {BrowserRouter , Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Inventory from './pages/Inventory';
import Bill from './pages/Bill';
import SideMenu from './components/SideMenu';

function App() {
  return (
   
    <BrowserRouter>
    <div className="flex">
      <SideMenu />
      <div className="flex-grow ml-64">
        <Routes>
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/inventory" element={<Inventory/>} />
          <Route path="/bill" element={<Bill/>} />
          <Route path="/" exact element={<Home/>} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
    
  );
}

export default App;
