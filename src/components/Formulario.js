import React,{useState} from 'react'
import styled from '@emotion/styled';
//helpers
import {obtenerDiferenciaYear, calcularMarca, obtenerPlan} from '../helper';
import PropTypes from 'prop-types';
const Campo = styled.div`
    display:flex;
    margin-bottom: 1rem;
    align-items:center;
`;

const Label = styled.label`
    flex:0 0 100px;
`;

const Select = styled.select`
    display:block;
    width:100%;
    padding:1rem;
    border:1px solid #e1e1e1;
    --webkit-appearance:none;
`;

const Radio = styled.input`
    margin: 0 1rem;
`;

const Error = styled.div`
    background-color: red;
    color: #fff;
    padding:1rem;
    width:100%;
    text-align:center;
    margin-bottom: 2rem;
`;

const Button = styled.button`
    background-color:#00838f;
    font-size: 16px;
    width:100%;
    padding:1rem;
    color: #fff;
    text-transform:uppercase;
    font-weight:bold;
    border:none;
    transition:background-color .3s ease;
    margin-top:2rem;
    &:hover{
        cursor: pointer;
        background-color:#26c6da;
    }
`;

function Formulario({guardarResumen, guardarCargando}) {

    const [datos, guardarDatos] = useState({
        marca:'',
        year:'',
        plan:''
    });
    //destructuramos el objeto datos;
    const {marca,year,plan} = datos;

    const [error, guardarError] = useState(false);

    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = (e) => {
        e.preventDefault();
        if(marca.trim() === '' || year.trim() === '' || plan.trim() === ''){
            guardarError(true)
            return;
        }
        guardarError(false);
        let resultado = 2000; //base monetaria sera de 2000$ 

        //obtener diferencia de años
        const diferecia = obtenerDiferenciaYear(year);
        // por cada año restar 3%
        resultado -= ((diferecia*3) *resultado) /100;

        //americano 15% | asiatico 5% | europeo 30% 
        resultado = calcularMarca(marca) *resultado;

        // basico aumenta 20% | completo 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan*resultado).toFixed(2);

        guardarCargando(true); //se muestra el spinner
        setTimeout(() => {
            //despues de 3s se oculta y muestra el resumen
            guardarCargando(false);
            guardarResumen({
                cotizacion: Number(resultado),
                datos
            })
        },3000)
        
    }

    return (
        <div className="center">
            <form onSubmit={cotizarSeguro}>

                {error ? <Error>Todos los campos son requeridos </Error>:''}
                <Campo>
                    <Label htmlFor="">Marca</Label>
                    <Select
                        name='marca'
                        value={marca}
                        onChange={obtenerInformacion}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="americano">Americano</option>
                        <option value="europeo">Europeo</option>
                        <option value="asiatico">Asiatico</option>
                    </Select>
                </Campo>

                <Campo>
                    <Label htmlFor="">Año</Label>
                    <Select
                        name='year'
                        value={year}
                        onChange={obtenerInformacion}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                    </Select>
                </Campo>

                <Campo>
                    <Label htmlFor="">Plan</Label>
                    <Radio type="radio" 
                        name="plan" 
                        value="basico" 
                        checked={plan==='basico'}
                        onChange={obtenerInformacion}
                    /> Basico

                    <Radio type="radio" 
                        name="plan" 
                        value="completo" 
                        checked={plan==='completo'}
                        onChange={obtenerInformacion}
                    /> Completo
                </Campo>

                <Button type="submit">
                    Cotizar
                </Button>
            </form>
        </div>
    )
}

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired,
}

export default Formulario


