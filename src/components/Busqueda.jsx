import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';

const Busqueda = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextField
      fullWidth
      placeholder={placeholder || "Buscar..."}
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img
              src={isFocused ? "assets/busqueda-focused-1.png" : "assets/busqueda.png"} 
              alt="busqueda-icon"
              style={{ width: 30, height: 30 }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        width: 200,
        '& .MuiOutlinedInput-root': {
          borderRadius: '50px',
          '&.Mui-focused fieldset': {
            borderColor: '#77C4A0', 
          },
        },
      }}
    />
  );
};

export default Busqueda;
