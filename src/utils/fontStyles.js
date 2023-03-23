import { createGlobalStyle } from "styled-components";
import Jost from "../assets/fonts/Jost/static/Jost-Regular.ttf";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: "Jost";
  src: url(${Jost});
}
`;

export default FontStyles;