import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectStock, fetchStockData } from "../store/stockSlice";
import { MenuItem, Select } from "@mui/material";

const StockDropdown = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stock.stocks);
  const selectedStock = useSelector((state) => state.stock.selectedStock);

  const handleChange = (event) => {
    const stockId = event.target.value;
    dispatch(selectStock(stockId));
  };

  return (
    <Select value={selectedStock || ""} onChange={handleChange} displayEmpty>
      <MenuItem value="" disabled>
        Select a Stock
      </MenuItem>
      {stocks.map((stock) => (
        <MenuItem key={stock.id} value={stock.id}>
          {stock.name} ({stock.symbol})
        </MenuItem>
      ))}
    </Select>
  );
};

export default StockDropdown;
