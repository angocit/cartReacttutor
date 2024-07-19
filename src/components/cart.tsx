import React, { useContext, useEffect, useState } from 'react'
import { cartCT } from '../context/cartcontext'
import { IProduct } from '../interface/product'
import { GetProductByID } from '../service/product'
interface CartProduct extends IProduct {
    quantity: number
}
const Cart = () => {
    const [cart] = useContext(cartCT)
    const [products,setProducts] = useState<CartProduct[]>([])
    useEffect(() =>{
        if (cart.products){
            (async()=>{
            const productincart =await Promise.all(cart.products.map(async (item:any) => {
                const product = await GetProductByID(item.ProductId)
                return {...product, quantity: item.quantity}
            }))
            setProducts(productincart)  
            console.log(productincart);
            
        })()         
            // setProducts(productincart)
        }
        // console.log(cart);
        
    },[cart])
  return (
    <div>Cart</div>
  )
}

export default Cart