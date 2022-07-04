import { MonthlyCalculation } from "../interfaces";
import { INTEREST } from "../consts";

export const formatAmount = (x: number, suffix: string): string => {
  return `${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${suffix}`;
};

export const formatDuration = (x: number, suffix: string): string => {
  return `${x} ${suffix}`;
};

export const calculateMonthlyCost = ({
  amount,
  duration,
}: MonthlyCalculation): number => {
  const months = duration * 12;
  return Math.round(
    (amount * (INTEREST / 100)) /
      12 /
      (1 - Math.pow(1 + INTEREST / 100 / 12, months * -1))
  );
};
