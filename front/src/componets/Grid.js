import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";

const Table = styled.table`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  box-sizing: border-box;
  border-collapse: collapse;

  /* Responsividade para celulares */
  @media (max-width: 768px) {
    display: block; /* Transforma a tabela em um bloco solto */
    overflow-x: auto; /* Permite rolar a tabela para os lados se os dados não couberem */
    white-space: nowrap; /* Garante que os dados não fiquem esmagados */
    width: 95%; /* Dá uma leve margem nas laterais da tela do celular */
  }
`;

const Thead = styled.thead`
`;

const Thbody = styled.tbody`
`;

const TableHeader = styled.th`
  background-color: #ffffff;
  text-align: start;
  border-bottom: 2px solid #eee;
  padding: 15px;
  white-space: nowrap;

  /* Responsividade: Reduz o espaçamento interno no celular */
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TableData = styled.td`
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;

  /* Responsividade: Reduz o espaçamento interno no celular */
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TableRow = styled.tr`
`;
const Grid = ({ passageiros, setPassageiros, setOnEdit, usuarioAtual }) => {
    const isAdmin = usuarioAtual?.perfil === 'admin';

    const handleDelete = async (CPF) => {
        try {
            // Enviando o perfil no cabeçalho (Header) da requisição
            const config = { headers: { 'role': usuarioAtual.perfil } };

            await axios.delete(`http://localhost:3001/passageiros/${CPF}`, config)
            .then(({data}) => {
                const updatedPassageiros = passageiros.filter((item) => item.CPF !== CPF);
                setPassageiros(updatedPassageiros);
                toast.success("Passageiro deletado com sucesso");
            });
        } catch (error) {
            console.error("Error deleting passageiro:", error);
            toast.error(error.response?.data?.erro || "Erro ao deletar passageiro");
        }
    };

    return (
        <Table>
            <Thead>
                <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>CPF</TableHeader>
                    <TableHeader>Valor Pago</TableHeader>
                    <TableHeader>Parcelas Restantes</TableHeader>
                    <TableHeader>Número de Parcelas</TableHeader>
                    <TableHeader>Valor da Parcela</TableHeader>
                        {/* Renderiza as colunas extras apenas se for admin */}
                   
                   
                    {isAdmin && <TableHeader></TableHeader>}
                    {isAdmin && <TableHeader></TableHeader>}
                </TableRow>
            </Thead>

            <Thbody>
                {passageiros.map((item, i) => (
                    <TableRow key={i}>
                        <TableData>{item.NOME}</TableData>
                        <TableData>{item.CPF}</TableData>
                        <TableData>{item.Valor_pago}</TableData>
                        <TableData>{item.parcelas_restantes}</TableData>
                        <TableData>{item.NumeroParcelas}</TableData>
                        <TableData>{item.ValorParcela}</TableData>

                        {isAdmin && (
                            <>
                                <TableData>
                                   <FaEdit onClick={() => setOnEdit(item)} style={{ cursor: "pointer", color: "blue" }} />
                                </TableData>
                                <TableData>
                                   <FaTrash onClick={() => handleDelete(item.CPF)} style={{ cursor: "pointer", color: "red" }} />
                                </TableData>
                            </>
                        )}
                    </TableRow>
                ))}
            </Thbody>
        </Table>
    )
}

export default Grid;