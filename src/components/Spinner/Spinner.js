import React from "react";
import loading from "../../components/Images/loading.gif";
import styles from "styled-components";

const Center = styles.div`
text-align: center;
padding: 20px;
`

function Spinner() {
  return (
    <Center>
      <img src={loading} alt="loading" />
    </Center>
  );
}

export default Spinner;
