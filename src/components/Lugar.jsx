import { Stack, Box } from "@mui/material";
import { useState } from "react";

export function Lugar() {
  const [selected, setSelected] = useState(null);

  const onChange = (value) => {
    setSelected(value);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "60%",
          textAlign: "center" /* backgroundColor: "green" */,
        }}
      >
        <p>¿Dónde fue realizada esta práctica?</p>
      </Box>
      <Stack
        direction={"row"}
        spacing={5}
        sx={{ /*backgroundColor: "yellow" */ }}
      >
        <div>
        <input
          type="radio"
          id="1"
          name="lugar"
          checked={selected === "1"}
          onChange={() => onChange("1")}
        />
        <label htmlFor="1"> Lugar 1</label>
        </div>
        <div>
        <input
          type="radio"
          id="2"
          name="lugar"
          checked={selected === "2"}
          onChange={() => onChange("2")}
        />
        <label htmlFor="2"> Lugar 2</label>
        </div>
      </Stack>
    </Stack>
  );
}

