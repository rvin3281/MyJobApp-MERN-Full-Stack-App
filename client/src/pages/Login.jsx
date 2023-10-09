import { DevTool } from '@hookform/devtools';
import { useCustomForm } from '../hooks/useCustomForm';
import { useLoginForm } from '../hooks/useCreateForm';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../ui/index';
import { loginSchema } from '../utils/formSchema/formsSchema';
import ServerError from '../ui/ServerError';
import FormRowSelect from '../ui/FormRowSelect';
import { USER_ROLE } from '../utils/constant';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState, control, reset } =
    useCustomForm(loginSchema);

  const { mutate, isLoading } = useLoginForm(reset);

  const {
    errors,
    isValid,
    isDirty,
    // isSubmitting,
    // isSubmitted,
    // isSubmitSuccessful,
    // submitCount,
  } = formState;

  // * onSUBMIT --> THE FORM SUBMIT FROM USER TO REACT HOOK FORM TO HANDLE
  // * onSUBMIT --> FROM THIS FUNCTION WE SEND TO REACT QUERY TO HANDLE
  const onSubmit = (data) => {
    // const test = { ...data };
    // test.role = 'admin';
    // console.log('form Submitted', test);
    mutate(data);
  };

  // * THIS ONERROR DISPLAY ERROR ON THE FORM --> NOT RELATED TO FORM SUBMISSION
  const onError = (error) => {
    console.log(error);
  };

  // const state = useSelector((state) => state.auth.user);

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="form"
        noValidate
      >
        <Logo />
        <h4>Login</h4>
        <ServerError />
        <FormRow
          type="email"
          labeltext="Email"
          name="email"
          hookForm={true}
          register={register}
          errors={errors.email?.message}
        />
        <FormRow
          type="password"
          labeltext="Password"
          name="password"
          hookForm={true}
          register={register}
          errors={errors.password?.message}
        />
        <FormRowSelect
          labeltext="Select Role"
          name="role"
          hookForm={true}
          defaultValue={USER_ROLE.USER}
          list={Object.values(USER_ROLE)}
          register={register}
          errors={errors.role?.message}
        />

        {/* Form Submit Buttom */}
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className="btn btn-block"
        >
          {isLoading ? 'Submitting' : 'Submit'}
        </button>

        <div className="not-member">
          <p>Not a member yet?</p>
          <p>
            <span>Click Here To </span>
            <Link to="/register" className="member-btn">
              Register Now
            </Link>
          </p>
        </div>
      </form>
      <DevTool control={control} />
    </Wrapper>
  );
};
export default Login;
