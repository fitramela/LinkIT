import { useLocation } from "react-router-dom";
import axiosInstance from "../axoisInstance/axios";


const DetailProductUser = () => {
    const location = useLocation();
    const state = location.state;
    console.log(state,'kmkm');
   

    const addToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axiosInstance.post(`/cart`, { productId: state.product.id ,productName: state.product.title , quantity: state.product.quantity}, config);
            console.log(response.data);
            alert('Produk berhasil ditambahkan ke keranjang');
            
        } catch (error) {
            console.error(error);
            alert('Gagal menambahkan produk ke keranjang');
        }
    }

    return (
        <div className="p-5 mx-auto  ">
            <div className="card lg:card-side bg-base-100 shadow-xl ">
                <figure className="w-96 h-96">
                    <img
                        src={state.product.ProductImages[0]?.imageUrl }
                        alt={state.product.title} className="object-cover w-full h-full"/>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{state.product.title}</h2>
                    <p>{state.product.description}</p>
                    <p>SKU: {state.product.sku}</p>
                    <p>Kuantitas: {state.product.quantity}</p>
                    
                    <div className="card-actions justify-end">
                        
                        <button className="btn btn-primary" onClick={addToCart}>Add to Cart</button>
                       
                    </div>
                </div>
            </div>
         </div>    )
}
export default DetailProductUser
