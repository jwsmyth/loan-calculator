import { useEffect, useState } from "react";

import {
  MIN_AMOUNT,
  MIN_DURATION,
  MAX_AMOUNT,
  MAX_DURATION,
  AMOUNT_INTERVAL,
  DURATION_INTERVAL,
  INTEREST,
} from "../consts";
import { MonthlyCalculation } from "../types";

function Calculator() {
  const [amount, setAmount] = useState<number>(250000);
  const [duration, setDuration] = useState<number>(14);
  const [monthlyCost, setMonthlyCost] = useState<number>();

  const monthlyCostLabel = "Månadskostnad";
  const loanAmountLabel = "Lånebelopp";
  const krSuffix = "kr";
  const repaymentYearsLabel = "Återbetalningstid";
  const repaymentYearsSuffix = "år";
  const ctaLabel = "Ansök nu";

  useEffect(() => {
    setMonthlyCost(calculateMonthlyCost({ amount, duration }));
  }, [amount, duration]);

  const addAmount = (): void => {
    if (amount >= MAX_AMOUNT) return;
    setAmount((prev) => prev + AMOUNT_INTERVAL);
  };

  const removeAmount = (): void => {
    if (amount <= MIN_AMOUNT) return;
    setAmount((prev) => prev - AMOUNT_INTERVAL);
  };

  const addDuration = (): void => {
    if (duration >= MAX_DURATION) return;
    setDuration((prev) => prev + DURATION_INTERVAL);
  };

  const removeDuration = (): void => {
    if (duration <= MIN_DURATION) return;
    setDuration((prev) => prev - DURATION_INTERVAL);
  };

  const formatAmount = (x: number): string => {
    return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${krSuffix}`;
  };

  const formatDuration = (x: number): string => {
    return `${x} ${repaymentYearsSuffix}`;
  };

  const calculateMonthlyCost = ({ amount, duration }: MonthlyCalculation) => {
    const months = duration * 12;
    return Math.round(
      (amount * (INTEREST / 100)) /
        12 /
        (1 - Math.pow(1 + INTEREST / 100 / 12, months * -1))
    );
  };

  return (
    <div className="border shadow-lg p-8 rounded-md max-w-md mx-auto">
      <div className="monthly-cost">
        <h1 className="monthly-cost-label font-semibold text-xl">
          {monthlyCostLabel}
        </h1>
        <div className="monthly-cost-value">
          <span className="text-3xl font-extralight italic">
            {monthlyCost ? formatAmount(monthlyCost) : null}
          </span>
        </div>
      </div>
      <div className="amount py-4">
        <h2 className="font-semibold py-2">{loanAmountLabel}</h2>

        <div className="flex">
          <div className="self-center">
            <button className="calculator-button" onClick={removeAmount}>
              <span>-</span>
            </button>
          </div>

          <div className="flex-1 px-4">
            <input
              readOnly
              className="p-4 rounded-md border-2 w-full text-lg"
              value={formatAmount(amount)}
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
            />
          </div>

          <div className="self-center">
            <button className="calculator-button" onClick={addAmount}>
              <span>+</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-semibold py-2">{repaymentYearsLabel}</h2>

        <div className="flex">
          <div className="self-center">
            <button className="calculator-button" onClick={removeDuration}>
              <span>-</span>
            </button>
          </div>

          <div className="flex-1 px-4">
            <input
              readOnly
              className="p-4 rounded-md border-2 w-full text-lg"
              value={formatDuration(duration)}
              min={MIN_DURATION}
              max={MAX_DURATION}
            />
          </div>

          <div className="self-center">
            <button className="calculator-button" onClick={addDuration}>
              <span>+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-12">
        <button className="cta-button apply-button">
          <span className="italic pl-2">{ctaLabel}</span>
          <span>&#8594;</span>
        </button>
      </div>
    </div>
  );
}

export default Calculator;
