import { useEffect, useState } from 'react';
import './App.css'
import Template1 from './template1/Template1'
import type { SiteData } from './utils/templateType1';
import React from 'react';


export const SiteContext = React.createContext<SiteData|undefined>(undefined);

function App() {

  // const wildcardID = "valliyappa"
  const [templateID,setTemplateID] = useState<number>()
  const [siteData,setSiteData] = useState<SiteData>()


  let host = window.location.host;
  let parts = host.split(".");
  let subdomain = "";

// If we get more than 3 parts, then we have a subdomain
// INFO: This could be 4, if you have a co.uk TLD or something like that.


async function getTemplateData(subdomain:string){
  try{
    console.log(import.meta.env.VITE_API_URL_PROD)

    const res = await fetch(`${import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD }/site/${subdomain}`)
    const data:SiteData = await res.json()
    setTemplateID(data.templateId)
    setSiteData(data)
  }
  catch(e){
    //render error
  }
}


useEffect( ()=>{
  if (parts.length >= 3) {
    subdomain = parts[0];
  }
  if(import.meta.env.MODE == "development"){
    subdomain = "sing"
    console.log("SSS")
  }
  if(subdomain){
     getTemplateData(subdomain)
  }
},[])


  function returnTemplate(templateID:number){
    if(templateID == 1){
      return <Template1></Template1>
    }
  }

  return (
    <div className=' h-screen w-screen'>
     <SiteContext.Provider value={siteData}> 
     { templateID ?
      returnTemplate(templateID)
      : <>LOADING</>
    }
     </SiteContext.Provider>
    </div>
  )
}

export default App
