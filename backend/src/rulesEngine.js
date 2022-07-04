/**
 * @param {object} applicationData
 * @param {Array} lenders - An array with lenders and their rules
 * @return {Array} - The filtered array
 */
export const run = (applicationData, lenders) => {
  let activeLenders = lenders;

  for (const lender of lenders) {
    if (lender.rules) {
      for (const rule of lender.rules) {
        if (rule.operator === "lessThan") {
          if (!lessThan(applicationData, rule)) {
            activeLenders = filterOutLender(activeLenders, lender);
            break;
          }
        } else {
          if (!greaterThan(applicationData, rule)) {
            activeLenders = filterOutLender(activeLenders, lender);
            break;
          }
        }
      }
    }
  }

  return activeLenders;
};

const lessThan = (applicationData, rule) => {
  return applicationData[rule.field] < rule.value;
};

const greaterThan = (applicationData, rule) => {
  return applicationData[rule.field] > rule.value;
};

const filterOutLender = (activeLenders, currentLender) => {
  return activeLenders.filter((l) => l.name !== currentLender.name);
};
