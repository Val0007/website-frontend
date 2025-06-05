import React from 'react';

// TypeScript interfaces based on your schema
interface TabData {
 title: string;
 description?: string;
 link?: string;
}

export interface Content {
 structureId: number;
 data: TabData[];
}

interface SectionRendererProps {
 userData: Content;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({ userData }) => {
 const { data } = userData;

 const renderTabData = (tabData: TabData, index: number) => {
   return (
     <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
       <h3 className="text-xl font-semibold mb-2">{tabData.title}</h3>
       
       {tabData.description && (
         <p className="text-gray-600 mb-3">{tabData.description}</p>
       )}
       
       {tabData.link && (
         <a 
           href={tabData.link}
           className="text-blue-500 hover:text-blue-700 underline"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn More
         </a>
       )}
     </div>
   );
 };

 return (
   <div className="container mx-auto p-6">
     <div className="space-y-4">
       {data && data.length > 0 ? (
         data.map((item, index) => renderTabData(item, index))
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