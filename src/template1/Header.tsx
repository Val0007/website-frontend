import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";

interface HeaderProps{
    children:React.ReactNode
    tabs:string[]
}

interface Page{
   name:String
   link:String
}

const Header = ({children,tabs}:HeaderProps) => {


    const location = useLocation();
    
    const currentTab = location.pathname.slice(1);


    //IF THE URL IS / => select index 0

   const skills:String[] = ["UIKit","ReactJS","NodeJS","TailwindCSS","NextJS","MongoDB","Firebase","Supabase"]

   
   const pages = useMemo(() => makePages(tabs), [tabs]);  
   
   const tabRefs = [useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null),useRef<HTMLDivElement|null>(null)] 
   

   const [tabOffset,setTabOffset] = useState<number>()

   const [selectedPage,setSelectedPage] = useState<number>()


   //To find tab line bottom px
   const tabBottom = ()=>{
    console.log(tabRefs[0].current?.getBoundingClientRect().bottom)
    return tabRefs[0].current?.getBoundingClientRect().bottom
   }


   //During Click to different tab
   useEffect(()=>{
    if(selectedPage != undefined){
    const ref = tabRefs[selectedPage]
    const rect = ref.current?.getBoundingClientRect()
    console.log(rect?.left)
    setTabOffset(rect?.left || 0)
    }
   },[selectedPage])


   //During First Render using /Tab
   useEffect(()=>{
   setSelectedPage(()=>{
    return tabs.findIndex(tab => tab == currentTab)
   })
   },[])

   
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
         <div className="mt-2 mb-2 text-sm font-extralight tracking-wider italic text-center">
            Full description of the person , likes , quotes etc
         </div>
         <div className="mt-2 mb-2 w-full flex flex-row justify-center items-center">
            <div className=" text-sm underline cursor-pointer mr-2" onClick={()=>{
               window.open('')
            }}> <img src="/mail_icon.svg" alt="Email" width="30" height="30" /></div>
            <div className="text-sm underline cursor-pointer mr-2" onClick={()=>{
               window.open('https://github.com/Val0007')
            }}><img src="/github_icon.svg" alt="Email" width="30" height="30" /></div>
            <div className="text-sm underline cursor-pointer mr-2" onClick={()=>{
               window.open('https://www.linkedin.com/in/singvalliyappav/')
            }}><img src="/linkedin_icon.svg" alt="Email" width="30" height="30" /></div>
         </div>
         <div className="mt-2 mb-2 w-full px-4 flex items-center justify-center">
         <div className=" overflow-x-auto m-auto flex no-scrollbar">
            {skills.map((skill,i) => {
               return <div className="mr-2 mt-1 text-xs border-2 border-stone-400 rounded-full p-1" key={i}>{skill}</div>
            })}
         </div>
         </div>

         <div className="mt-2 w-full flex flex-row justify-around items-center relative">
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
         <div className={" mt-1 h-1 bg-green-200 w-24 transition-all duration-300 absolute " } style={{left:`${tabOffset}px` , top:`${tabBottom()}px`  }}></div>
       </div>
       <div className="w-full">
       {children}
       </div>
      </div>

    );
 };
  
 export default Header;