import instance from "../config/axios"
import { formType } from "../interface/product";

export const GetAllProduct = async ()=>{
    try {
        const {data} = await instance.get('products')
        return data
    } catch (error) {
        throw new Error("Lỗi")       
    }
}
export const GetProductByID = async (id:number|string)=>{
    try {
        const {data} = await instance.get(`products/${id}`)
        return data
    } catch (error) {
        throw new Error("Lỗi")      
    }
}
export const addProduct = async (productdata:formType)=>{
    try {
        const {data} = await instance.post('products',productdata)
        return data
    } catch (error) {
        throw new Error("Lỗi")         
    }
}
export const updateProduct = async (productdata:formType,id:string|number)=>{
    try {
        const {data} = await instance.put(`products/${id}`,productdata)
        return data
    } catch (error) {
        throw new Error("Lỗi")              
    }
}
export const DeleteProduct = async (id:string|number)=>{
    try {
        const {data} = await instance.delete(`products/${id}`)
        return data
    } catch (error) {
        throw new Error("Lỗi")            
    }
}