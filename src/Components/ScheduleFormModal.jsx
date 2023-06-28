import { useContext } from 'react';
import ScheduleForm from './ScheduleForm';
import { ThemeContext } from "../contexts/theme-context";


const ScheduleFormModal = (props) => {
  const dentista = props.dados
  const { theme } = useContext(ThemeContext);


  

  return (
    <div className={`modal fade`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className={`modal-content ${theme == "dark" ? "dark" : ""}`}>
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Selecione o dentista, paciente e a data e hora</h1>
            <button type="button" className={`btn-close`} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {console.log(dentista)}
            <ScheduleForm dados={dentista}/>
          </div>
        </div>
      </div>
    </div >

  );
};

export default ScheduleFormModal;
