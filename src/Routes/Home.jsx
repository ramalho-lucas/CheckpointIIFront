import { useEffect , useState, useContext} from "react";
import Card from "../Components/Card";
import { Box, Skeleton } from "@mui/material";
import api from "../api"
import { ThemeContext } from "../contexts/theme-context";

const Home = () => {

  const [dentista, setDentista] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme} = useContext(ThemeContext);

  async function getDentistas(){
    try {
      const response = await api.get("/dentista");

      console.log(response.data);
      setDentista (response.data);
      setInterval(() => setIsLoaded(true), 2000);
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    //Nesse useEffect, deverá ser obtido todos os dentistas da API
    //Armazena-los em um estado para posteriormente fazer um map
    //Usando o componente <Card />
    getDentistas();
  }, []);

  return (
    <>
    
    <h1>Home</h1>

    <div className="card-grid container">
        {
          !isLoaded ? (
            <Box style={{display:"flex", gap: '10px'}}>
              <Skeleton
                sx={{ bgcolor: `grey.${theme == "dark" ? 800 : 200}` }}
                variant="rounded"
                animation="wave"
                width={308}
                height={420}/>
                <Skeleton
                sx={{ bgcolor: `grey.${theme == "dark" ? 800 : 200}` }}
                variant="rounded"
                animation="wave"
                width={308}
                height={420}/>
                <Skeleton
                sx={{ bgcolor: `grey.${theme == "dark" ? 800 : 200}` }}
                variant="rounded"
                animation="wave"
                width={308}
                height={420}/>
                <Skeleton
                sx={{ bgcolor: `grey.${theme == "dark" ? 800 : 200}` }}
                variant="rounded"
                animation="wave"
                width={308}
                height={420}/>
            </Box>
            ) : dentista.map((d)=>(
          <div key={d.matricula}>
        <Card dados={d} />

          </div>
        ))
        }
        
        
        
      </div>
  </>
  );
};

export default Home;
