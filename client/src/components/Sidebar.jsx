import {SidebarMenu} from './index'
export default function Sidebar({setCategory}) {
  return (
         <div className="flex flex-row  w-full h-14 md:basis-1/6  md:flex-col justify-center items-center md:h-screen md:overflow-y-auto">
      <SidebarMenu setCategory={setCategory}></SidebarMenu>
  </div>
   
  )
}
