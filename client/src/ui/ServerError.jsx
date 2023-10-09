import { useSelector } from 'react-redux';
import { BiSolidErrorAlt } from 'react-icons/bi';
const ServerError = () => {
  const { errorState, error } = useSelector((state) => state.form);
  return errorState ? (
    <div className="serverError">
      {error.map((err) => (
        <div className="serverErrorRow" key={err.key}>
          <BiSolidErrorAlt />
          <p>{err.errorMsg}</p>
        </div>
      ))}
    </div>
  ) : (
    ''
  );
};
export default ServerError;
