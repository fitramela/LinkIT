
import { useEffect, useState } from 'react';
import axiosInstance from '../axoisInstance/axios';

interface Item {
  productName: string;
}

const Table = () => {
  const [cartData, setCartData] = useState<Item[]>([]);
  const token =localStorage.getItem('token');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axiosInstance.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = () => {
    try {
        const email = prompt('Input your email');
       
        // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// if (!email) {
//     alert('There is no email');
// } else if (!emailRegex.test(email)) {
//     alert('Invalid email format');
// } else {
//     alert('Sent email');
// }
        console.log(email)
        
        axiosInstance.post('/checkout',{email}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Checkout</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>
                  <button onClick={handleCheckout}>Checkout</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>You have no items yet, add to your cart first.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;