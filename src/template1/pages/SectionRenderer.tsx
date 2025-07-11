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
        className="bg-background/40 border-l-2 border-content/30 mb-4 shadow-sm rounded"
      >
        <div className="p-4">
          <h3 className="text-md md:text-lg font-bold text-content font-Playfair mb-2">
            {tabData.title}
          </h3>
          
          {tabData.description && (
            <p className="text-sm md:text-base text-content/80 font-Quicksand mb-3 leading-relaxed bg-background/60 p-3 border-l-2 border-content/20">
              {tabData.description}
            </p>
          )}
          
          {tabData.link && (
            <div className=" bg-background px-3 py-2 border-l-2 border-blue-500/50">
              <a
                href={tabData.link}
                className="text-sm md:text-sm text-content/70 font-semibold font-Nunito hover:text-blue-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 {tabData.link}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };
  

  
  const structure2 = (tabData: TabData, index: number) => {
  
    return (
      <div 
        key={index} 
        className="mb-4 bg-white/30 border border-content/12 rounded-xl overflow-hidden shadow-sm"
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-5 py-4 text-content text-md md:text-lg font-medium font-stretch-110% flex justify-between items-center"
        >
          <span className="font-Nunito">{tabData.title}</span>
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-content/10">
            <span className="text-sm font-mono text-content/70">
              {open ? '−' : '+'}
            </span>
          </div>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out overflow-hidden text-content/10 ${
          open ? 'max-h-96 border-t ' : 'max-h-0'
        }`}>
          <div className="px-5 py-4 bg-white/10">
            {tabData.description && (
              <p className="text-sm md:text-base mb-4 text-content/75 leading-relaxed font-Raleway">
                {tabData.description}
              </p>
            )}
            
            {tabData.link && (
              <div className="flex items-center gap-2">
                <a
                  href={tabData.link}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-sm text-blue-600/80 font-medium font-Raleway bg-blue-50/60 rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Link
                </a>
                <span className="text-xs text-content/60 font-Raleway text-wrap max-w-xs">
                  {tabData.link}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  const structure3 = (tabData: TabData, index: number) => {
    return (
      <div
        key={index}
        className="mb-6 bg-white/30 border border-content/15 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4">
          {/* Title */}
          <h3 className="text-xl md:text-xl text-content font-semibold tracking-tight leading-tight font-Nunito">
            {tabData.title}
          </h3>
    
          {/* Description */}
          {tabData.description && (
            <p className="text-base md:text-base text-content/75 leading-relaxed max-w-2xl font-Raleway">
              {tabData.description}
            </p>
          )}
    
          {/* Link */}
          {tabData.link && (
            <div className="pt-2">
              <a
                href={tabData.link}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm md:text-sm text-blue-600/80 font-medium font-Nunito bg-blue-50/70 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Visit Link</span>
              </a>
              <p className="text-xs text-content/40 mt-2 font-Raleway text-wrap">
                {tabData.link}
              </p>
            </div>
          )}
        </div>
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
   <div className="container mx-auto px-6 ">
     <div className="space-y-4 w-full flex flex-col md:grid md:grid-cols-3 md:gap-x-10 md:w-4/5 md:m-auto">

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