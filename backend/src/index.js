import express from "express";
import cors from "cors";

import { lenders } from "./lenders.js";
// import { run } from "./rulesEngine.js";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.get("/lenders", (req, res) => {
  res.json(lenders);
});

// POST /submit
app.post("/submit", async (req, res) => {});

// App listening...
app.listen(port, () => {
  console.log(`Server listening on ${port}...`);
  console.log(lenders);
});

/**
 * Simulates an API call to bank
 * @param {object} lender
 * @return {Promise<>}
 */
// function sendToBank(lender) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(`Applied to ${lender.name}`)
//       resolve({
//         name: lender.name,
//         response: `Successfully applied to ${lender.name}`
//       })
//     }, 1000)
//   })
// }
