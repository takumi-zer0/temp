

function Header({ title, menu, setCurrentMenu }) {



  return (
    <div>

      {/* Mobile */}
      <div className="
        bg-white absolute w-full bottom-0 h-20 flex justify-around items-center font-bold shadow-md
      md:top-0 md:justify-between
      ">
        <h1 className="hidden md:block pl-20">{title}</h1>

        <div className="flex justify-around w-full md:mr-20 md:w-[45vw]">

          {menu.map(item => (
            <div
              key={item.menuName}
              className="bg-white w-full border-r-2 border-t-2 md:border-0 flex justify-center items-center h-20  hover:cursor-pointer"
              onClick={() => { setCurrentMenu(item.menuName) }}>
              {item.menuName}
            </div>
          ))}

        </div>

      </div>


    </div>
  )
}
export default Header