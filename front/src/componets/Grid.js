import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../api";
import {toast} from "react-toastify";

const TableWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
    overflow-x: auto;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        overflow-x: visible;
        box-shadow: none;
        margin: 12px auto;
    }
`;

const Table = styled.table`
    width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
  border-collapse: collapse;

    @media (max-width: 768px) {
        display: block;
        background: transparent;
    }
`;

const Thead = styled.thead`
    @media (max-width: 768px) {
        display: none;
    }
`;

const Thbody = styled.tbody`
    @media (max-width: 768px) {
        display: grid;
        gap: 12px;
    }
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
        display: flex;
        justify-content: space-between;
        gap: 16px;
        padding: 8px 0;
        text-align: right;
        border-bottom: 1px solid #f0f0f0;

        &::before {
            content: attr(data-label);
            color: #666;
            font-weight: 600;
            text-align: left;
        }
  }
`;

const TableRow = styled.tr`
    @media (max-width: 768px) {
        display: block;
        padding: 12px 14px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    }
`;
const Grid = ({ passageiros, setPassageiros, setOnEdit, usuarioAtual }) => {
    const isAdmin = usuarioAtual?.perfil === 'admin';

    const handleDelete = async (CPF) => {
        try {
            // Enviando o perfil no cabeçalho (Header) da requisição
           const config = { headers: { 'Authorization': `Bearer ${usuarioAtual.token}` } };
           await api.delete(`/passageiros/${CPF}`, config)
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
                <TableWrapper>
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
                                <TableData data-label="Nome">{item.NOME}</TableData>
                                <TableData data-label="CPF">{item.CPF}</TableData>
                                <TableData data-label="Valor pago">{item.Valor_pago}</TableData>
                                <TableData data-label="Parcelas restantes">{item.parcelas_restantes}</TableData>
                                <TableData data-label="Número de parcelas">{item.NumeroParcelas}</TableData>
                                <TableData data-label="Valor da parcela">{item.ValorParcela}</TableData>

                        {isAdmin && (
                            <>
                                          <TableData data-label="Editar">
                                   <FaEdit onClick={() => setOnEdit(item)} style={{ cursor: "pointer", color: "blue" }} />
                                </TableData>
                                          <TableData data-label="Excluir">
                                   <FaTrash onClick={() => handleDelete(item.CPF)} style={{ cursor: "pointer", color: "red" }} />
                                </TableData>
                            </>
                        )}
                    </TableRow>
                ))}
            </Thbody>
                    </Table>
                </TableWrapper>
    )
}

export default Grid;