// src/components/merchant/ListProductUser.tsx
import { useEffect, useState } from 'react';
import axiosInstance from '../../axoisInstance/axios';
import { Link } from 'react-router-dom';


interface Product {
    id: number;
    title: string;
    sku: string;
    description: string;
    quantity: number;
    // imageUrl: string;
    ProductImages: ProductImage[] 
  }
  interface ProductImage {
      imageUrl: string;
    }

const getUserProducts = async () => {
  const response = await axiosInstance.get('/productsPublic');
  console.log(response.data)
  return response.data;
};

const ListProductUser = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getUserProducts();
      setProducts(result);
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="my-20" >
      <h2 style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.2)', marginBottom: '20px' }}>
        All Products
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', margin: '50px' }}>

      <div className="product-cards" style={{ display: 'flex', overflowX: 'auto', padding: '20px' }}>
        {products.map((product,i) => (
            <Link to={'/detailProductUser'} state={{product}} key={i} className="product-card" style={{ minWidth: '200px', maxWidth: '300px', margin: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={product.ProductImages[0]?.imageUrl}  alt={product.title} className="product-image" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }} />
            <div className="product-info" style={{ padding: '10px' }}>
              <h3 style={{ marginBottom: '10px' }}>{product.title}</h3>
              <p>SKU: {product.sku}</p>
              
              <p>Deskripsi: {product.description}</p>
              <p>Kuantitas: {product.quantity}</p>
            </div>
          </Link>
        ))}
      </div>
        </div>
    </div>
  );
};

export default ListProductUser;
