import React from 'react'
import Header from './client/header'
import Footer from './client/footer'
import { Outlet, useLocation } from 'react-router-dom'

type Props = {}

const Client = (props: Props) => {
  const location = useLocation()
  return (
    <>
        <Header/>
        <main className={(location.pathname=='/'?'home':'')}>
        <div className='max-w-[1200px] mx-auto'>
        <Outlet/>
        </div>
        </main>
        <Footer/>
    </>
  )
}

export default Client