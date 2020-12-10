import React,{useEffect,useState} from 'react';
import styled from '@emotion/styled';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer
    }
`;
const Formulario = ({setMoneda,setCriptoMoneda}) => {

    // state listado de crypto
    const [listaCripto, setListaCripto]= useState([]);
    const [error,setError]= useState(false);
    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // ulizar cripto
    const [ criptoMoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

    // ejecutar llamado de api
    useEffect(()=>{
        const consultarAPI= async ()=>{
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();
    },[]);

    // calcular

    const cotizarModena=e =>{
        e.preventDefault();

        // validacion 
        if(moneda==='' || criptoMoneda===''){
            setError(true);
            return;
        }

        setError(false);

        //Pasar datos a componente principal

        setMoneda(moneda);
        setCriptoMoneda(criptoMoneda);
    }
    return ( 
       <form
        onSubmit={cotizarModena}
       >
           {error?<Error mensaje="Los campos son obligatorios"/>: null}
            <SelectMonedas />
            <SelectCripto />
           <Boton
            type="submit"
            value="Calcular"
           />
       </form>
     );
}
 
export default Formulario;