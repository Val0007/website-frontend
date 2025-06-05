import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Template1 from './template1/Template1'

function App() {

  const wildcardID = "valliyappa"
  const templateID = 1


  let host = window.location.host;
  let parts = host.split(".");
let subdomain = "";
// If we get more than 3 parts, then we have a subdomain
// INFO: This could be 4, if you have a co.uk TLD or something like that.
if (parts.length >= 3) {
  subdomain = parts[0];
  console.log(subdomain)
}
  function returnTemplate(templateID:number){
    if(templateID == 1){
      return <Template1></Template1>
    }
  }

  return (
    <div className=' h-screen w-screen'>
    {
      returnTemplate(templateID)
    }
    </div>
  )
}

export default App
