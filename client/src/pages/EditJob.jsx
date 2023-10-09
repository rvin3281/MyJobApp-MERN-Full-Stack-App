import { FormRow, FormRowSelect } from '../ui';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant';
import { useQuery } from '@tanstack/react-query';

import ServerError from '../ui/ServerError';
import { useCustomForm } from '../hooks/useCustomForm';
import { editJobSchema } from '../utils/formSchema/formsSchema';
import { useEditForm } from '../hooks/useCreateForm';

import { DevTool } from '@hookform/devtools';
import { getJobId } from '../api/apis';

const editQuery = (id) => {
  return {
    queryKey: ['singlejob', id],
    queryFn: async () => {
      const { data } = await getJobId(id);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.ensureQueryData(editQuery(id));

    return id;
  };

const EditJob = () => {
  // * ------------------------------------------------------ FETCH PARAM ID FROM LOADER
  const id = useLoaderData();
  console.log(id);

  // * ------------------------------------------------------ FETCH DATA USING USE QUERY
  const { data: job } = useQuery(editQuery(id)).data;

  // * ------------------------------------------------------ CREATE HOOK FORM
  const { register, handleSubmit, formState, control, reset } =
    useCustomForm(editJobSchema);

  const { errors, isValid, isDirty } = formState;

  // * ------------------------------------------------------ UPDATE DATA - USEMUTATION
  const { mutate: editForm, isLoading } = useEditForm(reset, id);

  const onSubmit = (data) => {
    editForm({ data, id });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <h4 className="form-title">Edit Job</h4>
        <ServerError />
        <div className="form-center">
          <FormRow
            type="text"
            labeltext="Position"
            name="position"
            defaultValue={job?.position}
            register={register}
            hookForm={true}
            errors={errors.position?.message}
            isLoading={isLoading}
          />
          <FormRow
            type="text"
            labeltext="Company"
            name="company"
            defaultValue={job?.company}
            register={register}
            hookForm={true}
            errors={errors.company?.message}
            isLoading={isLoading}
          />
          <FormRow
            type="text"
            labeltext="Job Location"
            name="jobLocation"
            defaultValue={job?.jobLocation}
            register={register}
            hookForm={true}
            errors={errors.jobLocation?.message}
            isLoading={isLoading}
          />
          <FormRowSelect
            name="jobStatus"
            labeltext="Job Status"
            defaultValue={job?.jobStatus}
            list={Object.values(JOB_STATUS)}
            register={register}
            hookForm={true}
            errors={errors.jobStatus?.message}
            isLoading={isLoading}
          />
          <FormRowSelect
            name="jobType"
            labeltext="Job Ty[e"
            defaultValue={job?.jobType}
            list={Object.values(JOB_TYPE)}
            register={register}
            hookForm={true}
            errors={errors.jobType?.message}
            isLoading={isLoading}
          />
          <button
            disabled={!isDirty || !isValid}
            type="submit"
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
export default EditJob;
