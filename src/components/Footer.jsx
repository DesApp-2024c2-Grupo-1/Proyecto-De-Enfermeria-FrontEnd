import React from "react";
import {
  Box,
  Stack,
} from "@mui/material";

function Footer() {
    return (
        <Box
          sx={{
            marginTop: "60px",
            backgroundColor: "#1A3D2D",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
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
            <p>Proyecto de Enfermería - 2025</p>
          </Stack>
        </Box>
    )
}

export default Footer;