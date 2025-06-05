import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps{
    children:React.ReactNode
}

interface Page{
   name:String
   link:String
}

const Header = ({children}:HeaderProps) => {



    //IF THE URL IS / => select index 0

   const tabs = ["Projects","Experience","Publishing"]
//    const imgUrl = new URL('./assets/profile_pic.JPG',import.meta.url).href
   const skills:String[] = ["UIKit","ReactJS","NodeJS","TailwindCSS","NextJS","MongoDB","Firebase","Supabase"]

   
   const pages = useMemo(() => makePages(tabs), [tabs]);  
   const tabRefs = [useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null)] 
   
//    const selectedIndex = tabs.findIndex(tab => tab === selectedPage.current);

   const [tabOffset,setTabOffset] = useState<number>(0)
   const [selectedPage,setSelectedPage] = useState<number>(0)
   const tabBottom = ()=>{
    console.log(tabRefs[0].current?.getBoundingClientRect().bottom)
    return tabRefs[0].current?.getBoundingClientRect().bottom
   }


   useEffect(()=>{
    const ref = tabRefs[selectedPage]
    const rect = ref.current?.getBoundingClientRect()
    console.log(rect?.left)
    setTabOffset(rect?.left || 0)
   },[selectedPage])
   
   function makePages(tabs: string[]): Page[] {
    return tabs.map(tab => ({ name: tab, link: `/${tab}` }));
  }

   const navigate = useNavigate();

    return (
      <div className="h-screen flex flex-col bg-white items-center relative ">
       <div className="w-4/5 flex flex-col items-center mt-2 " >
         {/* <div className=" h-20 w-20 bg-gray-200 rounded-full">
            <img src={imgUrl} className="h-full w-full object-cover rounded-full" alt="" />
         </div> */}
         <div className="mt-2  font-bold tracking-wider">
            V SingValliyappa
         </div>
         <div className="mt-1  font-light tracking-wider italic">
            FullStack-IOS Enthusiast
         </div>
         <div className="mt-2 w-full flex flex-row justify-around items-center">
            <div className=" text-sm underline cursor-pointer" onClick={()=>{
               window.open('')
            }}>mail</div>
            <div className="text-sm underline cursor-pointer" onClick={()=>{
               window.open('https://github.com/Val0007')
            }}>github</div>
            <div className="text-sm underline cursor-pointer" onClick={()=>{
               window.open('https://www.linkedin.com/in/singvalliyappav/')
            }}>linkedin</div>
         </div>
         <div className="mt-3 w-full px-4 flex flex-row overflow-x-auto flex-wrap  justify-center items-center">
            {skills.map((skill,i) => {
               return <div className="mr-2 mt-1 text-xs border-2 border-stone-400 rounded-full p-1" key={i}>{skill}</div>
            })}
         </div>
         <div className="mt-3 w-full flex flex-row justify-around items-center relative">
            {pages.map((page,i) => {
               return <div key={i}>
                  <div className={"text-sm  flex w-24  flex-col justify-between items-center tracking-wider " + ( i == selectedPage ? " text-blue-950 font-bold" : "text-black")} 
                  ref={tabRefs[i]}
               onClick={()=>{
                  navigate(`${page.link}`)
                  setSelectedPage(i)
               }}
               >{page.name}</div>
               </div>
            })}
         </div>
         <div className={" mt-2 h-1 bg-green-200 w-24 transition-all duration-300 absolute " } style={{left:`${tabOffset}px` , top:`${tabBottom()}px`  }}></div>
       </div>
       <div className="w-full">
       {children}
       </div>
      </div>

    );
 };
  
 export default Header;