import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import { getAdminStats } from '../api/apis';
import ChartsContainer from '../component/Stats/ChartsContainer';
import StatsContainer from '../component/Stats/StatsContainer';
import { toast } from 'react-toastify';

// * SEPARATE QUERY OBJECT OUTSIDE ===> RETURN ONLY RESPONSE.DATA ==> SO WE NO NEED TO USE DATA.DATA
const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await getAdminStats();
    return response.data;
  },
};

export const loader = (queryClient) => {
  async () => {
    const data = await queryClient.ensureQueryData(statsQuery);
    return data;
  };
};

const Stats = () => {
  // const { data, isLoading } = useQuery({
  //   queryFn: getAdminStats,
  //   queryKey: ['admin-stats'],
  // });

  // const adminStats = useLoaderData();

  const { isLoading, isError, data } = useQuery(statsQuery);

  if (isLoading) return <h4>Loading</h4>;

  if (isError) return <h4>Error...</h4>;

  const { monthlyApplication, stats } = data;

  // return <h1>React Query</h1>;

  return (
    <>
      <StatsContainer stats={stats} />
      {monthlyApplication?.length > 1 && (
        <ChartsContainer data={monthlyApplication} />
      )}
    </>
  );
};
export default Stats;
