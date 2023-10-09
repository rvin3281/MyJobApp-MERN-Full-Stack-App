/** USER AND ADMIN HAS ACCESS TO CREATE A NEW JOB */
import { DevTool } from '@hookform/devtools';
import { useNavigation } from 'react-router-dom';

import { useCustomForm } from '../hooks/useCustomForm';
import { createJobSchema } from '../utils/formSchema/formsSchema';
import { FormRow, FormRowSelect } from '../ui/index';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant';

import { useCreateJob } from '../hooks/useCreateForm';
import ServerError from '../ui/ServerError';
import { useSelector } from 'react-redux';

const AddJob = () => {
  const state = useSelector((state) => state.auth.user);
  const role = state?.role;

  const { register, handleSubmit, formState, control, reset } =
    useCustomForm(createJobSchema);

  const { errors, isValid, isDirty } = formState;

  const { mutate: createNewJOb, isLoading } = useCreateJob(reset, role);

  const onSubmit = (data) => {
    createNewJOb(data);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <h4 className="form-title">Create Job</h4>
        <ServerError />
        <div className="form-center">
          <FormRow
            type="text"
            labeltext="Position"
            name="position"
            register={register}
            hookForm={true}
            errors={errors.position?.message}
          />
          <FormRow
            type="text"
            labeltext="Company"
            name="company"
            register={register}
            hookForm={true}
            errors={errors.company?.message}
          />
          <FormRow
            type="text"
            labeltext="Job Location"
            name="jobLocation"
            register={register}
            hookForm={true}
            errors={errors.jobLocation?.message}
          />
          <FormRowSelect
            labeltext="Job Status"
            name="jobStatus"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
            register={register}
            hookForm={true}
            errors={errors.jobStatus?.message}
          />

          <FormRowSelect
            labeltext="Job Type"
            name="jobType"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
            register={register}
            hookForm={true}
            errors={errors.jobType?.message}
          />

          <button
            type="submit"
            disabled={!isDirty || !isValid}
            className="btn btn-block form-btn"
          >
            {isLoading ? 'Submit...' : 'Submit'}
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </Wrapper>
  );
};
export default AddJob;
