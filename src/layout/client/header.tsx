import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cartCT } from '../../context/cartcontext'

type Props = {}

const Header = (props: Props) => {
  const [cart,setCart] = useContext(cartCT)
  const [total,setTotal] = useState<number>(0)
  // const total = cart.products.reduce((total:number,item:any)=>total+item.quantity,0);
  // console.log(cart);
  useEffect(()=>{
    if (cart.products){
    const tt = cart.products.reduce((total:number,item:any)=>total+item.quantity,0);
    setTotal(tt)
    }
  },[cart])
  return (
    <header className='bg-slate-500'>
        <div className='max-w-[1200px] mx-auto'>
            <nav>
              <ul className='flex gap-5'>
                <li>
                  <NavLink className='py-4 block text-white' to={'/'}>Trang chủ</NavLink>
                </li>
                <li>
                  <NavLink className='py-4 block text-white' to={'/products'}>Sản phẩm</NavLink>
                </li>
                <li>
                  <Link className='py-4 block text-white' to={'/'}>Liên hệ</Link>
                </li>
              </ul>
            </nav>    
            Tổng:  {total}     
        </div>
    </header>
  )
}

export default Header