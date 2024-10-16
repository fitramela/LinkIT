import { Link, useNavigate } from "react-router-dom";
import Modal from "./modal";
const Navbar= ()=>{
    const nav = useNavigate()

  

return(
    <div className="navbar bg-base-100 shadow-lg">
  <div className="flex-1">
    <Link to={'/'} className="btn btn-ghost text-xl">LinkIT Shop</Link>
  </div>
  <div role="tablist" className="tabs tabs-lifted">
  <Link to={'/'} role="tab" className="tab tab-active" onClick={(e)=>{e.currentTarget.parentElement?.querySelectorAll('.tab').forEach(el => el.classList.remove('tab-active')); e.currentTarget.classList.add('tab-active')}}>Tab 1</Link>
  <Link to={'/addProduct'}  role="tab" className="tab" onClick={(e)=>{e.currentTarget.parentElement?.querySelectorAll('.tab').forEach(el => el.classList.remove('tab-active')); e.currentTarget.classList.add('tab-active')}}>Add Product</Link>
  <Link to={'/merchantProducts'} role="tab" className="tab" onClick={(e)=>{e.currentTarget.parentElement?.querySelectorAll('.tab').forEach(el => el.classList.remove('tab-active')); e.currentTarget.classList.add('tab-active')}}>Ur Products</Link>
</div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">Ur Cart</span>
          <span className="text-info">view your cart</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>View cart</button>
            <Modal/>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to={'/'} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={'/'}>Settings</Link></li>
        <li>
          <Link
            to={localStorage.getItem('token') ? '/' : '/login'}
            onClick={() => {
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    nav('/login'); 
                }
            }}
          >
            {localStorage.getItem('token') ? 'Logout' : 'Login'}
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>
)
}
export default Navbar
