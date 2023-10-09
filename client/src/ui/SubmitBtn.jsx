const SubmitBtn = ({ formBtn, isLoading }) => {
  return (
    <button
      disabled={isLoading}
      className={`btn btn-block ${formBtn && 'form-btn'} `}
      type="submit"
    >
      {isLoading ? 'Submitting...' : 'Submit'}
    </button>
  );
};
export default SubmitBtn;
