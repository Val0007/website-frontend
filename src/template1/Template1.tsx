import { Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Header from './Header';
// import Posts from './pages/posts';
 
const Template1 = () => {

   const tabs = ["Projects","Experience","Publishing"]

   return (
      <div className=' h-full w-full'>

      <Header>
         
      <Routes>
      {tabs.map(tab => (
  <Route key={tab} path={`/${tab}`} element={<Home />} />
))}

         </Routes>
         </Header>

      </div>
   );
};
 
export default Template1;