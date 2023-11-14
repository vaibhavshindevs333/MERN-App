import { useMemo } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Home from "./scenes/homePage";
import Login from "./scenes/loginPage";
import Profile from "./scenes/profilePage";
import Update from "./scenes/profilePage/Update";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/account" replace />} />
            <Route path="/account" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update/:id" element={<Update />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
