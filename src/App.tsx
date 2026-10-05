import { useEffect, useState } from 'react';
import './App.css'
import Template1 from './template1/Template1'
import Template2 from './template2/Template2'
import type { SiteData } from './utils/templateType1';
import React from 'react';


export const SiteContext = React.createContext<SiteData|undefined>(undefined);

function App() {

  // const wildcardID = "valliyappa"
  const [templateID,setTemplateID] = useState<number>()
  const [siteData,setSiteData] = useState<SiteData>()
  const [template2Enabled,setTemplate2Enabled] = useState<boolean>(false)


  const host = window.location.host;
  const parts = host.split(".");
  let subdomain = "";

// If we get more than 3 parts, then we have a subdomain


async function getTemplateData(subdomain:string){
  try{

    const apiUrl = import.meta.env.MODE == "development" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD
    const res = await fetch(`${apiUrl}/site/${subdomain}`)
    const data:SiteData = await res.json()

    //feature flag
    try{
      const flagsRes = await fetch(`${apiUrl}/flags`)
      const flags = await flagsRes.json()
      setTemplate2Enabled(flags.template2 === true)
    }
    catch{
      setTemplate2Enabled(false)
    }
    setTemplateID(data.templateId)
    setSiteData(data)
  }
  catch{
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
    //feature flag, if template 2 is not enabled, it will fall back to template 1
    if(templateID == 2 && template2Enabled){
      return <Template2></Template2>
    }
    if(templateID == 1 || templateID == 2){
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
