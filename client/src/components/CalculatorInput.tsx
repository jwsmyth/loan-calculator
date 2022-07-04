type InputProps = {
  label: string;
  value: string;
  changeValue: Array<() => void>;
  minMaxValues: Array<number>;
};

const CalculatorInput = ({
  label,
  value,
  changeValue,
  minMaxValues,
}: InputProps) => {
  const [addValue, removeValue] = changeValue;
  const [minValue, maxValue] = minMaxValues;

  return (
    <div className="py-4">
      <h2 className="font-semibold py-2">{label}</h2>

      <div className="flex">
        <div className="self-center">
          <button className="calculator-button" onClick={removeValue}>
            <span>-</span>
          </button>
        </div>

        <div className="flex-1 px-4">
          <input
            readOnly
            className="p-4 rounded-md border-2 w-full text-lg"
            value={value}
            min={minValue}
            max={maxValue}
          />
        </div>

        <div className="self-center">
          <button className="calculator-button" onClick={addValue}>
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalculatorInput;
