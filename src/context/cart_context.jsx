import { createContext, useState } from "react";

export const CartContext = createContext()

export function CartProvider ({ children }) {
    const [cart, setCart]= useState([])
    const [total, setTotal] = useState(0)

//Función para añadir un producto al carrito desde el menú principal.
    const addToCart = (product) => {
      const findIndexProduct = cart.findIndex(item => item.id === product.id)

      if (findIndexProduct >= 0) {
        const newCart = structuredClone(cart) //Primero hacemos una copia del carrito que no afecta al objeto original
        newCart[findIndexProduct].quantity += 1 //Actualizamos la cantidad en 1 del carrito en la nueva copia
        setCart(newCart) //Utilizamos la copia profunda del carrito para actualizar el estado de setCart evitando la mutación directa del estado.
        setTotal(prevState => prevState + product.price)
      } else {
        //Si el producto no se encuentra en el carrito le añadimos el atributo quantity
        setCart(prevState => ([
          ...prevState,
          {
            ...product,
            quantity: 1
          },
        ]))
        setTotal(prevState => prevState + product.price)
      }
    }
//Función para aumentar en +1 la cantidad del producto. (+)
    const addQuantity = (product) => {
        const findIndexItem = cart.findIndex(item => item.id === product.id)
        const newCart = structuredClone(cart)
        newCart[findIndexItem].quantity += 1
        setCart(newCart)
        setTotal(prevState => (prevState + product.price))
    }
//Función para disminuir en -1 la cantidad del producto (-)
    const removeQuantity = (product) => {
       const findIndexItem = cart.findIndex(item => item.id === product.id) //Encontramos donde se encuentra el producto en nuestro estado (array) del carrito.
       //Si es mayor o igual que cero significa que nuestro producto se encuentra en el carrito
       if (findIndexItem >= 0) {
        const newCart = [...cart] //Hacemos una copia superficial de nuestro carrito
        newCart[findIndexItem].quantity -= 1 //Le restamos uno a la cantidad de nuestro producto en el carrito, buscandolo en la copia de nuestro carrito por el índice. (Recordar que hay que evitar la mutación directa del estado, hacer cualquier cambio en la copia y actualizar el estado con la función seteadora) 
        setCart(newCart)
        setTotal(prevState => prevState - product.price)
        //Si la cantidad del producto es igual a cero lo eliminamos del carrito
         if (newCart[findIndexItem].quantity === 0) {
           const updatedCart = cart.filter(item => item.id !== product.id)
           setCart(updatedCart)
         } 
       } 
    }
//Función para limpiar el carrito.
    const clearCart = () => { 
      setCart([]) 
      setTotal(0)
    }

     return (
       <CartContext.Provider value={{ total, cart, addToCart, addQuantity, removeQuantity, clearCart }}>
         { children } 
       </CartContext.Provider>
     )
}