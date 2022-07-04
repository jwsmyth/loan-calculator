import express from "express";
import cors from "cors";

import { lenders } from "./lenders.js";
import { run } from "./rulesEngine.js";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// App listening...
app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
});

// --------------------------------------------------

// POST /submit
app.post("/submit", async (req, res) => {
  const applicationData = req.body;
  const activeLenders = run(applicationData, lenders);

  for (const lender of activeLenders) {
    await sendToBank(lender);
  }

  res.status(200).send("Success!");
});

/**
 * Simulates an API call to bank
 * @param {object} lender
 * @return {Promise<>}
 */
const sendToBank = (lender) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Applied to ${lender.name}`);
      resolve({
        name: lender.name,
        response: `Successfully applied to ${lender.name}`,
      });
    }, 1000);
  });
};
