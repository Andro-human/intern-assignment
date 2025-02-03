import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDuration, fetchStockData } from "../store/stockSlice";
import { ButtonGroup, Button } from "@mui/material";

const DurationSelector = () => {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stock.selectedStock);
  const availableDurations = useSelector(
    (state) => state.stock.availableDurations
  );
  const selectedDuration = useSelector((state) => state.stock.selectedDuration);

  const handleDurationChange = (newDuration) => {
    dispatch(setDuration(newDuration));
    if (selectedStock) {
      dispatch(
        fetchStockData({ stockId: selectedStock, duration: newDuration })
      );
    }
  };

  if (!selectedStock) return null;

  return (
    <ButtonGroup>
      {availableDurations.map((d) => (
        <Button
          key={d}
          variant={selectedDuration === d ? "contained" : "outlined"}
          onClick={() => handleDurationChange(d)}
        >
          {d.toUpperCase()}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DurationSelector;
