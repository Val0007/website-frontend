import { Routes, Route, Navigate } from 'react-router-dom';
import TabHandler from './TabHandler';
import { SiteContext } from '../App';
import { useContext } from 'react';
import Layout from './Layout';


export type ColorMode = "light" | "dark";
export const COLOR_MODES: ColorMode[] = ["light", "dark"];

 
const Template1 = () => {
   const data = useContext(SiteContext)
   const tabs = data?.tabs ?? [];
   
   const contentData = data?.content ?? {};

   

   const mode: ColorMode = (data?.color as ColorMode) || COLOR_MODES[0];

   console.log(mode)

   return (
      <div className={`h-full w-full ${mode == COLOR_MODES[0] ? "light" : "dark"}`}>
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