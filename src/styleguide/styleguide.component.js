import React from "react";
import { useCss } from "kremling";

export default function Styleguide(props) {
  const scope = useCss(css);

  return <div {...scope}>{props.children}</div>;
}

export const mediaMobile = `@media screen and (max-width: 1000px) and (min-width: 1px)`;
export const mediaDesktop = `@media screen and (min-width: 1000px)`;

const css = `
:root, html {
  --single-spa-blue: #01f;
  --light-gray: #F4F5F8;
  font-size: 10px;
}

body * {
  font-size: 1.6rem;
}

input, select {
  font-size: 1.8rem;
  height: 3.8rem;
  padding: 0 .6rem;
}

& button + button {
  margin-left: 1.6rem;
}

& button, & a.button {
  font-size: 1.8rem;
  border-radius: .6rem;
  padding: 8px 12px;
  border: none;
  text-align: center;
  cursor: pointer;
}

& button:disabled, & a.button:disabled {
  background-color: darkgray !important;
}

& button.primary, & a.button.primary {
  background-color: var(--single-spa-blue);
  color: white;
  transition: background-color .2s;
}

& button.secondary, & a.button.secondary {
  border: 1px solid var(--single-spa-blue);
  color: var(--single-spa-blue);
  transition: background-color .2s;
}


& a.button {
  text-decoration: none;
  color: initial;
  cursor: default;
}

& a.button {
  text-decoration: none;
  color: initial;
  cursor: default;
}

& button.primary:hover, & a.button.primary:hover {
  background-color: #4a5474;
}

& .playground {
  font-family: 'Heebo', sans-serif;
}

& .card {
  background-color: white;
  border-radius: 2px;
  box-shadow: 0 16px 50px -24px #a3a3a3;
  padding: 1.6rem;
}

& .card section:not(:last-child) {
  margin-bottom: 2.4rem;
}

& .actions {
  display: flex;
  justify-content: center;
  margin-top: 1.6rem;
}

& button.link {
  padding: 0;
}
`;
