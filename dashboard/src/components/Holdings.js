// Import necessary libraries
import React, { useState, useEffect } from "react";    // useState for state management, useEffect for lifecycle method
import axios from "axios";                             // Axios for making HTTP requests
// import { holdings } from "../data/data";               // (Optional/Unused) Local mock data, possibly for fallback or testing

// React Functional Component
const Holdings = () => {

  // State to store holdings fetched from backend
  const [allHoldings, setAllHoldings] = useState([]);

  // useEffect hook runs once on component mount to fetch holdings data
  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings")     // API call to get holdings data from backend
      .then((res) => {
        setAllHoldings(res.data);                      // Set response data to state
      });
  }, []);                                               // Empty dependency array = runs once after component loads

  // Calculate Total Investment = sum of (quantity * average cost) of each stock
  const totalInvestment = allHoldings.reduce(
    (total, stock) => total + (stock.qty * stock.avg),
    0
  );

  // Calculate Current Value = sum of (quantity * latest price) of each stock
  const currentValue = allHoldings.reduce(
    (total, stock) => total + (stock.qty * stock.price),
    0
  );

  // Profit or Loss = current value - total investment
  const profitLoss = currentValue - totalInvestment;

  // Profit or Loss Percentage = (P&L / total investment) * 100
  const profitLossPercentage = (profitLoss / totalInvestment) * 100;

  return (
    <>
      {/* Title */}
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {/* Table for displaying each stock holding */}
      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {/* Loop through each holding to display details */}
          {allHoldings.map((stock, index) => {
              const curValue = stock.qty * stock.price; // Current value = quantity * LTP
              const isProfit = curValue - (stock.avg * stock.qty) >= 0; // Boolean to check profit or loss
              const profClass = isProfit ? "profit" : "loss";          // Apply class for styling
              const dayClass = stock.isLoss ? "loss" : "profit";       // Day change class styling

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg}</td>
                  <td>{stock.price}</td>
                  <td>{curValue}</td>

                  {/* Profit & Loss Value with + or - symbol */}
                  <td className={profClass}>
                    {isProfit ? "+" : "-"}
                    {Math.abs(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>

                  {/* Net % change in value since purchase */}
                  <td className={profClass}>{stock.net}</td>

                  {/* Day change percentage */}
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
          })}
        </table>
      </div>

      {/* Summary at bottom: Total Investment, Current Value, and Profit/Loss */}
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>{profitLoss.toFixed(2)} ({profitLossPercentage.toFixed(2)}%)</h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings; // Export the component to use in other parts of your app
