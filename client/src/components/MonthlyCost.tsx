type MonthlyCostProps = {
  label: string;
  formattedMonthlyCost: string | null;
};

const MonthlyCost = ({ label, formattedMonthlyCost }: MonthlyCostProps) => {
  return (
    <div className="monthly-cost">
      <h1 className="monthly-cost-label font-semibold text-xl">{label}</h1>
      <div className="monthly-cost-value">
        <span className="text-3xl font-extralight italic">
          {formattedMonthlyCost}
        </span>
      </div>
    </div>
  );
};

export default MonthlyCost;
