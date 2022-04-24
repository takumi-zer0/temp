import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import HeadCustom from './components/HeadCustom'
import Menu1 from './components/Menu1'
import Menu2 from './components/Menu2'
import Header from './components/Header'
import Menu3 from './components/Menu3'
import Menu4 from './components/Menu4'
import SideMenu from './components/SideMenu'

const AppName = "My App"
const haveSideMenu = true

export default function Home() {

  const [menu, setMenu] = useState([
    { component: <Menu1 />, menuName: "Home" },
    { component: <Menu2 />, menuName: "Menu2" },
    { component: <Menu3 />, menuName: "Menu3" },
    { component: <Menu4 />, menuName: "Menu4" },
  ])

  const [currentMenu, setCurrentMenu] = useState("Home")

  return (
    <div>
      <HeadCustom title={AppName} />

      <Header title={AppName} menu={menu} setCurrentMenu={setCurrentMenu} haveSideMenu={haveSideMenu} />

      <div className='md:mt-20'>
        {haveSideMenu && <SideMenu />}
        {menu.map((item) => (
          <div key={item.menuName}>
            {currentMenu == item.menuName && item.component}
          </div>
        ))}
      </div>








    </div>
  )
}
