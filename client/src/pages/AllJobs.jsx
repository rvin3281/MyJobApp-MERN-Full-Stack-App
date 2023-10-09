import { useQuery } from '@tanstack/react-query';
import { getAllJob } from '../api/apis';

import JobsContainer from '../component/Jobs/JobsContainer';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { setJob, setSort } from '../slices/sortSlice';
import SearchContainer from '../component/Search/SearchContainer';

const allJobsQuery = (params) => {
  // * AT FIRST WHEN PARAMS CHANGED THE DATA NEVER CHANGED
  const { search, jobStatus, jobType, sort, page } = params;

  return {
    queryKey: [
      'alljobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await getAllJob(params); // return await customFetch.get('/admin/jobs', { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    //console.log(params); // * GET THE QUERY PARAM IN OBJECT
    //* THEN ON THE API WE NEED TO SUBMIT AS "PARAMS" AS OBJECT KEY

    await queryClient.ensureQueryData(allJobsQuery(params));
    // Should return the params ==> so we can access on the component
    return { searchValues: params };
  };

const AllJobs = () => {
  // From the loader we can get the return of the params
  const { searchValues } = useLoaderData();

  // On the useQuery we pass the params as well
  const { data: jobs } = useQuery(allJobsQuery(searchValues));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSort({ searchValues }));
    dispatch(setJob(jobs));
  }, [dispatch, searchValues, jobs]);

  // const jobs = data?.data?.data;
  return (
    <>
      <SearchContainer user={true} sort={searchValues} />
      <JobsContainer data={jobs} />
    </>
    // <div>
    //   <BasicTable />
    // </div>
  );
};
export default AllJobs;
