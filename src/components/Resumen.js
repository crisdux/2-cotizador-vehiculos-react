import React,{Fragment} from 'react'
import styled from '@emotion/styled';
import {primeraLetraMayuscula} from '../helper'
import PropTypes from 'prop-types';

const ContenedorResumen = styled.div`
    padding: 1rem;
    text-align: center;
    background-color:#00838f;
    color:#fff;
    margin-top:1rem;
`;
function Resumen({datos}) {
    const {marca,year,plan} = datos;

    if(marca === '' || year === '' || plan === '') return null;

    return (
        <ContenedorResumen>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca:{primeraLetraMayuscula(marca)}</li>
                <li>Año:{year}</li>
                <li>Plan:{primeraLetraMayuscula(plan)}</li>
            </ul>
        </ContenedorResumen>
    )
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired,
}

export default Resumen
