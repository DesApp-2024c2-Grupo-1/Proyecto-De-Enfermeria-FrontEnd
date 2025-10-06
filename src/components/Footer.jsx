import React from "react";
import {
  Box,
  Stack,
} from "@mui/material";

function Footer() {
    return (
        <Box
          sx={{
            marginTop: "40px",
            backgroundColor: "#FFFFFF",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10px",
            width: "100%",
            bottom: "0",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </Stack>
        </Box>
    )
}

export default Footer;