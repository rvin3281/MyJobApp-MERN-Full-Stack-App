const FormRow = ({
  type,
  labeltext,
  name,
  register,
  defaultValue,
  errors,
  isLoading,
  hookForm,
  onChange,
}) => {
  return !hookForm ? (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext}
      </label>

      <input
        className="form-input"
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ''}
        onChange={onChange}
      />
    </div>
  ) : (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext}
      </label>

      <input
        className="form-input"
        type={type}
        name={name}
        id={name}
        disabled={isLoading || ''}
        defaultValue={defaultValue || ''}
        {...register(name)}
      />
      <p className="error">{errors}</p>
    </div>
  );
};
export default FormRow;
