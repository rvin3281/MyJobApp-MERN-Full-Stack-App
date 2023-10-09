import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../slices/dasboardSlice';

import { Outlet } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, SideBar, SmallSidebar } from '../ui';
const DashboardLayout = () => {
  // GET THE STATE VALUE
  const isDarktheme = useSelector((state) => state.dashboard.isDarkTheme);
  const showSidebar = useSelector((state) => state.dashboard.showSidebar);

  // DESTRUCT DISPATCH TO DISPATCH AN ACTION
  const dispatch = useDispatch();

  // VIEW THE STATE VALUE BEFORE AND AFTER ACTION
  console.log('isDarktheme', isDarktheme);
  console.log('showSidebar', showSidebar);

  // CREATE AN EVENT HANDLE TO DISPATCH AN ACTION TO CHANGE THE STATE
  const handleClick = () => {
    const test = dispatch(toggleSidebar(1));
    console.log(test);
  };

  return (
    <Wrapper>
      <main className="dashboard">
        {/* SIDEBAR */}
        <SmallSidebar />
        <SideBar />

        <div>
          {/* NAVBAR */}
          <Navbar />
          <div className="dashboard-page">
            {/* CONTENT */}
            <Outlet />
          </div>
        </div>
        <button onClick={handleClick}>Test</button>
      </main>
    </Wrapper>
  );
};
export default DashboardLayout;
