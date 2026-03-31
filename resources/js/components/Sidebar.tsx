import { Link, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUsers, faChevronDown,faCoins } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const { url } = usePage()
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const menus = [
    { name: 'Dashboard', href: '/dashboard', icon: faHome },

    { 
      name: 'Master', 
      icon: faUsers,
      children: [
        { name: 'Item', href: '/item' },
        { name: 'Barang', href: '/barang' },
        { name: 'Customer', href: '/customer' },
      ]
    },
  ]

  return (
    <aside className={`bg-blue-800 text-white/80 min-h-screen flex flex-col transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}
    `}>

      {/* HEADER */}
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-2 px-2 py-1">
            
            {/* LOGO ICON */}
            <div className="w-8 h-8 flex items-center justify-center bg-yellow-400 text-blue-900 font-bold rounded-lg shadow">
              <FontAwesomeIcon icon={faCoins} className='text-black' />
            </div>

            {/* TEXT */}
            <div className="flex flex-col leading-none">
              <span className="text-white font-extrabold tracking-tight">
                The
              </span>
              <span className="text-yellow-400 font-extrabold text-lg tracking-tight">
                Dodols
              </span>
            </div>

          </div>
        ) : (
          <div className="w-10 h-10 flex items-center justify-center bg-yellow-400 text-blue-900 font-bold rounded-lg shadow">
            <b><FontAwesomeIcon className='text-black' icon={faCoins} /></b>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 py-4 space-y-1">

        {menus.map((menu) => {
          const isActive = menu.href && url.startsWith(menu.href)
          const isOpen = openMenu === menu.name

          // MENU TANPA SUBMENU
          if (!menu.children) {
            return (
              <Link
                key={menu.name}
                href={menu.href!}
                className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2 rounded-lg text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-900 text-white' 
                    : 'hover:bg-white/10 hover:text-white'}
                `}
              >
                <FontAwesomeIcon icon={menu.icon} />
                {!collapsed && menu.name}
              </Link>
            )
          }

          // MENU DENGAN SUBMENU
          return (
            <div key={menu.name}>
              
              {/* PARENT */}
              <button
                onClick={() => setOpenMenu(isOpen ? null : menu.name)}
                className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg text-sm hover:bg-white/10 transition`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={menu.icon} />
                  {!collapsed && menu.name}
                </div>

                {!collapsed && (
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                  />
                )}
              </button>

              {/* CHILDREN */}
              {!collapsed && isOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {menu.children.map((child) => {
                    const isChildActive = url.startsWith(child.href)

                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`block px-3 py-2 rounded-lg text-sm transition
                          ${isChildActive 
                            ? 'bg-blue-900 text-white' 
                            : 'hover:bg-white/10 hover:text-white'}
                        `}
                      >
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}

            </div>
          )
        })}

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/10 text-xs text-white/60">
        © 2026 The Dodols
      </div>

    </aside>
  )
}