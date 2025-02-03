import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStocks } from "./store/stockSlice";
import StockDropdown from "./components/StockDropdown";
import DurationSelector from "./components/DurationSelector";
import StockGraph from "./components/StockGraph";
import { Container, Box, Button } from "@mui/material";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import Header from "./components/Header";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);
  return (
    <main>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <Header />
        <h1>Stock Market Graph</h1>
        <Box sx={{ marginBottom: 2 }}>
          <StockDropdown />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <DurationSelector />
        </Box>
        <StockGraph />
      </SignedIn>
    </main>
  );
};

export default App;
