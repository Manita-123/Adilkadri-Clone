import { Menu, Search, User, X, ChevronRight, MapPin, ChevronDown, LogOut } from "lucide-react";
import CartIcon from "./CartIcon";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"


import img1 from "../assests/img//product-13.png"
import img2 from '../assests/img/product-16.jpg'
import { smallProducts } from "../data";


function Navbar() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false);

  const openSearch = () => navigate("/search");

  const { user, logout } = useContext(AuthContext);

  const openAccount = () => navigate(user ? "/account" : "/login");

  const handleLogout = () => {
    logout(); // ✅ Call logout from context
    navigate("/home");
  };

  return (
    <>
      <div className=" flex justify-between py-4 px-3 sm:px-7 items-center">
        <button
          type="button"
          onClick={() => setOpenMenu(true)}
          aria-label="Open menu"
          className="p-2 rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <Menu strokeWidth={1.5} />
        </button>

        <Link to="/" className="text-2xl font-bold">
          ADILQADRI
        </Link>

        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open search"
            className="p-2 rounded hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <Search strokeWidth={1.5} className="text-red-900" />
          </button>

          <div className="flex">
            {user ? (
              // ✅ LOGGED IN - Show dropdown
              <div className="flex items-center gap-1 cursor-pointer group relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <User className="bg-amber-100 w-7 h-7 text-amber-800 rounded-full p-1" />

                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-300 ${accountOpen ? "rotate-180" : "rotate-0"
                      }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg p-4 text-base z-20 font-medium text-amber-700">
                    <div className="min-w-30 flex flex-col gap-4">

                      <p
                        onClick={() => navigate("/account")}
                        className="hover:text-amber-500 hover:underline p-1 cursor-pointer"
                      >
                        My Account
                      </p>

                      <p
                        onClick={() => navigate("/orders")}
                        className="hover:text-amber-500 hover:underline p-1 cursor-pointer"
                      >
                        My Orders
                      </p>

                      <p
                        onClick={() => navigate("/wishlist")}
                        className="hover:text-amber-500 hover:underline p-1 cursor-pointer"
                      >
                        My Wishlist
                      </p>

                      {user.role === "admin" && (
                        <p
                          onClick={() => navigate("/admin")}
                          className="hover:text-amber-500 p-1 cursor-pointer"
                        >
                          Admin Panel
                        </p>
                      )}

                      <p
                        onClick={handleLogout}
                        className="hover:text-amber-500 p-1 cursor-pointer"
                      >
                        <LogOut className="inline-block w-4 h-4 mr-3" />
                        Logout
                      </p>

                    </div>
                  </div>
                )}
              </div>
            ) : (
              // ✅ NOT LOGGED IN - Show login button
              <button
                type="button"
                onClick={openAccount}
                aria-label="Open account"
                className="p-2 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hover:bg-gray-100"
              >
                <User strokeWidth={2} className="h-5 w-5 shrink-0 text-red-900" />
              </button>
            )}
          </div>

          {/* CartIcon keep as-is; wrap it in button inside CartIcon if it's interactive */}
          <CartIcon />
        </div>
      </div>

      {openMenu && <div className="container fixed inset-0 z-50  w-100   rounded-xl ">

        <div className="flex z-57 justify-between  bg-amber-800 text-white p-3 text-xl uppercase">
          <h3 className="flex gap-3">
            <User />
            <p className="underline">My Account</p>
          </h3>
          <button onClick={() => setOpenMenu(!openMenu)}>
            <X />
          </button>
        </div>

        <div tabIndex={0} className="bg-pink-50 p-3 max-h-[95vh] overflow-y-auto scroll-smooth scrollbar-none">
          {/* images */}

          <div>
            <p className="uppercase font-bold text-amber-800/70">Build your bundle</p>

            <div className="flex my-5 border-b border-gray-400">
              <img src={img1} alt="perfume" className="w-45 h-50 transform transition-transform duration-300 ease-out hover:scale-50" />
              <img src={img2} alt="perfume" className="w-45 h-50 transform transition-transform duration-300 ease-out hover:scale-50" />
            </div>

            <p className="uppercase font-bold text-amber-800/70 mb-7">Shop By category</p>

            {
              smallProducts.map((p) => (
                <div className="flex gap-4 px-3 py-5 border-b  items-center  border-gray-300 hover:bg-white ">
                  <img src={p.img} alt="Women Fragrances" className="w-20 h-20 rounded-xl transform transition-transform duration-300 ease-out hover:scale-50" />

                  <div>
                    <h3 className="font-bold text-lg text-amber-900">{p.title}</h3>
                    <p className=" text-gray-500  text-base">{p.description}</p>

                  </div>
                  <ChevronRight className="mr-5 w-12 h-12 " />
                </div>
              ))
            }
          </div>

          <div className="p-2">
            <h2 className="font-extrabold text-lg text-amber-800/50 mb-5 mt-2">Support</h2>
            <ul className=" flex flex-col gap-4 mb-4 pl-4 text-gray-800/80 font-bold ">
              <li className="hover:bg-amber-100 p-2 rounded">Contact Us</li>
              <li className=" hover:bg-amber-100 p-2 rounded ">Track Your Order</li>
              <li className="hover:bg-amber-100 p-2 rounded" >Franchise Inquiry</li>
              <li className="hover:bg-amber-100 p-2 rounded">wholesale &amp; Bulk inquiry</li>
            </ul>

            <div className="flex justify-center items-center bg-white p-3 rounded-2xl mb-4">
              <MapPin className="border rounded-full bg-blue-50 inline-block p-2 w-10 h-10 " />
              <div className="mx-7">
                <h3 className="font-bold text-lg">Find a Store Near You</h3>
                <p className="text-gray-500">Visit our offline locations</p>
              </div>
              <ChevronRight />
            </div>

          </div>

        </div>



      </div>}
    </>
  );
}

export default Navbar;