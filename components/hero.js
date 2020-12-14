import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../styles/mainStyles.module.scss";

function Hero() {
  return (
    <div className={styles.heroStyle}>
      <div className={styles.overlay}>
        <div className={styles.containerStyle}>
          <h2>OSHEAGA</h2>
          <h3>Festival Musique et Arts</h3>
        </div>
      </div>
    </div>
  );
}

export default Hero;
