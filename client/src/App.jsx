import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as EditJobLoader } from './pages/EditJob';
import { loader as allJobAdminLoader } from './pages/AllJobAdmin';
import { loader as allJobLoader } from './pages/AllJobs';
import { loader as statsLoader } from './pages/Stats';
import { loader as adminStats } from './pages/Admin';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AllJobAdmin from './pages/AllJobAdmin';
import ErrorElement from './ui/ErrorElement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        queryClient: { queryClient },
        loader: dashboardLoader(queryClient),
        children: [
          {
            // This page will appear when navigate to dashboard
            index: true,
            element: <AddJob />,
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs-admin',
            element: <AllJobAdmin />,
            loader: allJobAdminLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminStats,
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: EditJobLoader(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
};
export default App;
