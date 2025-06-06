import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import TabHandler from './TabHandler';
import { SiteContext } from '../App';
import { useContext } from 'react';
 
const Template1 = () => {
   const data = useContext(SiteContext)
   const tabs = data?.tabs ?? [];
   
   const contentData = data?.content ?? {};


   return (
      <div className=' h-full w-full'>

      <Header tabs={tabs} data={{name:data?.name || "",email:data?.email || "",links:data?.links,description:"ggg"}}>
         
      <Routes>
      <Route path="/:tabName" element={<TabHandler tabs={tabs} content={contentData} />} />
         </Routes>
         </Header>

      </div>
   );
};
 
export default Template1;