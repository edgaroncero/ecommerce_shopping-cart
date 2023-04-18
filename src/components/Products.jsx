import '../components/Products.css'
import { useCart } from '../hooks/useCart'
import { AddToCartIcon } from './icons/Icons'

export default function Products({ products }) {
  const { addToCart } = useCart()
  return (
    <div className='main-container'>
        {products.slice(0,10).map(product => (
            <div className='product-container' key={product.id}>
               <img src={product.image}/>
               <h5>{product.title}</h5>
               <p>{product.price}$</p>
               <button onClick={() => addToCart(product)}>
                <AddToCartIcon />
              </button>
            </div>
        ))}
    </div>
  )
}
