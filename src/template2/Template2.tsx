import { Routes, Route, Navigate } from 'react-router-dom';
import TabHandler from '../template1/TabHandler';
import { SiteContext } from '../App';
import { useContext } from 'react';
import Layout from './Layout';
import { COLOR_MODES, type ColorMode } from '../template1/Template1';


// Same as Template1, only the tabs move into a side menu (see Header.tsx)
const Template2 = () => {
   const data = useContext(SiteContext)
   const tabs = data?.tabs ?? [];

   const contentData = data?.content ?? {};

   const mode: ColorMode = (data?.color as ColorMode) || COLOR_MODES[0];

   if (!data) return null;
   return (
      <div className={`h-full w-full ${mode == COLOR_MODES[0] ? "light" : "dark"}`}>
      <Routes>
      <Route path="/" element={<Layout tabs={tabs} data={data} />}>
        <Route index element={<Navigate to={`/${tabs[0]}`} replace />} />
        <Route path=":tabName" element={<TabHandler tabs={tabs} content={contentData} />} />
      </Route>
    </Routes>
      </div>
   );
};

export default Template2;
