// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./compoments/home";
import Navbar from "./compoments/navbar";
import Product from "./compoments/products";
import { Context } from "./compoments/context/context";
import Cart from "./compoments/cart";
import { Payment } from "./compoments/payment";
import UserContextProvider from "./compoments/context/ucontext";
function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <Context>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
        </Router>
      </Context>
      </UserContextProvider>
    </div>
  );
}

export default App;
