import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined , X , LayoutDashboard , ShoppingBasket, SquarePlus,  BadgeCheck ,User, UserPen } from "lucide-react";

export default function Sidebar({onClose , isOpen}) {

  const navigate = useNavigate();
  return (
    <>
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white flex flex-col p-6 border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex cursor-pointer items-center gap-2" onClick={() => navigate("/admin/dashboard")}>
        <ChartNoAxesCombined size={30}/>
        <h2 className="text-xl font-extrabold">
        Admin
      </h2>
      </div>
      <button onClick={onClose} className="lg:hidden block cursor-pointer">
        <X/>
      </button>
      </div>
      <nav className="flex flex-col gap-1">
          {[
            { name: 'Dashboard', path: '/admin/dashboard',  icon: LayoutDashboard },
            { name: 'Products', path: '/admin/products', icon: ShoppingBasket },
            { name: 'Add Product', path: '/admin/products/add', icon:SquarePlus  },
            { name: 'Orders', path: '/admin/orders', icon:  BadgeCheck  },
            { name: 'Users', path: '/admin/users', icon: User  },
            { name: 'Profile', path: '/admin/profile', icon: UserPen},
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className="px-4 py-3 gap-4 flex items-center rounded-xl text-amber-700/80 hover:text-indigo-600 hover:bg-indigo-50/50 font-bold text-lg transition-colors"
            >
              {link.icon && <link.icon className="w-8 h-8 mr-2" />}
              {link.name}
            </Link>
          ))}
        </nav>

    </aside>
    </>
  );
}