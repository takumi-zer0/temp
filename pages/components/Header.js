

function Header(props) {



  return (
    <div>

      {/* PC */}
      <div className="hidden md:block">

      </div>

      {/* Mobile */}
      <div className="
      bg-red-200 absolute w-full bottom-0 h-20 flex justify-around items-center font-bold shadow-md
      md:top-0 md:justify-between
      ">
        <h1 className="hidden md:block pl-20">{props.title}</h1>

        <div className="flex justify-around w-full md:mr-20 md:w-[45vw]">
          <p className="">test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>

      </div>


    </div>
  )
}
export default Header