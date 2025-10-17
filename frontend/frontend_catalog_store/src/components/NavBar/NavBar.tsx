import { LikeIcons, LoopIcons, ShopCarIcons, UserIcons } from "../Icons/Icons"

function NavBar() {
  return (
    <nav className='flex justify-between w-full min-h-[80px] border-b-2 border-gray-200 font-sans'>
      <section className="flex flex-row justify-start w-2/5 items-center text-sm">
        <div className="flex flex-row items-center justify-center w-1/3 ml-2">
          <img className="min-w-16 max-h-10 w-1/4" src="/src/assets/icons/Nexus_Logo_1.svg" alt="logo_app" title="logo_app" />
          <h3 className="font-bold w-1/2">NexusPro</h3>
        </div>
        <a href='' className="w-1/6 text-center">Home</a>
        <a href='' className="w-1/6 text-center">Categorias</a>
        <a href='' className="w-1/3 text-center">New & Notable</a>
      </section>

      <section className="flex flex-row gap-x-4 justify-end items-center w-1/2 ">

        <div className="flex flex-row bg-gray-200 rounded-lg w-2/5 mr-6">
          <span className="absolute py-2 px-1">
            <LoopIcons/>
          </span>
          <input type="text" placeholder="Buscar..." className="w-full ml-6 py-1 placeholder:text-gray-500 placeholder:italic focus:outline-0 bg "/>  
        </div>

        <div className="flex flex-row gap-x-1.5 w-1/6 ">
          <div className="content-center items-center w-8 h-8 bg-gray-200 rounded-lg">
            <span className="block w-full h-full px-2 py-2">
              <LikeIcons/>
            </span>
          </div>

          <div className="content-center items-center w-8 h-8 bg-gray-200 rounded-lg">
            <span className="block w-full h-full px-2 py-2">
              <ShopCarIcons/>
            </span>
          </div>
        </div>

        <div className="content-center items-center w-9 h-9 bg-gray-200 rounded-full mr-4">
          <span className="block w-full h-full px-2.5 py-2">
            <UserIcons/>
          </span>
        </div>
      </section>
    </nav>
  )
}

export default NavBar
