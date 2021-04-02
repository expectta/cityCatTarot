import React from "react";
import { render } from "react-dom";
import Slider from "react-slick";
import styled from "styled-components";
const Container = styled.div`
  overflow: hidden;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const ImageContainer = styled.div`
  margin: 0 16px;
`;

const Image = styled.img`
  // max-width: 100%;
  // max-height: 100%;
`;
const items = [
  { id: 1, url: "./temp.png" },
  { id: 2, url: "./temp.png" },
  { id: 3, url: "./temp.png" },
];
export default function Slide() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
  };

  return (
    <Container>
      <h2> Single Item</h2>
      <StyledSlider {...settings}>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <ImageContainer>
                <Image src={item.url} />
              </ImageContainer>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
}
