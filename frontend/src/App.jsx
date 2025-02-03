import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchStocks } from "./store/stockSlice";
import StockDropdown from "./components/StockDropdown";
import DurationSelector from "./components/DurationSelector";
import StockGraph from "./components/StockGraph";
import { Container, Box } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <Container>
      <h1>Stock Market Graph</h1>
      <Box sx={{ marginBottom: 2 }}>
        <StockDropdown />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <DurationSelector />
      </Box>
      <StockGraph />
    </Container>
  );
};

export default App;
