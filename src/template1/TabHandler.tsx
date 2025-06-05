import { useParams } from "react-router-dom";
import type { Content } from "./pages/SectionRenderer";
import SectionRenderer from "./pages/SectionRenderer";

interface TabHandlerProps {
    tabs: string[];
    content?: { [key: string]: Content };
   }
   
   function TabHandler({ tabs, content }: TabHandlerProps) {
    const { tabName } = useParams<{ tabName: string }>();


    console.log('Current tabName:', tabName);
    console.log('Available tabs:', tabs);
    console.log('Available content keys:', content ? Object.keys(content) : 'No content');
    
   
    // Check if user has access to this tab
    if (!tabs.includes(tabName || '')) {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p>This tab doesn't exist or you don't have access to it.</p>
            <button 
              onClick={() => window.location.href = `/${tabs[0]}`}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }
   
    // Get content for current tab
    const currentTabContent = content?.[tabName || ''];
   
    return (
      <div>
        {currentTabContent ? (
          <SectionRenderer userData={currentTabContent} />
        ) : (
          <div className="p-6 text-center text-gray-500">
            No content available for this tab
          </div>
        )}
      </div>
    );
   }

export default TabHandler