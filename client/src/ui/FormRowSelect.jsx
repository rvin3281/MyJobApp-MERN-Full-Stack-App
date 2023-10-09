const FormRowSelect = ({
  labeltext,
  defaultValue = '',
  name,
  list,
  register,
  errors,
  isLoading,
  hookForm,
  onChange,
}) => {
  return !hookForm ? (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labeltext || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        value={defaultValue}
        onChange={onChange}
      >
        {list.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  ) : (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labeltext || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        disabled={isLoading || ''}
        defaultValue={defaultValue}
        {...register(name)}
      >
        {list.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
      <p className="error">{errors}</p>
    </div>
  );
};
export default FormRowSelect;
