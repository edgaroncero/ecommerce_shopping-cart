import { useEffect, useState } from 'react'
import './App.css'
import Products from './components/Products'
import Filters from './components/Filters'
import Cart from './components/Cart'
import { getProducts } from './services/products'
import { CartProvider } from './context/cart_context'
import { useCart } from './hooks/useCart'

function App() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    category: 'all',
    maxPrice: 600
  })

 
  useEffect(() => {
    getProducts().then(data => setProducts(data))
}, [])

  const filterProducts = (products) => {
   return products.filter(product => {
        return (
          product.price <= filters.maxPrice &&
        ( 
          filters.category === 'all' ||
          product.category === filters.category
        )
        )
    })
  }

  const filteredProducts = filterProducts(products)
   
   return (
     <CartProvider>
        <h2>Shopping Cart 🛒</h2>
        <Cart />
        <Filters setFilters={setFilters} filters={filters} />
        <Products products={filteredProducts} />
     </CartProvider>
   )
}

export default App
