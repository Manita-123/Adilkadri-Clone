import { AlignJustify, LogOut } from "lucide-react"
import Sidebar from "./Sidebar"


export default function AdminHeader({onMenuClick}) {

  return (
    <header className=" px-4 py-3 flex justify-between items-center border-b">
      {/* FIXED: Replaced internal state logic with onMenuClick */}
      <button 
        type="button"
        className="lg:hidden block cursor-pointer" 
        onClick={onMenuClick}
      >
        <AlignJustify/>
        <span className="sr-only">Menu</span>
      </button>
      
      <div className="flex flex-1 justify-end">
        <button className="flex gap-2 bg-black text-white text-sm font-medium shadow px-3 py-2 rounded-xl">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </header>
  )
}
