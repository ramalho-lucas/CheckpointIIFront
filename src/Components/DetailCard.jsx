import { useEffect, useState, useContext } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";
import api from "../api";
import { CircularProgress } from "@mui/material";
import { ThemeContext } from "../contexts/theme-context";

const DetailCard = () => {

  const { matricula } = useParams();
  const [dentista, setDentista] = useState({});
  const { theme } = useContext(ThemeContext);
  
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  async function getDentista() {
    const t = localStorage.getItem("ctd_token");
    setToken(t);
    try {
      const response = await api.get(`/dentista?matricula=${matricula}`, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      const d = {
        nome: response.data.nome,
        sobrenome: response.data.sobrenome,
        matricula: response.data.matricula,
        email: response.data.usuario.username,
      };
      setDentista(d);
      setInterval(() => setIsLoaded(true), 2000 )
     
    } catch (error) {
      console.log(error);
      alert("Erro ao tentar pegar dados do Dentista");
    }
  }

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o 
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
    getDentista();
  }, []);
  return (
    //As instruções que estão com {''} precisam ser 
    //substituídas com as informações que vem da api
    <>
      <h1>Detail about Dentist {dentista.nome} </h1>
      <section className={`card ${theme == "dark" ? "dark" : ""} col-sm-12 col-lg-6 container`}>

      { !isLoaded ? 
        <CircularProgress style={{margin: '0 auto'}}/> :
          <div className={`card-body row`}>
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className="list-group-item">Usuário: {dentista.email}</li>
            </ul>
            <div className="text-center">
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme == "dark" ? "dark": "light"} ${styles.button}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
}
      </section>
      <ScheduleFormModal dados={dentista} />
    </>
  );
};

export default DetailCard;
