import Container from "@mui/material/Container";
import { MouseEventHandler, useCallback, useState } from "react";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import "./App.css";
import translations from "./translations";
import Form from "./Form";
import Departures from "./Departures";
import type { Search } from "./types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next).use(LanguageDetector).init(translations);

function App() {
  const [search, setSearch] = useState<Search | null>(null);
  const { t } = useTranslation();
  const onSubmit = useCallback((searchParameters: Search) => {
    setSearch(searchParameters);
  }, []);

  const [anchorEl, setAnchorEl] = useState<
    (EventTarget & HTMLButtonElement) | null
  >(null);

  const handleMenu: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <Container>
      <div className="App">
        <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                textAlign="left"
              >
                busbud coding challenge
              </Typography>
              <Button color="inherit" onClick={handleMenu}>
                {t("Language")}
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    i18next.changeLanguage("fr");
                    handleClose();
                  }}
                >
                  {t("Francais")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    i18next.changeLanguage("en");
                    handleClose();
                  }}
                >
                  {t("English")}
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
        <div>
          <Form onSubmit={onSubmit} />
        </div>
        <div>
          {search !== null && (
            <Departures
              origin={search.origin}
              destination={search.destination}
              date={search.date}
              passengers={search.passengers}
            />
          )}
        </div>
      </div>
    </Container>
  );
}

export default App;
