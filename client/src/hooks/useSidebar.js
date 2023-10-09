import { useSelector } from 'react-redux';
export const useSidebar = () => {
  return useSelector((state) => state.dashboard.showSidebar);
};
