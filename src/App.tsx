import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useForm, SubmitHandler } from "react-hook-form"
import axios from 'axios'
import './App.css'
import { IProduct } from './interface/product'
import AddProductElement from './components/addProduct'
import EditProduct from './components/editProduct'
import CustomElement from './components/button'
import { Route, Routes, useRoutes } from 'react-router-dom'
import Home from './components/home'
import Detail from './components/detail'
import Dashboard from './layout/dashboard'
import Products from './components/products'
import Client from './layout/client'
import { addProduct, GetAllProduct, updateProduct } from './service/product'
import ProductList from './components/product-list'
import { useQuery } from '@tanstack/react-query'
import CartContext from './context/cartcontext'
import Cart from './components/cart'

type formType = Pick<IProduct,'name'|'price'|'image'|'category'>
function App() {
  const [products,setProducts] = useState<IProduct[]>([])
  const {register,handleSubmit,reset} = useForm<formType>()
  const [flag,setFlag] = useState<string|number>(0)
  const [click, setClick] = useState<boolean>(false)
  const {data,isLoading,isError} = useQuery<IProduct[]>({
    queryKey:['products'],
    queryFn: async ()=> await GetAllProduct()
  })
  const onDelete = async(id:number|string)=>{
    try {
      if (confirm("Are you sure you want to delete")){
        const {data}= await axios.delete(`http://localhost:3000/products/${id}`)
        alert("Xóa thành công")
        setProducts(products.filter((product:IProduct)=>product.id!==id))
      }
      } catch (error) {
      
    }
  }
  const onSubmitUpdate =async(formData:formType,id:string|number)=>{
    try {
        const data = await updateProduct(formData,id)
        const newproducts = products.map(product=>(product.id==id)?data:product)
        setProducts(newproducts)
        alert("Cập nhật thành công")
      } catch (error) {
      
    }       
}
  const onEdit = (id:number|string) => {
    setFlag(id)
    const product = products.filter((p:IProduct)=>p.id===id)
    reset({
        name:product[0].name,
        image:product[0].image,
        price:product[0].price,
        category:product[0].category
    })
  }
  const onAdd = async (dataproduct:formType)=>{
    try {
      const data = await addProduct(dataproduct)
      setProducts([...products,data])
      alert('Thêm mới thành công')
    } catch (error) {
      console.log(error);
      
    }      
  }
    const routes = useRoutes([
      {path:'',element:<CartContext><Client/></CartContext>,children:[
        {path: '',element: <Home products={data}/>},
        {path: 'products',element:<ProductList onDelete={onDelete} products={data}/>},
        {path: 'product/add',element:<AddProductElement title='Thêm mới sản phẩm' onAdd={onAdd} />},
        {path: 'product/edit/:id',element:<EditProduct title='Sửa sản phẩm' onUpdate={onSubmitUpdate} />},
        {path: 'cart',Component:Cart}
      ]},      
      {path: 'dashboard',Component:Dashboard,children:[
        {path:'product',Component:Products}
      ]},
    ])
    return routes
  //  (
  //   <>
  //   <Routes>
  //       <Route path='/' Component={Home}/>
  //       <Route path='detail' Component={Detail}/>
  //       <Route path='dashboard' Component={Dashboard}>
  //           <Route path='product' Component={Products}/>
  //       </Route>
  //   </Routes>
  //   </>
  // )
}

export default App
