import { CartIcon, ClearCartIcon, RemoveFromCartIcon } from "./icons/Icons"
import { useContext, useId } from "react"
import { CartContext } from "../context/cart_context"
import { useCart } from "../hooks/useCart"

import './Cart.css'

export function Cart () {
    const cartId = useId()
    const {total, cart, addQuantity, removeQuantity, clearCart } = useCart()
   
  return (
    <>
        <label className="cart-button" htmlFor={cartId}>
            <CartIcon />
        </label>
        <input id={cartId} type="checkbox" hidden />

        <aside className="cart">
          <ul> 
          {cart.map((item) => (
            <li key={item.id}>
                <img src={item.image}></img>
                <h4>{item.name}</h4>
                <footer>
                    <small>
                        Qty: {item.quantity}
                    </small>
                    <button onClick={() => addQuantity(item)}>+</button>
                    <button onClick={() => removeQuantity(item)}>-</button>
                </footer>
            </li>
          ))}
            
          </ul>

          <p>Total: ${total.toFixed(2)}€</p>

          <button onClick={clearCart} >
            <ClearCartIcon />
          </button>

        </aside>
    </>
  )
}

export default Cart