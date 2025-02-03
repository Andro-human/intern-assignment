"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import { useState } from "react";

const Header = () => {
  const [openSignup, setOpenSignup] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "4rem",
        backgroundColor: "#f6f6f6",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "1rem",
          alignItems: "center",
        }}
      >
        <Avatar
          src="/assets/analysis.png"
          alt="Logo"
          sx={{ marginRight: "10px" }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#0077b6",
            fontWeight: "bold",
            backgroundColor: "#ffffff",
            fontSize: {
              xs: "1rem",
              sm: "1.5rem",
            },
          }}
        >
          Stock Market App
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box
        sx={{
          marginRight: {
            xs: "0",
            sm: "1rem",
          },
        }}
      >
        <SignedIn>
          {/* If user is signed in, show UserButton */}
          <UserButton />
        </SignedIn>
      </Box>
      {openSignup && <RedirectToSignIn />}
    </Box>
  );
};

export default Header;
