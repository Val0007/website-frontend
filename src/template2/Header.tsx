import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import type { HeaderData } from "../utils/templateType1";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GrLinkedin } from "react-icons/gr";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";


interface HeaderProps{
    tabs:string[]
    data:HeaderData
}

const Header = ({tabs,data}:HeaderProps) => {

    const location = useLocation();
    const navigate = useNavigate();

    //['home '] trailing spaces will cause errors, same as TabHandler
    const currentTab = decodeURIComponent(location.pathname.slice(1)).trim();

    const [open,setOpen] = useState<boolean>(false)

    //Esc closes the menu
    useEffect(()=>{
      const onKey = (e:KeyboardEvent)=>{
        if(e.key == "Escape") setOpen(false)
      }
      window.addEventListener("keydown",onKey)
      return ()=> window.removeEventListener("keydown",onKey)
    },[])

    return (
      <div className="flex flex-col bg-background items-center relative text-content w-full">

       {/* HAMBURGER */}
       <button className="absolute top-3 left-4 cursor-pointer text-content z-10" aria-label="Open menu" onClick={()=> setOpen(true)}>
          <RxHamburgerMenu style={{ height: 24, width: 24 }} />
       </button>

       {/* SIDE MENU */}
       <div className={"fixed inset-0 z-20 " + (open ? "" : "pointer-events-none")}>
          <div className={"absolute inset-0 bg-black transition-opacity duration-300 " + (open ? "opacity-40" : "opacity-0")}
          onClick={()=> setOpen(false)}></div>
          <div className={"absolute top-0 left-0 h-full w-64 bg-background text-content shadow-lg transition-transform duration-300 flex flex-col " + (open ? "translate-x-0" : "-translate-x-full")}>
             <div className="flex flex-row justify-between items-center p-4">
                <div className="font-bold tracking-wider font-Quicksand">{data.name}</div>
                <button className="cursor-pointer" aria-label="Close menu" onClick={()=> setOpen(false)}>
                   <RxCross1 style={{ height: 20, width: 20 }} />
                </button>
             </div>
             <div className="mt-2 flex flex-col">
               {tabs.map((tab,i) => {
                  const active = tab.trim() == currentTab
                  return <div key={i} className="relative px-6 py-3 cursor-pointer"
                  onClick={()=>{
                     navigate(`/${tab.trim()}`)
                     setOpen(false)
                  }}>
                     <div className={"text-sm tracking-wider " + (active ? "text-content font-bold font-stretch-105%" : "text-content")}>{tab}</div>
                     {active ? <div className="h-1 bg-green-200 w-24 mt-1"></div> : null}
                  </div>
               })}
             </div>
          </div>
       </div>

       <div className="w-4/5 flex flex-col items-center mt-2 " >
         <div className="mt-2  font-bold tracking-wider font-Quicksand">
            {data.name}
         </div>
         <div className="mt-2 mb-2 text-sm font-extralight tracking-wider italic lg:text-center text-start">
            {data.description}
         </div>

         {/* MAIL */}
         <div className="mt-2 mb-2 w-full flex flex-row justify-center items-center">

            { data.links?.mail ? <div className=" text-sm underline cursor-pointer mr-2">
            <a href={`mailto:${data.links?.mail}`}>
            <IoIosMail style={{ height: 30, width: 30 }} />
            </a>
            </div> : null}

            {/* GITHUB */}
            {data.links?.github ?  <div className="text-sm underline cursor-pointer mr-2" onClick={()=>{
               window.open(`${data.links?.github}`)
            }}><FaGithub style={{ height: 28, width: 30 }} /></div> : null}

            {/* LInkedin */}
            {data.links?.linkedin ? <div className="text-sm underline cursor-pointer mr-2" onClick={()=>{
               window.open(`${data.links?.linkedin}`)
            }}><GrLinkedin style={{ height: 28, width: 30 }} /></div> : null}

         </div>

         <div className="mt-2 mb-2 w-full px-4 flex items-center justify-center">
         <div className=" overflow-x-auto m-auto flex no-scrollbar">
            {data.skills!.map((skill,i) => {
               return <div className="mr-2 mt-1 px-2 text-xs border-2 border-stone-400 rounded-full p-1 font-Raleway" key={i}>{skill}</div>
            })}
         </div>
         </div>
       </div>
      </div>

    );
 };

 export default Header;
