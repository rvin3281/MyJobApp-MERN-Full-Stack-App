import Wrapper from '../assets/wrappers/BigSidebar';
import { Navlinks, Logo } from '../ui';
import { useSidebar } from '../hooks/useSidebar';

const SideBar = () => {
  const showSidebar = useSidebar();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container  show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default SideBar;
