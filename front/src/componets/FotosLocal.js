import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  width: min(100%, 900px);
  max-width: 900px;
  background-color: #ffffff;
  padding: 25px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  margin: 20px auto;
  text-align: center;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const Title = styled.h2`
  color: #222;
  margin-bottom: 4px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #777;
  margin: 0 0 20px;
  font-size: 0.9rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 16px;
`;

const Card = styled.button`
  position: relative;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  display: block;
`;

const Legenda = styled.span`
  display: block;
  padding: 8px 6px;
  font-size: 0.85rem;
  color: #444;
  background: #fafafa;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
  cursor: zoom-out;
`;

const ImagemAmpliada = styled.img`
  max-width: min(100%, 900px);
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
`;

const LegendaAmpliada = styled.p`
  color: #fff;
  margin-top: 14px;
  font-size: 1rem;
  text-align: center;
`;

const FotosLocal = () => {
    // Cada foto tem uma legenda pra deixar a galeria mais organizada.
    // Troque as URLs pelas fotos reais da viagem quando tiver.
    const fotos = [
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Cvks-MCWGPJdE4i9hdjeMmK9CgELP_iNC6nZcnQOhg&s=10", legenda: "Vista do destino" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nhpyKyovkqOAzhoUvaMeOAIOP5EMU38BggBbeohPMA&s=10", legenda: "Hospedagem" },
        { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNP-xO9R5QxGlC5ECV6t3iWRRJcp_-VN1RgWZpgJtpBQ&s=10", legenda: "Passeio programado" },
    ];

    const [fotoSelecionada, setFotoSelecionada] = useState(null);

    return (
        <GalleryContainer>
            <Title>Fotos da Viagem</Title>
            <Subtitle>Clique em uma foto para ampliar</Subtitle>

            <ImageGrid>
                {fotos.map((foto, index) => (
                    <Card key={index} onClick={() => setFotoSelecionada(foto)}>
                        <Image src={foto.src} alt={foto.legenda} />
                        <Legenda>{foto.legenda}</Legenda>
                    </Card>
                ))}
            </ImageGrid>

            {fotoSelecionada && (
                <Overlay onClick={() => setFotoSelecionada(null)}>
                    <ImagemAmpliada src={fotoSelecionada.src} alt={fotoSelecionada.legenda} />
                    <LegendaAmpliada>{fotoSelecionada.legenda}</LegendaAmpliada>
                </Overlay>
            )}
        </GalleryContainer>
    );
};

export default FotosLocal;