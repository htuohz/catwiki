import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreedDetail from "./pages/BreedDetails";

const THEME = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
function App() {
  const [data, setData] = React.useState(null);

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breedDetails/:id" element={<BreedDetail />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
