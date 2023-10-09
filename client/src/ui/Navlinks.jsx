import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import links from '../utils/Links/Links';
import linksUser from '../utils/Links/linksUser';
import { toggleSidebar } from '../slices/dasboardSlice';

const Navlinks = ({ isBigSidebar }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  const handleSmallSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="nav-links">
      {user?.role === 'user'
        ? linksUser.map((link) => {
            const { text, path, icon } = link;
            return (
              <NavLink
                to={path}
                key={text}
                className="nav-link"
                onClick={isBigSidebar ? null : handleSmallSidebar}
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            );
          })
        : links.map((link) => {
            const { text, path, icon } = link;
            return (
              <NavLink
                to={path}
                key={text}
                className="nav-link"
                onClick={isBigSidebar ? null : handleSmallSidebar}
              >
                <span className="icon">{icon}</span>
                {text}
              </NavLink>
            );
          })}
    </div>
  );
};
export default Navlinks;
