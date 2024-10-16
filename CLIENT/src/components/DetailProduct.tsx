import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axoisInstance/axios";


const DetailProduct = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state);
    const nav = useNavigate()

    const deleteProduct = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axiosInstance.delete(`/product/${state.product.id}`, config);
            console.log(response.data);
            alert('Produk berhasil dihapus');
            nav('/merchantProducts')
        } catch (error) {
            console.error(error);
            alert('Gagal menghapus produk');
        }
    };

    const editQuantity = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const newQuantity = prompt('Masukkan kuantitas baru');
            if (!newQuantity) {
                alert('Tidak ada kuantitas yang diubah');
                return;
            }
            const response = await axiosInstance.patch(`/product/${state.product.id}`, { quantity: newQuantity }, config);
            console.log(response.data);
            alert('Kuantitas produk berhasil diubah');
            nav('/merchantProducts')
        } catch (error) {
            console.error(error);
            alert('Gagal mengubah kuantitas produk');
        }
    };

    return (
        <div className="p-5 mx-auto  ">
            <div className="card lg:card-side bg-base-100 shadow-xl ">
                <figure className="w-96 h-96">
                    <img
                        src={state.product.ProductImages[0].imageUrl }
                        alt={state.product.title} className="object-cover w-full h-full"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{state.product.title}</h2>
                    <p>{state.product.description}</p>
                    <p>SKU: {state.product.sku}</p>
                    <p>Kuantitas: {state.product.quantity}</p>
                    
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={deleteProduct}>Delete</button>
                        <button className="btn btn-primary" onClick={editQuantity}>Edit Quantity</button>
                       
                    </div>
                </div>
            </div>
         </div>    )
}
export default DetailProduct
