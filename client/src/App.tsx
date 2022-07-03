import { useEffect, useState } from "react";
import axios from "axios";

export interface Lender {
  name: string;
  rules: Rule[];
}

export interface Rule {
  field: string;
  operator: string;
  value: number;
}

function App() {
  const [data, setData] = useState<Lender[]>([]);

  useEffect(() => {
    const fetchLenders = async () => {
      const { data } = await axios.get("/lenders");
      setData(data);
    };
    fetchLenders();
  }, []);

  return (
    <div className="App">
      <h1>Hello world!</h1>
      <ul>
        {data.map((x) => (
          <li key={x.name}>{x.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
