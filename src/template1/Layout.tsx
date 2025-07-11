import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ tabs, data }: { tabs: string[]; data: any }) => {
  // put all your Header code here, as is

  return (
    <div className="h-screen flex bg-background flex-col items-center relative">
      <Header tabs={tabs} data={{name:data?.name || "",email:data?.email || "",links:data?.links,description:data?.description || "",skills:data?.skills || []}}></Header>
      <div className="w-full overflow-y-auto mt-10">
        <Outlet /> {/* This is where TabHandler or routed page renders */}
      </div>
    </div>
  );
};

export default Layout;