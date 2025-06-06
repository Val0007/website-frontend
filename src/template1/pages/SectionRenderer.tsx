import React, { useState } from 'react';
import type { Content, TabData } from '../../utils/templateType1';

// TypeScript interfaces based on your schema


interface SectionRendererProps {
 userData: Content;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ userData }) => {
 const { data,structureId } = userData;

 const [open, setOpen] = useState(false);

  const structure1 = (tabData: TabData, index: number) => {
    return (
      <div
        key={index}
        className="backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl shadow-xl p-5 mb-6"
      >
        <h3 className="text-xl font-bold text-gray-900">{tabData.title}</h3>
        {tabData.description && (
          <p className=" font-extralight text-lg  text-gray-800 mt-2">{tabData.description}</p>
        )}
        {tabData.link && (
          <a
            href={tabData.link}
            className="inline-block mt-3 text-base text-blue-800 font-medium hover:underline italic "
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Link → {tabData.link}
          </a>
        )}
      </div>
    );
  };
  

  
  const structure2 = (tabData: TabData, index: number) => {
  
    return (
      <div key={index} className="mb-4 border border-gray-400 rounded overflow-hidden shadow-sm">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-4 py-2 hover:bg-gray-200 font-light text-xl font-stretch-110% flex justify-between items-center  "
        >
          <span>{tabData.title}</span>
          <span>{open ? '−' : '>'}</span>
        </button>
        
          <div className="px-4 py-1 bg-white">

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                open ? 'max-h-96' : 'max-h-0'
              }`}>
            {
            tabData.description && (
              <p className="text-base mt-1 mb-3 text-gray-600 transition-all duration-300">{tabData.description}</p>
            )
            }
            </div>


          {tabData.link && (
              <a
                href={tabData.link}
                className="block mt-0 text-sm text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Link → {tabData.link}
              </a>
            )}
          </div>
        
      </div>
    );
  };
  
  const structure3 = (tabData: TabData, index: number) => {
    return (
      <div
        key={index}
        className="mb-6 flex flex-col items-start gap-3 border-2 border-b-cyan-950 rounded p-2">
        <h3 className="text-xl font-serif text-gray-800 tracking-tight rotate-0">
          {tabData.title}
        </h3>
        {tabData.description && (
          <p className="text-md md:text-lg text-gray-600 max-w-xl ">
            {tabData.description}
          </p>
        )}
        {tabData.link && (
          <a
          href={tabData.link}
          className="inline-block mt-1 text-sm text-blue-800 font-mono italic hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >Visit Link → {tabData.link}</a>
        )}
      </div>
    );
  };
  

  function returnStructure(structureId:number,data:TabData[]){
    switch(structureId){
        case 1 :
            return data.map((item, index) => structure1(item, index))
        case 2:
            return data.map((item, index) => structure2(item, index))
        case 3:
            return data.map((item, index) => structure3(item, index))
        default:
            return

    }
  }
  
  
  

 return (
   <div className="container mx-auto p-6">
     <div className="space-y-4">

       {data && data.length > 0 ? (
         returnStructure(structureId,data)
       ) : (
         <div className="text-center py-8 text-gray-500">
           No content available
         </div>
       )}
     </div>
   </div>
 );
};

export default SectionRenderer;