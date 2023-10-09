import Wrapper from '../../assets/wrappers/JobsContainer';
import AdvancedPagination from '../Pagination/AdvancedPagination';
import JobList from './JobList';

const JobsContainer = ({ data, isLoading }) => {
  const { data: jobs, totalJobs, numOfpages } = data;

  if (jobs?.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs?.map((job) => {
          return <JobList key={job._id} {...job} />;
        })}
      </div>
      {/* // * ----------------------------------------------------- PAGINATION (TRY FOR REGULAR AND ADVANCED PAGINATION) */}
      {numOfpages > 1 && <AdvancedPagination />}
    </Wrapper>
  );
};
export default JobsContainer;
