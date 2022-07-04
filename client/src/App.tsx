import Calculator from "./components/Calculator";

const App = () => {
  const title = "Loan calculator";

  return (
    <div className="App max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-center pt-12 pb-6">{title}</h1>
      <Calculator />
    </div>
  );
};

export default App;
