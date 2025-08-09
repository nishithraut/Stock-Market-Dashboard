import React, { useState, useEffect } from "react"; // useState for state management, useEffect for lifecycle method
import axios from "axios"; // Axios for making HTTP requests
// import {positions} from "../data/data";               // (Optional/Unused) Local mock data, possibly for fallback or testing

const Positions = () => {
  // State to store positions fetched from backend
  const [allPositions, setAllPositions] = useState([]);

  // useEffect hook runs once on component mount to fetch holdings data
  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions") // API call to get holdings data from backend
      .then((res) => {
        setAllPositions(res.data); // Set response data to state
      });
  }, []); // Empty dependency array = runs once after component loads

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPositions.map((stock, index) => {
            const curValue = stock.qty * stock.price;
            const isProfit = curValue - stock.avg * stock.qty >= 0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg}</td>
                <td>{stock.price}</td>

                <td className={profClass}>
                  {isProfit ? "+" : "-"}
                  {Math.abs(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>

                <td className={dayClass}>{stock.day}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Positions;
