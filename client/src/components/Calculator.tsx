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
} from "../consts";
import {
  formatAmount,
  formatDuration,
  calculateMonthlyCost,
} from "../utils/helperFunctions";
import { SendApplicationResponseData } from "../interfaces";
import ApplyButton from "./ApplyButton";
import CalculatorInput from "./CalculatorInput";
import MonthlyCost from "./MonthlyCost";
import API from "../api";

function Calculator() {
  const [amount, setAmount] = useState<number>(250000);
  const [duration, setDuration] = useState<number>(14);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const monthlyCostLabel = "Månadskostnad";
  const loanAmountLabel = "Lånebelopp";
  const amountSuffix = "kr";
  const durationLabel = "Återbetalningstid";
  const durationSuffix = "år";
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

  const sendApplication = async (): Promise<SendApplicationResponseData> => {
    setLoading(true);
    const response = await API.post(SEND_APPLICATION, { amount, duration });
    setLoading(false);
    return response.data;
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
        value={formatAmount(amount, amountSuffix)}
        changeValue={[addAmount, removeAmount]}
        minMaxValues={[MIN_AMOUNT, MAX_AMOUNT]}
      />

      <CalculatorInput
        label={durationLabel}
        value={formatDuration(duration, durationSuffix)}
        changeValue={[addDuration, removeDuration]}
        minMaxValues={[MIN_DURATION, MAX_DURATION]}
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
