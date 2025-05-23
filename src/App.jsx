import React, { useState } from "react";

import "./App.css";
import Cell from "./components/Cell";

export default function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const activateCells = (index) => {
    const newOrder = [...order, index];
    setOrder(newOrder);

    // deactivation
    if (newOrder.length === config.flat(1).filter(Boolean).length) {
      deactivateCells();
    }
  };

  const deactivateCells = () => {
    setIsDeactivating(true);
    const timer = setInterval(() => {
      setOrder((origOrder) => {
        const newOrder = origOrder.slice();
        newOrder.pop();

        if (newOrder.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return newOrder;
      });
    }, 300);
  };
  return (
    <div className="wrapper">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${config[0].length},1fr)` }}
      >
        {config.flat(1).map((val, i) => {
          return val ? (
            <Cell
              key={i}
              label={`Cell ${i}`}
              filled={order.includes(i)}
              onClick={() => activateCells(i)}
              isDisabled={order.includes(i) || isDeactivating}
            />
          ) : (
            <span />
          );
        })}
      </div>
    </div>
  );
}
