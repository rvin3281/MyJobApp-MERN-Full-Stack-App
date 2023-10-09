import { useNavigate, Outlet, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, SideBar, SmallSidebar } from '../ui';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from '../api/apis';
import { setCredentials, setInvalidAuth } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';
import { logoutUser } from '../slices/dasboardSlice';

const userQuery = {
  queryKey: ['users'],
  queryFn: async () => {
    const { data } = await currentUser();
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    // * ensureQueryData is an asynchronous function that can be used to get an existing query's cached data.
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const DashboardLayout = () => {
  const dispatch = useDispatch();
  // * --------------------------------------------- SETUP 401 LOG OUT ERROR
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        dispatch(setInvalidAuth(true));
      }
      return Promise.reject(error);
    },
  );

  // USE EFFECT FOR AUTO LOGOUT
  const logOutUser = async () => {
    navigate('/login');
    await customFetch.get('/users/logout');
    queryClient.clear(); // ! CLEARING ALL THE CACHE
    dispatch(logoutUser());
    dispatch(setInvalidAuth(false));
    toast.success('Logging Out');
  };
  const authFailed = useSelector((state) => state.auth.authFailed);
  useEffect(() => {
    if (!authFailed) {
      return;
    }
    logOutUser();
  }, [authFailed]);

  const { data } = useQuery(userQuery).data;
  // console.log(data);

  useEffect(() => {
    dispatch(setCredentials(data));
  }, [dispatch, data]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { data } = await currentUser();
  //       dispatch(setCredentials(data.data));
  //     } catch (error) {
  //       toast.error('Please login to get access');
  //       navigate('/login');
  //     }
  //   };
  //   getUser();
  // }, [dispatch]);

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
      </main>
    </Wrapper>
  );
};
export default DashboardLayout;
