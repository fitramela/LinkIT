import { useForm } from 'react-hook-form';
import axiosInstance from '../../axoisInstance/axios';
import { useState } from 'react';


interface typeAdd{
    title: string;
    sku: string;

    quantity: string;
    images: FileList;
}
const AddProduct = ()=>{
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm<typeAdd>()
    
    const onSubmit = async (data : typeAdd)=>{
        try {
            const formData = new FormData();
            formData.append('title', data.title)
            formData.append('sku', data.sku)
            formData.append('quantity', data.quantity.toString())
            for(let i = 0 ; i < data.images.length ; i++ ){
    
                formData.append('images', data.images[i])
            }
    
            await axiosInstance.post('/product', formData)
            
        } catch (error) {
            console.log(error,'error di add')
            setError((error as any)?.message as string)
        }
    }



    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-3xl font-bold mb-4">Add Product</h2>
                {error && <p className="text-red-500 text-sm">Gagal Upload</p>}
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-4">
                    <input {...register('title')} type="text" placeholder="Product Name" required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea {...register('sku')}  placeholder="SKU" required className="block w-full h-40 px-4 py-2 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <input {...register('quantity')} placeholder="Quantity" required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register('images')} placeholder="Images" multiple required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Add</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct