import { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

import {
  MIN_AMOUNT,
  MIN_DURATION,
  MAX_AMOUNT,
  MAX_DURATION,
  AMOUNT_INTERVAL,
  DURATION_INTERVAL,
  SEND_APPLICATION,
  START_AMOUNT,
  START_DURATION,
} from "../consts";
import { formatAmount, calculateMonthlyCost } from "../utils/helperFunctions";
import { SendApplicationResponseData } from "../interfaces";
import ApplyButton from "./ApplyButton";
import CalculatorInput from "./CalculatorInput";
import MonthlyCost from "./MonthlyCost";
import API from "../api";

function Calculator() {
  const [amount, setAmount] = useState<number>(START_AMOUNT);
  const [duration, setDuration] = useState<number>(START_DURATION);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const monthlyCostLabel = "Månadskostnad";
  const loanAmountLabel = "Lånebelopp";
  const amountSuffix = " kr";
  const durationLabel = "Återbetalningstid";
  const durationSuffix = " år";
  const ctaLabel = "Ansök nu";

  useEffect(() => {
    setMonthlyCost(calculateMonthlyCost({ amount, duration }));
  }, [amount, duration]);

  const addAmount = (): void => {
    if (amount >= MAX_AMOUNT - AMOUNT_INTERVAL) {
      setAmount(MAX_AMOUNT);
      return;
    }
    setAmount((prev) => prev + AMOUNT_INTERVAL);
  };

  const removeAmount = (): void => {
    if (amount <= MIN_AMOUNT + AMOUNT_INTERVAL) {
      setAmount(MIN_AMOUNT);
      return;
    }
    setAmount((prev) => prev - AMOUNT_INTERVAL);
  };

  const handleAmountChange = (newAmount: number): void => {
    setAmount(newAmount);
  };

  const addDuration = (): void => {
    if (duration >= MAX_DURATION) return;
    setDuration((prev) => prev + DURATION_INTERVAL);
  };

  const removeDuration = (): void => {
    if (duration <= MIN_DURATION) return;
    setDuration((prev) => prev - DURATION_INTERVAL);
  };

  const handleDurationChange = (newDuration: number): void => {
    setDuration(newDuration);
  };

  const sendApplication = async (): Promise<SendApplicationResponseData[]> => {
    setLoading(true);
    const { data } = await API.post(SEND_APPLICATION, { amount, duration });
    console.info(data);
    setLoading(false);
    return data;
  };

  return (
    <div className="border shadow-lg p-8 rounded-md max-w-md mx-auto">
      <MonthlyCost
        label={monthlyCostLabel}
        formattedMonthlyCost={
          monthlyCost ? formatAmount(monthlyCost, amountSuffix) : null
        }
      />

      <CalculatorInput
        label={loanAmountLabel}
        value={amount}
        buttonClick={[addAmount, removeAmount]}
        manualChange={handleAmountChange}
        minMaxValues={[MIN_AMOUNT, MAX_AMOUNT]}
        interval={AMOUNT_INTERVAL}
        suffix={amountSuffix}
      />

      <CalculatorInput
        label={durationLabel}
        value={duration}
        buttonClick={[addDuration, removeDuration]}
        manualChange={handleDurationChange}
        minMaxValues={[MIN_DURATION, MAX_DURATION]}
        interval={DURATION_INTERVAL}
        suffix={durationSuffix}
      />

      <ApplyButton
        label={ctaLabel}
        handleSubmit={sendApplication}
        enabled={!loading}
      />
      <div className="flex justify-center items-center">
        <ScaleLoader
          color={"#000000"}
          loading={loading}
          cssOverride={{ position: "absolute" }}
        />
      </div>
    </div>
  );
}

export default Calculator;
