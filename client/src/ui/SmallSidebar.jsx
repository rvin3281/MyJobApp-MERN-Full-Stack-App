import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import Wrapper from '../assets/wrappers/SmallSidebar';
import { useSidebar } from '../hooks/useSidebar';
import Logo from './Logo';
import { toggleSidebar } from '../slices/dasboardSlice';
import Navlinks from './Navlinks';

const SmallSidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSidebar();

  const handleSmallSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button
            onClick={handleSmallSidebar}
            className="close-btn"
            type="button"
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          {/* Iterate over the Links array */}
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
