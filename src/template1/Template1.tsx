import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import TabHandler from './TabHandler';
import type { Content } from './pages/SectionRenderer';

 
const Template1 = () => {

   const tabs = ["Projects","Experience","Publishing"]
   const contentData: { [key: string]: Content } = {
      "Experience": {
        structureId: 1,
        data: [
          { title: "INTERN", description: "Worked as a fullstack dev" , link: "ssss.com"},
          { title: "AI DEV", description: "Worked " }
        ]
      },
      "Projects": {
        structureId: 2,
        data: [
          { title: "To-Do App", link: "ssss.com" , description: "Can add multiple todos over the course of the app, you have two options"}
        ]
      },
      "Publishing": {
        structureId: 3,
        data: [
          { title: "Journal Paper", link: "ssss.com" , description: "Can add multiple todos over the course of the app, you have two options"}
        ]
      }
     };


   return (
      <div className=' h-full w-full'>

      <Header tabs={tabs}>
         
      <Routes>
      <Route path="/:tabName" element={<TabHandler tabs={tabs} content={contentData} />} />
         </Routes>
         </Header>

      </div>
   );
};
 
export default Template1;