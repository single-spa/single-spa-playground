import React from "react";
import { useCss } from "kremling";

export default function PageHeader(props) {
  const scope = useCss(css);

  return <header {...scope}>{props.title}</header>;
}

const css = `
& header {
  height: 16.0rem;
  background-color: var(--single-spa-blue);
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 2.4rem;
  font-size: 3.2rem;
  font-weight: bold;
  margin-bottom: 1.6rem;
}
`;
