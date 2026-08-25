import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";

const Table = styled.table`
  width: 100%;
  box-sizing: 0px 0px 5px #ffffff;
  padding: 20px;
  margin: 50px;
  background-color: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  max-width: 800px;
  margin-top: 20px auto;
  word-break: break-all;
`
const Thead = styled.thead`
  `

const Thbody = styled.tbody`
  `

const TableHeader = styled.th`
  background-color: #ffffff;
  text-align: start;
  border-bottom: inset;
  padding: 10px;

`
const TableData = styled.td`
  padding: 10px;
`

const TableRow = styled.tr`
       
`
const Grid = ({ passageiros }) => {

    console.log(passageiros)
    return (
        <Table>
            <Thead>
                <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>CPF</TableHeader>
                    <TableHeader>Quantidade</TableHeader>
                </TableRow>
            </Thead>

            <Thbody>
                {passageiros.map((item, i) => (

                    <TableRow key={i}>
                        <TableData>{item.NOME}</TableData>
                        <TableData>{item.CPF}</TableData>
                        <TableData>{item.Valor_pago}</TableData>
                        <TableData>
                            <FaEdit/>
                            </TableData>
                            <TableData>
                            <FaTrash/>
                        </TableData>
                    </TableRow>
                ))}
            </Thbody>
        </Table>
    )
}

export default Grid;