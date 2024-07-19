import React, { useEffect } from 'react'
import { formType, IProduct } from '../interface/product'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { GetProductByID } from '../service/product'
import { useQuery } from '@tanstack/react-query'

type Props = {
    title:string,
    onUpdate:(data:formType,id:number|string)=>void
}

const EditProduct = ({title,onUpdate}: Props) => {
  const {register,handleSubmit,reset} = useForm<formType>()
    const navigate = useNavigate()
    const param = useParams()
    const {data,isLoading,isError,error} = useQuery<IProduct>({
      queryKey:['productid'],
      queryFn: async ()=>await GetProductByID(param?.id as number|string),
    })    
    const onSubmitUpdate = async (product:formType)=>{
       await onUpdate(product,param.id as string|number)
        navigate('/products')
    }
    if (isLoading){
      return <>Loading...</>
    }
    
    return (
              <div>
                        <form onSubmit={handleSubmit(onSubmitUpdate)}>
                          <input type='text' {...register("name")} placeholder='Tên sản phẩm'/>
                          <input type='text' {...register("image")} placeholder='Ảnh sản phẩm'/>
                          <input type='number' {...register("price")} placeholder='Giá sản phẩm'/>
                          <input type='text' {...register("category")} placeholder='Danh mục'/>
                          <button type='submit'>Update</button> 
                      </form> 
                  </div>
  )
}

export default EditProduct