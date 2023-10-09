// import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { Logo, LogoutContainer, ThemeToggle } from '../ui';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../slices/dasboardSlice';
import styled from 'styled-components';

const Nav = styled.nav`
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  .logo-text {
    display: none;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .btn-container {
    display: flex;
    align-items: center;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }

    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;

const Navbar = () => {
  // GRAB THE TOGGLE SIDEBAR FROM REDUX TK
  // const sidebar = useSelector((state) => state.dashboard.showSidebar);
  const dispatch = useDispatch();
  const handleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Nav>
      <div className="nav-center">
        {/* TOGGLE SIDEBAR */}
        <button onClick={handleSidebar} type="button" className="toggle-btn">
          <FaAlignLeft />
        </button>

        {/* LOGO */}
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>

        {/* TOGGLE FOR LOGOUT */}
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Nav>
  );
};
export default Navbar;
