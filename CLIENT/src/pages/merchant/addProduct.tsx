import { useForm } from 'react-hook-form';
import axiosInstance from '../../axoisInstance/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface typeAdd{
    title: string;
    sku: string;
    description : string;
    quantity: string;
    imageUrl: string;
}

const AddProduct = ()=>{
    const nav = useNavigate()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<typeAdd>()
    
    const onSubmit = async (data : typeAdd)=>{
        const formData = new FormData();
        formData.append('title', data.title)
        formData.append('sku', data.sku)
        formData.append('description' , data.description)
        formData.append('quantity', data.quantity)
        formData.append('imageUrl', data.imageUrl)
        try {
            const addProduct = async (formData: FormData) => {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Token tidak ditemukan. Silakan login kembali.');
                    return;
                }
                await axiosInstance.post('/product', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            };
            console.log(formData, '<---form data')
            await addProduct(formData)
            nav('/')
        } catch (error) {
            console.log(error,'error di add')
            setError((error as any)?.message as string)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
                <h2 className="text-3xl font-bold mb-4 ">Add Product</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-4">
                    <input {...register('title', { required: 'Nama produk harus diisi' })} type="text" placeholder="Product Name" required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea {...register('sku', { required: 'SKU harus diisi' })}   placeholder="SKU" required className="block w-full h-40 px-4 py-2 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <textarea {...register('description', { required: 'Deskripsi harus diisi' })}   placeholder="Deskripsi" required className="block w-full h-40 px-4 py-2 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    <input {...register('quantity', { required: 'Kuantitas harus diisi', valueAsNumber: true })} type='number' placeholder="Quantity" required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register('imageUrl', { required: 'URL Gambar harus diisi' })} placeholder="ImageUrl"  required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Add</button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct