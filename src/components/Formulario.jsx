import React, { useState } from 'react';
import styled from '@emotion/styled';
import { obtenerDiferenciaYear, calcularMarca, calcularPlan } from '../helper';
import PropTypes from 'prop-types';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
`;
const InputRadio = styled.input`
    margin: 0 1rem;
`;
const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    width: 100%;
    padding: 1rem;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    border: none;
    transition: background-color 0.3s ease;
    margin-top: 2rem;

    &:hover {
        background-color: #26c6da;
        cursor: pointer;
    }
`;
const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

const Formulario = ({ guardarResumen, guardarCargando }) => {
    const [datos, guardarDatos] = useState({ marca: '', year: '', plan: '' });
    const [error, guardarError] = useState(false);

    // Extraer los valores
    const { marca, year, plan } = datos;

    // Leer los datos de form y mandarlo al state
    const obtenerInformacion = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    };

    // Cuando el usuario haga submit
    const cotizarSeguro = e => {
        e.preventDefault();
        if (marca.trim() === '' || year.trim() === '' || plan.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        // Base
        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        // Por cada año hay que restar el 3%
        resultado -= (diferencia * 3 * resultado) / 100;

        // Americano 15%
        // Asiático 5%
        // Europeo 30%
        resultado = resultado * calcularMarca(marca);

        // Básico aumenta 20 %
        // Completo aumento 50%
        resultado = parseFloat(resultado * calcularPlan(plan)).toFixed(2);

        guardarCargando(true);

        setTimeout(() => {
            guardarCargando(false);

            // Total
            guardarResumen({ cotizacion: Number(resultado), datos });
        }, 1000);
    };

    return (
        <form onSubmit={cotizarSeguro}>
            {error ? <Error>Todos los campos son obligatorios</Error> : null}
            <Campo>
                <Label>Marca</Label>
                <Select name="marca" value={marca} onChange={obtenerInformacion}>
                    <option value="">-- Seleccione --</option>
                    <option value="americano">Americano</option>
                    <option value="europeo">Europeo</option>
                    <option value="asiatico">Asiatico</option>
                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select name="year" value={year} onChange={obtenerInformacion}>
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
                <Label>Plan</Label>
                <InputRadio
                    onChange={obtenerInformacion}
                    type="radio"
                    checked={plan === 'basico'}
                    name="plan"
                    value="basico"
                />
                Básico
                <InputRadio
                    onChange={obtenerInformacion}
                    type="radio"
                    checked={plan === 'completo'}
                    name="plan"
                    value="completo"
                />
                Completo
            </Campo>

            <Boton type="submit">Cotizar</Boton>
        </form>
    );
};

Formulario.propTypes = {
    guardarResumen: PropTypes.func.isRequired,
    guardarCargando: PropTypes.func.isRequired
};

export default Formulario;