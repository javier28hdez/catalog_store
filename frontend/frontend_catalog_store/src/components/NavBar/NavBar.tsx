import { authService } from "@/services/authSerivice"
import { NavLink } from "react-router-dom"
import { User2Icon } from 'lucide-react'
import { useEffect, useRef, useState } from "react"


function NavBar() {

  const [isOpenProfileMenu, setIsOpenProfileMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const handleProfileClick = () => {
    setIsOpenProfileMenu(!isOpenProfileMenu);
    console.log('Profile clicked')

  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenProfileMenu(false);
      }
    };
    if (isOpenProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenProfileMenu])

  const handleOnClick = async () => {
    try {
      const access = sessionStorage.getItem('token_access')
      const refresh = sessionStorage.getItem('token_refresh')


      if (access && refresh) {
        const token = {
          access: access,
          refresh: refresh
        }
        const response = await authService.logout(token)
        console.log('Logout successful:', response['response'])
      }
    } catch (error) {
      console.log('Error: ' + error)
    }
  }



  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/negocios" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/images/2.png" className="h-8" alt="Catalog Store Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Catalog Store</span>
        </NavLink>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button onClick={handleOnClick}>
            Cerrar sesion
          </button>
          <button className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-sky-500 hover:scale-110 transition-transform" onClick={handleProfileClick} >
            <User2Icon className="w-7 h-7 rounded-full bg-white" />
          </button>
          {isOpenProfileMenu && <div ref={menuRef} className="absolute top-0 right-0 z-50 my-14 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
              </li>
            </ul>
          </div>}
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/home" className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/negocios" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Negocios
              </NavLink>
            </li>
            <li>
              <NavLink to="/service" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Servicios
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Sobre Nosotros
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default NavBar
