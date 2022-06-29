import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedules from "./pages/Schedules";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import SpinnerContextProvider from "./contexts/SpinnerContextProvider";
import fr from "./translations/fr.json";
import en from "./translations/en.json";

function App() {
  const navigate = useNavigate();
  const [changLan, toggle] = useState(false);

  const objTranslate = {
    en: en,
    fr: fr,
  };

  const changeLan = () => {
    toggle(!changLan);
  };
  const lang = localStorage.getItem("lang") || "en";

  return (
    <SpinnerContextProvider>
      <IntlProvider locale={lang} messages={objTranslate[lang]}>
        <Navbar nav={navigate} changeLan={changeLan} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/schedules" element={<Schedules lang={lang} />}></Route>
          <Route path="*" element={<Home />} />
        </Routes>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          &copy; {1900 + new Date().getYear()}, BusBud Challenge
        </div>
      </IntlProvider>
    </SpinnerContextProvider>
  );
}

export default App;
