import { FormRow, FormRowSelect } from '../ui/index';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useProfileHookForm } from '../hooks/useCustomForm';
import { updateProfileSchema } from '../utils/formSchema/formsSchema';
import { DevTool } from '@hookform/devtools';
import { useUpdateProfile } from '../hooks/useCreateForm';
import ServerError from '../ui/ServerError';
import { toast } from 'react-toastify';
import SubmitBtn from '../ui/SubmitBtn';
const Profile = () => {
  // * 1. GET THE USER DATA FROM REDUX GLOBAL
  const user = useSelector((state) => state.auth.user);

  // * 2. INITIALIZE REACT HOOK FORM
  const { register, handleSubmit, formState, control, reset } =
    useProfileHookForm(updateProfileSchema);

  const { errors, isValid, isDirty } = formState;

  const { mutate: updateProfile, isLoading } = useUpdateProfile();
  // console.log(isLoading);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('avatar', data.avatar[0]);
    formData.append('name', data.name);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('location', data.location);

    if (data.avatar[0] && data.avatar[0].size > 5000000) {
      toast.error('Image size too large');
      return new Error('Failed');
    }

    // Log individual field values
    // console.log('File:', data.avatar[0].size);
    // console.log('Name:', data.name);
    // console.log('Last Name:', data.lastName);

    updateProfile(formData);
  };

  return (
    <Wrapper>
      <ServerError />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        encType="multipart/form-data"
        noValidate
      >
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an Image File (max 0.5mb)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
              {...register('avatar')}
            />
            <p className="error">{errors.avatar?.message}</p>
          </div>
          <FormRow
            type="text"
            register={register}
            labeltext="Name"
            name="name"
            defaultValue={user?.name}
            hookForm={true}
            errors={errors.name?.message}
          />
          <FormRow
            type="text"
            name="lastName"
            labeltext="last name"
            register={register}
            defaultValue={user?.lastName}
            hookForm={true}
            errors={errors.lastName?.message}
          />
          <FormRow
            type="email"
            name="email"
            labeltext="Email"
            register={register}
            defaultValue={user?.email}
            hookForm={true}
            errors={errors.email?.message}
          />
          <FormRow
            type="text"
            name="location"
            register={register}
            labeltext="Location"
            defaultValue={user?.location}
            hookForm={true}
            errors={errors.location?.message}
          />
          <SubmitBtn isLoading={isLoading} />
        </div>
      </form>
      <DevTool control={control} />
    </Wrapper>
  );
};
export default Profile;
