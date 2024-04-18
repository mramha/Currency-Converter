import React, { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrencyOne, setSelectedCurrencyOne] = useState("");
  const [selectedCurrencyTwo, setSelectedCurrencyTwo] = useState("");
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(null);
  const host = "api.frankfurter.app";

  function handleSelectedCurrencyOne(e) {
    setSelectedCurrencyOne(e.target.value);
  }

  function handleSelectedCurrencyTwo(e) {
    setSelectedCurrencyTwo(e.target.value);
  }

  function handleAmount(e) {
    setAmount(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      if (selectedCurrencyOne && selectedCurrencyTwo && amount) {
        if (selectedCurrencyOne === selectedCurrencyTwo) {
          setExchangeRate(1); // Set exchange rate to 1 when currencies are the same
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `https://${host}/latest?from=${selectedCurrencyOne}&to=${selectedCurrencyTwo}`
        );

        const data = await response.json();
        setExchangeRate(data.rates[selectedCurrencyTwo]);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [selectedCurrencyOne, selectedCurrencyTwo, amount]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row mt-4">
        <input
          className="col mt-4"
          type="number"
          placeholder="Enter amount"
          onChange={handleAmount}
        />

        <div className="col-3">
          <label htmlFor="currency1">From</label>
          <select
            id="currency1"
            className="form-select"
            value={selectedCurrencyOne}
            onChange={handleSelectedCurrencyOne}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ILS">ILS</option>
          </select>
        </div>

        <div className="col-3">
          <label htmlFor="currency2">To</label>
          <select
            id="currency2"
            value={selectedCurrencyTwo}
            onChange={handleSelectedCurrencyTwo}
            className="form-select"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="ILS">ILS</option>
          </select>
        </div>

        {amount > 0 && exchangeRate !== null && (
          <div className="mt-4">
            <h5>
              {amount} {selectedCurrencyOne} = {amount * exchangeRate}{" "}
              {selectedCurrencyTwo}
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
