
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "./contexts/theme-context";
import "../src/index.css"

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a classe dark ou light */}
      <div className={`{app ${theme == "dark" ? "dark" : ""}}`}>
        <Navbar />
        <main className={`${theme == "dark"? "dark" : ""}`}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
