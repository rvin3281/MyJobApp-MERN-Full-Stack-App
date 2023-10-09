import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';

import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { getAppStats } from '../api/apis';
import StatItem from '../component/Stats/StatItem';
import { useLoaderData } from 'react-router-dom';

export const loader = async () => {
  const response = await getAppStats();
  return response.data;
};

const Admin = () => {
  // const { data, isLoading, error } = useQuery({
  //   queryFn: getAppStats,
  //   queryKey: ['appstats'],
  // });
  const data = useLoaderData();

  const appStats = data?.data;

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={appStats?.users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={appStats?.jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaSuitcaseRolling />}
      />
    </Wrapper>
  );
};
export default Admin;
