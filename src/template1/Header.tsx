import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import type { HeaderData } from "../utils/templateType1";
import { FaGithub } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

interface HeaderProps{
    tabs:string[]
    data:HeaderData
}

interface Page{
   name:String
   link:String
}

const Header = ({tabs,data}:HeaderProps) => {


    const location = useLocation();
    const navigate = useNavigate();


    const currentTab = location.pathname.slice(1);

    const [selectedPage,setSelectedPage] = useState<number>()


   
   const pages = useMemo(() => makePages(tabs), [tabs]);  
   
   const tabRefs = [useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null)] 
   

   const [tabOffset,setTabOffset] = useState<number>()



   //To find tab line bottom px
   const tabBottom = ()=>{
    console.log(tabRefs[0].current?.offsetHeight)
    return (tabRefs[0].current?.offsetHeight || 0) + 7
   }


   //During Click to different tab
   useEffect(()=>{
    if(selectedPage != undefined){
    const ref = tabRefs[selectedPage]
    const left = ref.current?.offsetLeft || 0
    console.log(ref.current)
    console.log(left)
    setTabOffset(left)
    }
   },[selectedPage])


   //During First Render using /Tab
   useEffect(()=>{
    //If route is /
   if(!currentTab){
        setSelectedPage(0)
        return
   }
   setSelectedPage(()=>{
    return tabs.findIndex(tab => tab == currentTab)
   })
   },[])

   
   function makePages(tabs: string[]): Page[] {
    return tabs.map(tab => ({ name: tab, link: `/${tab}` }));
  }


    return (
      <div className="flex flex-col bg-background items-center relative text-content">
       <div className="w-4/5 flex flex-col items-center mt-2 " >
         {/* <div className=" h-20 w-20 bg-gray-200 rounded-full">
            <img src={imgUrl} className="h-full w-full object-cover rounded-full" alt="" />
         </div> */}
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
            }}><img src="/linkedin_icon.svg" alt="Email" width="30" height="30" /></div> : null}
            
         </div>

         <div className="mt-2 mb-2 w-full px-4 flex items-center justify-center">
         <div className=" overflow-x-auto m-auto flex no-scrollbar">
            {data.skills!.map((skill,i) => {
               return <div className="mr-2 mt-1 px-2 text-xs border-2 border-stone-400 rounded-full p-1 font-Raleway" key={i}>{skill}</div>
            })}
         </div>
         </div>
        <div className="w-full relative">
        <div className="mt-2 w-full flex flex-row justify-around items-center relative">
            {pages.map((page,i) => {
               return <div key={i}>
                  <div className={"text-sm  w-24   text-center tracking-wider  " + ( i == selectedPage ? "  text-content font-bold font-stretch-105%" : "text-content")} 
                  ref={tabRefs[i]}
               onClick={()=>{
                  navigate(`${page.link}`)
                  setSelectedPage(i)
               }}
               >{page.name}</div>
               </div>
            })}
         </div>
         <div className={"mt-1 h-1 bg-green-200 w-24 transition-all duration-300 absolute " } style={{left:`${tabOffset}px` , top:`${tabBottom()}px`  }}></div>
        </div>
       </div>
        <div>
        </div>
      </div>

    );
 };
  
 export default Header;