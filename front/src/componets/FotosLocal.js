import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  width: min(100%, 900px);
  max-width: 900px;
  background-color: #ffffff;
  padding: 25px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  margin: 20px auto;
  text-align: center;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
  font-weight: 500;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 15px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 3;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  /* Efeito de zoom ao passar o mouse */
  &:hover {
    transform: scale(1.05);
  }
`;

const FotosLocal = () => {
    // Array com os links das fotos. 
    // Você pode colocar URLs da internet ou importar arquivos locais da sua pasta src.
    const fotos = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Cvks-MCWGPJdE4i9hdjeMmK9CgELP_iNC6nZcnQOhg&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nhpyKyovkqOAzhoUvaMeOAIOP5EMU38BggBbeohPMA&s=10",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNP-xO9R5QxGlC5ECV6t3iWRRJcp_-VN1RgWZpgJtpBQ&s=10"
    ];

    return (
        <GalleryContainer>
            <Title>Fotos do Local</Title>
            <ImageGrid>
                {fotos.map((foto, index) => (
                    <Image key={index} src={foto} alt={`Foto do local ${index + 1}`} />
                ))}
            </ImageGrid>
        </GalleryContainer>
    );
};

export default FotosLocal;