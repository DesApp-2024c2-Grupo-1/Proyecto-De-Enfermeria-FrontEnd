import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const DescargarExcelButton = ({ width, height, margin }) => {
  const descargarExcel = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/alumno/exportar/excel",
        {
          method: "GET",
        }
      );

      if (!response.ok) throw new Error("Error al descargar el archivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "alumnos.xlsx";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el Excel:", error);
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={descargarExcel}
      sx={{
        width: width || "200px",
        height: height || "50px",
        margin: margin || "0",
        borderRadius: "10px",
        textTransform: "none",
        borderColor: "#e6e6e6",
        color: "#55B589",
        fontWeight: 500,
        fontSize: "16px",
        "&:hover": {
          borderColor: "#77C4A0",
          backgroundColor: "#f0faf7",
        },
      }}
    >
      Descargar Excel
    </Button>
  );
};

export default DescargarExcelButton;
