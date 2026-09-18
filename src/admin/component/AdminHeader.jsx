import { AlignJustify, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminHeader({ onMenuClick }) {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="px-4 py-3 flex justify-between items-center border-b">

      {/* Mobile Menu */}
      <button
        type="button"
        className="lg:hidden block cursor-pointer"
        onClick={onMenuClick}
      >
        <AlignJustify />
        <span className="sr-only">Menu</span>
      </button>

      {/* Logout */}
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          onClick={handleLogout}
          className="flex gap-2 bg-black text-white text-sm font-medium shadow px-3 py-2 rounded-xl cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

    </header>
  );
}