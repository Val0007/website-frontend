import { Routes, Route, Navigate } from 'react-router-dom';
import TabHandler from './TabHandler';
import { SiteContext } from '../App';
import { useContext } from 'react';
import Layout from './Layout';


enum Colormode{
   light = "light"
   ,dark = "dark"
   
}
 
const Template1 = () => {
   const data = useContext(SiteContext)
   const tabs = data?.tabs ?? [];
   
   const contentData = data?.content ?? {};

   const mode: Colormode = (data?.color as Colormode) || Colormode.light;

   console.log(mode)

   return (
      <div className={`h-full w-full ${mode == Colormode.light ? "light" : "dark"}`}>
      <Routes>
         {/* This is where TabHandler or routed page renders */}
         {/* parent route has outlet where child route renders */}
      <Route path="/" element={<Layout tabs={tabs} data={data} />}> 
        <Route index element={<Navigate to={`/${tabs[0]}`} replace />} />
        <Route path=":tabName" element={<TabHandler tabs={tabs} content={contentData} />} />
      </Route>
    </Routes>
      </div>
   );
};


// there's a problem in header with / and rediret /
 
export default Template1;