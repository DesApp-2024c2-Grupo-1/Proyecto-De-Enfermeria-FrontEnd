// src/components/ListaCards.jsx
import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Stack,
  Box,
  Collapse,
  useMediaQuery,
  createTheme,
} from "@mui/material";

export default function ListaCards({
  titulo,
  lista = [],
  keys = ["fecha", "nota"],
  buttonOnClick = () => {},
  paramOnClick = "id",
  initialLimit = 2,
}) {
  const theme = createTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(false);

  const getValue = (obj, key) =>
    key.includes(".")
      ? key.split(".").reduce((acc, p) => acc?.[p], obj)
      : obj?.[key];

  const listaOrdenada = useMemo(() => {
    try {
      return [...lista].sort((a, b) => {
        const da = new Date(getValue(a, keys[0]));
        const db = new Date(getValue(b, keys[0]));
        return db - da;
      });
    } catch {
      return lista;
    }
  }, [lista, keys]);

  const listaVisible = expanded
    ? listaOrdenada
    : listaOrdenada.slice(0, initialLimit);

  return (
    <Card
      sx={{
        backgroundColor: "#F4F8F5",
        borderRadius: "16px",
        mb: 3,
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        p: 1,
        width: "100%",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        "&:hover": { boxShadow: "0 6px 18px rgba(0,0,0,0.12)" },
      }}
    >
      <CardContent>
        <Typography
          fontSize={22}
          fontWeight={700}
          color="#1A3D2D"
          sx={{ fontFamily: "Poppins, Inter, sans-serif", mb: 2 }}
        >
          {titulo}
        </Typography>

        <Collapse
          in={true}
          timeout={500}
          easing={{ enter: "ease-out", exit: "ease-in" }}
        >
          <Box
            sx={{
              transition: "all 0.45s ease",
              transform: expanded ? "translateY(0px)" : "translateY(-4px)",
              opacity: expanded ? 1 : 1,
            }}
          >
            <Stack spacing={2}>
              {listaVisible.map((item, index) => {
                const fecha = getValue(item, keys[0]) ?? "—";
                const nota = getValue(item, keys[1]) ?? "—";
                const id = getValue(item, paramOnClick) ?? item.id;

                return (
                  <Box key={index}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ padding: "8px 4px" }}
                    >
                      <Box>
                        <Typography sx={{ fontFamily: "Poppins, Inter, sans-serif" }} fontWeight={600}>{fecha}</Typography>
                        <Typography sx={{ fontFamily: "Poppins, Inter, sans-serif" }} fontSize={14} color="text.secondary">
                          Nota: {nota}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#1A3D2D",
                          textTransform: "none",
                          borderRadius: "8px",
                          px: 2,
                          ":hover": { backgroundColor: "#124126" },
                        }}
                        onClick={() => buttonOnClick(id)}
                      >
                        Ver
                      </Button>
                    </Stack>

                    {index < listaVisible.length - 1 && (
                      <Divider sx={{ opacity: 0.4 }} />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Collapse>

        {/* BOTÓN VER MÁS / VER MENOS */}
        {listaOrdenada.length > initialLimit && (
          <Box textAlign="center" mt={2}>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#1A3D2D",
                borderColor: "#1A3D2D",
                borderRadius: "10px",
                px: 3,
                "&:hover": { backgroundColor: "#EBF4EF" },
              }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded
                ? "Ver menos"
                : `Ver todas (${listaOrdenada.length - initialLimit} más)`}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
