import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';

const Filtro = ({ placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <TextField
      fullWidth
      placeholder={placeholder || "Filtrar..."}
      variant="outlined"
      onFocus={handleFocus}
      onBlur={handleBlur}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img
              src={isFocused ? "assets/filter-focused.png" : "assets/filter.png"} 
              alt="busqueda-icon"
              style={{ width: 25, height: 25 }}
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

export default Filtro;
