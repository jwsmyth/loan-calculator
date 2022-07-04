type ButtonProps = {
  label: string;
  handleSubmit: any;
  enabled: boolean;
};

const ApplyButton = ({ label, handleSubmit, enabled }: ButtonProps) => {
  return (
    <div className="pt-12">
      <button
        className="cta-button apply-button"
        onClick={handleSubmit}
        disabled={!enabled}
      >
        <span className="italic pl-2">{label}</span>
        <span>&#8594;</span>
      </button>
    </div>
  );
};

export default ApplyButton;
