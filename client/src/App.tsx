import { useEffect, useState } from "react";
import axios from "axios";
import Calculator from "./components/Calculator";
import { Lender } from "./types";

function App() {
  const title = "Loan calculator";
  const [, setData] = useState<Lender[]>([]);

  useEffect(() => {
    const fetchLenders = async () => {
      const { data } = await axios.get("/lenders");
      setData(data);
    };
    fetchLenders();
  }, []);

  return (
    <div className="App max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center pt-12 pb-6">{title}</h1>
      <Calculator />
    </div>
  );
}

export default App;
