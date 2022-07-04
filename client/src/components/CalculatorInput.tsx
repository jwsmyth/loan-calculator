import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

type InputProps = {
  label: string;
  value: number;
  buttonClick: Array<() => void>;
  manualChange: (newVaule: number) => void;
  minMaxValues: Array<number>;
  interval: number;
  suffix: string;
};

const CalculatorInput = ({
  label,
  value,
  buttonClick,
  manualChange,
  minMaxValues,
  interval,
  suffix,
}: InputProps) => {
  const [addValue, removeValue] = buttonClick;
  const [minValue, maxValue] = minMaxValues;
  const [addSuffix, setAddSuffix] = useState(true);

  const handleOnValueChange = (newValue: string | undefined) => {
    if (newValue === undefined) {
      manualChange(minValue);
      return;
    }

    const newValueNumber = Number(newValue);

    if (newValueNumber >= maxValue) {
      manualChange(maxValue);
      return;
    }

    if (newValueNumber <= minValue) {
      manualChange(minValue);
      return;
    }

    manualChange(newValueNumber);
  };

  const toggleSuffix = () => {
    setAddSuffix((prev) => !prev);
  };

  return (
    <div className="py-4">
      <label className="font-semibold py-2" htmlFor={label}>
        {label}
      </label>

      <div className="flex">
        <div className="self-center">
          <button className="calculator-button" onClick={removeValue}>
            <span>-</span>
          </button>
        </div>

        <div className="flex-1 px-4">
          <CurrencyInput
            className="p-4 rounded-md border-2 w-full text-lg"
            id={label}
            value={value}
            onValueChange={handleOnValueChange}
            groupSeparator=" "
            onFocus={toggleSuffix}
            onBlur={toggleSuffix}
            step={interval}
            suffix={addSuffix ? suffix : ""}
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
