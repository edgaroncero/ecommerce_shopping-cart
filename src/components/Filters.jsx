import { useId } from 'react'
import './Filters.css'

export default function Filters({ filters, setFilters }) {
  
  const priceId = useId()
  const categoryId = useId()


  const handleMaxPrice = (e) => {
    setFilters(prevState => ({
      ...prevState, 
      maxPrice: e.target.value}))
  }
  
  //OTRA FORMA: esta vez con el spread operator, que lo que hace es crear una copia del estado.
  
  // const handleMaxPrice = (e) => {
  //      setFilters({...state, maxPrice: e.target.value})
  // }

  const handleCategory = (e) => {
       setFilters(prevState => ({
        ...prevState, 
        category: e.target.value
       }))
  }

  return (
    <div className='filters-container'>
       <div>
       <label htmlFor={priceId}>{`Max Price:`} </label>
           <input 
           id={priceId}
           type='range'
           min='0'
           max='600' 
           onChange={handleMaxPrice}
           value={filters.maxPrice}
           />
        <span>{`${filters.maxPrice}$`}</span>
       </div>
       
       
        <div>
           <label htmlFor='category'></label>
            <select onChange={handleCategory} id={categoryId}>
               <option value="all">All</option>
               <option value="jewelery">Jewelry</option>
               <option value="women's clothing">Women's clothing</option>
               <option value="electronics">Electronics</option>
               <option value="men's clothing">Men's clothing</option>
           </select>
        </div>
    </div>
  )
}
