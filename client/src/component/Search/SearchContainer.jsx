// * EXAMPLE USING REACT ROUTER FORM =====> NOT USING REACT HOOK FORM
// * THE DEFAULT VALUE FOR RR FORM IS GET
// * The Form component is a wrapper around a plain HTML form that emulates the browser for client side routing and data mutations.
// * It is not a form validation/state management library like you might be used to in the React ecosystem

import { FormRow, FormRowSelect } from '../../ui/index';
import SubmitBtn from '../../ui/SubmitBtn';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from '../../utils/constant';

import { Link, Form, useSubmit } from 'react-router-dom';

const SearchContainer = ({ sort, user }) => {
  const submit = useSubmit();

  // * DEBOUCNCE
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search Form</h5>
        <div className="form-center">
          <FormRow
            labeltext="Search"
            type="search"
            name="search"
            defaultValue={sort.search}
            hookForm={false}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labeltext="Job Status"
            name="jobStatus"
            hookForm={false}
            defaultValue={sort.jobStatus}
            list={['all', ...Object.values(JOB_STATUS)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labeltext="Job Type"
            name="jobType"
            hookForm={false}
            defaultValue={sort.jobType}
            list={['all', ...Object.values(JOB_TYPE)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labeltext="Job Status"
            name="sort"
            hookForm={false}
            defaultValue={sort.sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          {user ? (
            <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
              Reset Search Values
            </Link>
          ) : (
            <Link
              to="/dashboard/all-jobs-admin"
              className="btn form-btn delete-btn"
            >
              Reset Search Values
            </Link>
          )}

          {/* <SubmitBtn formBtn /> */}
        </div>
      </Form>
    </Wrapper>
  );
};
export default SearchContainer;
