import { useQueryClient } from '@tanstack/react-query';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { logoutUser } from '../slices/dasboardSlice';

const LogoutContainer = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);

  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await customFetch.get('/users/logout');

    queryClient.clear(); // ! CLEARING ALL THE CACHE
    navigate('/login');
    dispatch(logoutUser());
    toast.success('Logging Out');
  };

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img src={user?.avatar} alt="avatar" className="img" />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button onClick={handleLogout} type="button" className="dropdown-btn">
          Log Out
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
