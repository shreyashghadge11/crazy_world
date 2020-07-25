import React from "react";
import { Carousel } from "react-bootstrap";
import howsthejosh from "../../assets/howsthejosh.jpg";
import joggers1 from "../../assets/joggers1.webp";
import slide2 from "../../assets/slide2.jpg";

const SlidesHead = () => {
  const teeslides = {
    height: "90vh",
    width: "70%",
    margin: "0 auto",
  };

  return (
    <Carousel
      style={{
        height: "90vh",
        width: "100%",
        marginTop: "50px",
        color: "black",
      }}
    >
      <Carousel.Item>
        <img
          className="d-block "
          src={howsthejosh}
          alt="First slide"
          style={teeslides}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src={joggers1}
          alt="First slide"
          style={teeslides}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src={slide2}
          alt="First slide"
          style={teeslides}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default SlidesHead;
