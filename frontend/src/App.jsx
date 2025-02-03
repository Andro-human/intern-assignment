import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchStocks } from "./store/stockSlice";
import StockDropdown from "./components/StockDropdown";
import DurationSelector from "./components/DurationSelector";
import StockGraph from "./components/StockGraph";
import { Container, Box, Button } from "@mui/material";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import Header from "./components/Header";
const App = () => {
  const dispatch = useDispatch();
  const [openSignup, setOpenSignup] = useState(false);

  useEffect(() => {
    dispatch(fetchStocks());
  }, [dispatch]);

  return (
    <main>
      <SignedOut>
        {/* If user is signed out, show SignInButton */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpenSignup(true)}
            sx={{
              color: "#fff",
              fontSize: "16px",
              borderRadius: "30px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              textTransform: "none",

              "&:hover": {
                backgroundColor: "#3700b3",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
              },
              "&:active": {
                backgroundColor: "#03dac5",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Sign in
          </Button>
        </Box>
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
      {openSignup && <RedirectToSignIn />}
    </main>
  );
};

export default App;
