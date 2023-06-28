import { useContext, useEffect, useState } from "react";
import styles from "./ScheduleForm.module.css";
import api from "../api";
import { Snackbar, Alert, AlertTitle, FormControl, MenuItem, FormHelperText, InputLabel, Select, } from "@mui/material";

const ScheduleForm = (props) => {
  const dentista = props.dados
  const [listPaciente, setListPaciente] = useState([]);
  const [paciente, setPaciente] = useState({})
  const [dataConsulta, setDataConsulta] = useState("")
  const [responseType, setResponseType] = useState('info')
  const [responseMsg, setResponseMsg] = useState('')
  const [open, setOpen] = useState(false)


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  

  async function getPacientes() {
    try {
      const response = await api.get("/paciente");
      console.log(response.data.body);
      setListPaciente(response.data.body);

    } catch (err) {
      alert(err);
    }
  }

  async function marcarConsulta() {
    try{
      await api.post("/consulta", {
        paciente: paciente,
        dentista: dentista,
        dataHoraAgendamento: dataConsulta
  
      });
      setResponseType('success')
      setResponseMsg('Consulta cadastrada com sucesso!')
    }catch(Err){
      setResponseType('error')
      setResponseMsg(`Erro ao cadastrar: ${Err}`)
    }
    
  }

  useEffect(() => {
    getPacientes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true)
    console.log(paciente);
    if (Object.keys(paciente).length !== 0) {
      marcarConsulta()
    }else{
      setResponseType('info')
      setResponseMsg('Selecione um paciente antes de marcar consulta.')
    }
    
  };

  const handleChange = (event) => {
    
      if (event.target.name == "paciente"){
        setPaciente(listPaciente[event.target.value])
      }
      else{
        setDataConsulta(event.target.value)
      }
  
  };

  return (
    <>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
  <Alert onClose={handleClose} severity={responseType} sx={{ width: '100%' }}>
    {responseMsg}
  </Alert>
</Snackbar>
      <div className={`text-center container}`}>
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select
                className="form-select"
                name="dentista"
                id="dentist"
              >
                {
                  <option
                    key={dentista.matricula}
                  >
                    {`${dentista.nome}`}
                 </option>
                }
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>
              <select
                className="form-select"
                name="paciente"
                id="patient"
                onChange={handleChange}
              >
                <option value="">Selecione um paciente</option>
                {listPaciente.map((paciente, index) => (
                  <option key={paciente.matricula} value={index}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="dataHoraAgendamento"
                type="datetime-local"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button className={`btn btn-light ${styles.button}`} type="submit">
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
