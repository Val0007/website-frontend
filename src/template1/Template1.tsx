import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import TabHandler from './TabHandler';
import type { Content } from './pages/SectionRenderer';
// import Posts from './pages/posts';
 
const Template1 = () => {

   const tabs = ["Projects","Experience","Publishing"]
   const contentData: { [key: string]: Content } = {
      "Experience": {
        structureId: 1,
        data: [
          { title: "INTERN", description: "Worked as a fullstack dev" },
          { title: "AI DEV", description: "Worked " }
        ]
      },
      "Projects": {
        structureId: 2,
        data: [
          { title: "To-Do App", link: "ssss.com" }
        ]
      }
     };

   return (
      <div className=' h-full w-full'>

      <Header>
         
      <Routes>
      <Route path="/:tabName" element={<TabHandler tabs={tabs} content={contentData} />} />
      {/* {tabs.map(tab => (
  <Route key={tab} path={`/${tab}`} element={<Home />} />
))} */}
         </Routes>
         </Header>

      </div>
   );
};
 
export default Template1;