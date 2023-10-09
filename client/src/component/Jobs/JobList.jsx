import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { useMutation } from '@tanstack/react-query';
import { useDeleteJob } from '../../hooks/useCreateForm';
day.extend(advancedFormat);

const JobList = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const { mutate, isLoading } = useDeleteJob();

  const handleDelete = () => {
    mutate(_id);
  };

  const date = day(createdAt).format('MMM Do, YYYY');
  // console.log(date);
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>
        <footer className="actions">
          <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="btn delete-btn">
            Delete
          </button>
        </footer>
      </div>
    </Wrapper>
  );
};
export default JobList;
