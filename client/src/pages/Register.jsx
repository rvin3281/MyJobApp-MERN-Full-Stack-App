import { Link } from 'react-router-dom';
import { DevTool } from '@hookform/devtools';
// import { useSelector } from 'react-redux';

import { useMutateSignup } from '../hooks/useCreateForm';
import { useCustomForm } from '../hooks/useCustomForm';
import { registerSchema } from '../utils/formSchema/formsSchema';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../ui/index';
import ServerError from '../ui/ServerError';

const Register = () => {
  // const { errorState, error } = useSelector((state) => state.form);

  const { register, handleSubmit, formState, control, reset } =
    useCustomForm(registerSchema);

  const { mutate: signUpForm, isLoading } = useMutateSignup(reset);

  const { errors, isValid, isDirty } = formState;

  // NOTE : THIS ONSUBMIT SEND TO REACT HOOK FORM --> HANDLESUBMIT
  function onSubmit(data) {
    /**
     * NOTE : The mutation function you can call with variables to trigger the mutation
     */
    signUpForm(data);
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
        <Logo />
        <h4>Register</h4>

        <ServerError />

        {/* FORM ROW */}
        <FormRow
          type="text"
          labeltext="Name"
          name="name"
          register={register}
          hookForm={true}
          errors={errors.name?.message}
        />

        <FormRow
          type="text"
          labeltext="Last Name"
          name="lastName"
          register={register}
          hookForm={true}
          errors={errors.lastName?.message}
        />

        <FormRow
          type="text"
          labeltext="Location"
          name="location"
          register={register}
          hookForm={true}
          errors={errors.location?.message}
        />

        <FormRow
          type="email"
          labeltext="Your Email"
          name="email"
          register={register}
          hookForm={true}
          errors={errors.email?.message}
        />

        <FormRow
          type="password"
          labeltext="Password"
          name="password"
          register={register}
          hookForm={true}
          errors={errors.password?.message}
        />

        <FormRow
          type="password"
          labeltext="Confirm Password"
          name="passwordConfirm"
          register={register}
          hookForm={true}
          errors={errors.passwordConfirm?.message}
        />

        {/* Form Submit Buttom */}
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="btn btn-block"
        >
          {isLoading ? 'Submit...' : 'Submit'}
        </button>
        <p className="already-member">
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
      <DevTool control={control} />
    </Wrapper>
  );
};
export default Register;
