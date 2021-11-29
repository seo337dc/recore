import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
    vertical-align: baseline;
  }
  
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  
  body {
    line-height: 1;
    font-family: "Noto Sans KR", "Chakra Petch", Tahoma, Geneva, sans-serif;
  }
  
  ol,
  ul,
  li {
    list-style: none;
  }
  
  blockquote,
  q {
    quotes: none;
  }
  
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  button {
    margin: 0;
    padding: 0;
  }

  sub,
  sup {
  //font-size: 75%; -- 기존
  font-size: 60%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
  }

  sup {
    //top: -0.5em; -- 기존
    top: -1em;
  }

  sub {
    bottom: -0.25em;
  }
`;

export default GlobalStyle;
