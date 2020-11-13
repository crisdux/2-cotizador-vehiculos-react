import React,{useState} from 'react';
import './App.css';
import styled from '@emotion/styled';
//componentes
import Header from './components/Header'
import Formulario from './components/Formulario'
import Resumen from './components/Resumen'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width:600px;
  margin:0;
`;

const ContenedorFormulario = styled.div`
  background-color:#fff;
  padding:3rem;
`;

function App() {

  const [resumen, guardarResumen] = useState({
    cotizacion:0,
    datos:{
      marca:'',
      year:'',
      plan:''
    }
  });

  const [cargando, guardarCargando] = useState(false);

  //extraer datos:
  const {cotizacion,datos} = resumen;

  return (
      <Contenedor>
        <Header titulo="Cotizador de Vehiculos"/>

        <ContenedorFormulario>
          <Formulario guardarResumen={guardarResumen} guardarCargando={guardarCargando}/> 
          { cargando && <Spinner/>}
          <Resumen datos={datos}/>
          {!cargando && <Resultado cotizacion={cotizacion}/>}
        </ContenedorFormulario>
      </Contenedor>
  );
}

export default App;
