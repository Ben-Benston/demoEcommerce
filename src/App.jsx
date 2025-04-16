import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { ProductProvider } from "./context/ProductContext"
import Cart from "./pages/Cart"
import OrderConfirm from "./pages/OrderConfirm"
import NotFound from "./pages/NotFound"
import Account from "./pages/Account"

function App() {
  return <ProductProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<OrderConfirm />} />
      <Route path="/account" element={<Account />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  </ProductProvider>
}

export default App