import React, { Children, createContext, useEffect, useState } from 'react'
import { ICart} from '../interface/product'
import instance from '../config/axios'

type Props = {
    children: React.ReactNode
}
export const cartCT = createContext([] as any)
const CartContext = ({children}: Props) => {
  const [cart,setCart] = useState<ICart>({} as ICart)
  useEffect(()=>{
    (async()=>{
      try {
        const {data} = await instance.get('http://localhost:3000/carts?userId=1')
        if (data){
          setCart(data[0])
        }
      } catch (error) {
        
      }
    })()
  },[])
  return (
    <cartCT.Provider value={[cart,setCart]}>
        {children}
    </cartCT.Provider>
  )
}

export default CartContext