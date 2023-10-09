import { useQuery } from '@tanstack/react-query';

import SearchContainer from '../component/Search/SearchContainer';
import { getAllJobAdmin } from '../api/apis';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setJob, setSort } from '../slices/sortSlice';
import { useEffect } from 'react';

import JobsContainer from '../component/Jobs/JobsContainer';

const allJobAdminQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;

  return {
    queryKey: [
      'alljobsadmin',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await getAllJobAdmin(params); // return await customFetch.get('/admin/jobs', { params });
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

    await queryClient.ensureQueryData(allJobAdminQuery(params));

    return { searchValues: params };
  };

const AllJobAdmin = () => {
  const { searchValues } = useLoaderData();

  const { data: jobs } = useQuery(allJobAdminQuery(searchValues));
  // console.log(jobs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSort({ searchValues }));
    dispatch(setJob(jobs));
  }, [dispatch, searchValues, jobs]);

  // const jobs = data?.data;
  return (
    <>
      <SearchContainer sort={searchValues} />
      <JobsContainer data={jobs} />
    </>
  );
};
export default AllJobAdmin;
