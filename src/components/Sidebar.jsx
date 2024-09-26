import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { dashboardRoutes } from './routesConfig';
import { ColombiaSvg, LogoutSvg, MenuSvg, CloseSvg } from '../assets/Icons';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2  text-white rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <CloseSvg className="w-6 h-6" /> : <MenuSvg className="w-6 h-6" />}
      </button>

      <div
        className={`fixed lg:static top-0 left-0 w-64 bg-gray-800 text-white p-6 h-full lg:h-dvh z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 mt-6">
          Colombia Dashboard
          <ColombiaSvg className="inline-block w-6 h-6 ml-2" />
        </h2>
        <ul>
          {dashboardRoutes.map(({ path, name }) => (
            <li key={path} className="mb-4">
              <Link
                to={path}
                className={`block p-2 rounded-md transition duration-300 ${
                  location.pathname.split('/').pop() == path
                    ? 'bg-gray-700 text-yellow-300/90'
                    : ''
                }`}
                onClick={toggleSidebar}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <button className="absolute bottom-4 right-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md" onClick={handleLogout}>
          <LogoutSvg className="w-6 h-6" />
        </button>
      </div>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;