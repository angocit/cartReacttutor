import React from 'react'
import { formType, IProduct } from '../interface/product'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { addProduct } from '../service/product'

type Props = {
    title:string,
    onAdd:(data:formType)=>void
}
const AddProduct = ({title,onAdd}: Props) => {
    const {register,handleSubmit,reset} = useForm<formType>()
    const mutation = useMutation({
      mutationFn: async(data:formType) =>await addProduct(data),
      onSuccess: ()=>{
        navigate('/products')
      }
    })
    const navigate = useNavigate()
    const onSubmit =async(formData:formType)=>{
      mutation.mutate(formData)
      // navigate('/products')
      reset()    
    }
  return (
    <>
    {title}
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' {...register("name")} placeholder='Tên sản phẩm'/>
        <input type='text' {...register("image")} placeholder='Ảnh sản phẩm'/>
        <input type='number' {...register("price")} placeholder='Giá sản phẩm'/>
        <input type='text' {...register("category")} placeholder='Danh mục'/>
        <button type='submit'>Thêm mới</button>  
    </form>  
    </>
  )
}

export default AddProduct