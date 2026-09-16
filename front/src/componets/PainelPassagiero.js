import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: min(100%, 480px);
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
  color: #fff;
  border-radius: 16px;
  padding: 28px 24px;
  box-shadow: 0px 10px 24px rgba(30, 58, 138, 0.35);
  margin: 20px auto;

  @media (max-width: 480px) {
    padding: 22px 18px;
  }
`;

const Saudacao = styled.p`
  margin: 0 0 4px;
  font-size: 0.9rem;
  opacity: 0.85;
`;

const Nome = styled.h2`
  margin: 0 0 20px;
  font-size: 1.5rem;
`;

const Linha = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);

  &:last-of-type {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-size: 0.85rem;
  opacity: 0.85;
`;

const Valor = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
`;

const BarraFundo = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  margin-top: 18px;
  overflow: hidden;
`;

const BarraProgresso = styled.div`
  height: 100%;
  background: #22c55e;
  border-radius: 6px;
  transition: width 0.4s ease;
  width: ${({ pct }) => pct}%;
`;

const LegendaProgresso = styled.p`
  margin: 8px 0 0;
  font-size: 0.8rem;
  text-align: right;
  opacity: 0.85;
`;

const formatarMoeda = (valor) => {
    const numero = Number(valor) || 0;
    return numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const PainelPassageiro = ({ passageiro }) => {
    if (!passageiro) {
        return (
            <Card>
                <Saudacao>Carregando seus dados...</Saudacao>
            </Card>
        );
    }

    const totalParcelas = Number(passageiro.NumeroParcelas) || 0;
    const parcelasRestantes = Number(passageiro.parcelas_restantes) || 0;
    const parcelasPagas = Math.max(totalParcelas - parcelasRestantes, 0);
    const pct = totalParcelas > 0 ? Math.min((parcelasPagas / totalParcelas) * 100, 100) : 0;

    return (
        <Card>
            <Saudacao>Sua situação de pagamento</Saudacao>
            <Nome>{passageiro.NOME}</Nome>

            <Linha>
                <Label>Valor já pago</Label>
                <Valor>{formatarMoeda(passageiro.Valor_pago)}</Valor>
            </Linha>

            <Linha>
                <Label>Valor de cada parcela</Label>
                <Valor>{formatarMoeda(passageiro.ValorParcela)}</Valor>
            </Linha>

            <Linha>
                <Label>Parcelas restantes</Label>
                <Valor>{parcelasRestantes} de {totalParcelas}</Valor>
            </Linha>

            <BarraFundo>
                <BarraProgresso pct={pct} />
            </BarraFundo>
            <LegendaProgresso>{pct.toFixed(0)}% das parcelas pagas</LegendaProgresso>
        </Card>
    );
};

export default PainelPassageiro;