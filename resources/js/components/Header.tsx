import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBell, 
  faSearch, 
  faBars,
  faUser,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons'


export default function Header({ collapsed, setCollapsed }: any) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Klik luar = tutup dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faBars} className="text-gray-600" />
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          TheDodols
        </h1>

        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
          <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        

        {/* User Dropdown */}
        <div ref={dropdownRef} className="relative">
          
          {/* Trigger */}
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-lg"
          >
            <FontAwesomeIcon icon={faUser} className="text-gray-600" />

            <div className="hidden sm:flex flex-col text-sm">
              <span className="text-gray-800 font-medium">Administrator</span>
              <span className="text-gray-500 text-xs">Admin</span>
            </div>
          </div>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50 animate-fade-in">
              
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm">
                Profile
              </button>

              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center gap-2">
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  )
}