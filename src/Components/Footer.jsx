import styles from "./Footer.module.css";
import { ThemeContext } from "../contexts/theme-context";
import {useContext } from "react";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }
  return (
    <footer>
      <div className={`${theme == "dark" ? 'dark' : 'light'} styles.footerWrapper`}>
        <button className={`btn btn-danger ${styles.top}`} onClick={scrollToTop}>Voltar para o topo</button>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar a class navbar-dark bg-dark ou navbar-light bg-light  */}
        <div className={`navbar-${theme == "dark" ? 'dark' : 'light'} bg-${theme == "dark" ? 'dark' : 'light'} ${styles.footer}`}>
          <div className="container">
            <div className={`row`}>
              <div className="col-sm-12 col-lg-6">
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
                // está em dark mode e deverá utilizar o css correto */}
                <img className={`${styles.dhLogo}`} src="/images/DH.png" alt='DH-logo' />
              </div>
              <div className={`col-sm-12 col-lg-6 ${styles.icons}`}>
                <img src="/images/ico-facebook.png" alt="ícone do facebook" className={styles.icon} />
                <img src="/images/ico-instagram.png" alt="ícone do instagram" className={styles.icon} />
                <img src="/images/ico-whatsapp.png" alt="ícone do whatsapp" className={styles.icon} />
                <img src="/images/ico-tiktok.png" alt="ícone do tiktok" className={styles.icon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  )
}

export default Footer