import React from "react";
import { useCss } from "kremling";

export default function CodeOutput(props) {
  const scope = useCss(css);

  const string =
    props.code && props.code.toString ? props.code.toString() : props.code;

  return (
    <samp {...scope} className="styled-code">
      {string}
    </samp>
  );
}

const css = `
& .styled-code {
  background-color: rgb(239, 236, 244);
  padding: 1.6rem;
  line-height: 5.0rem;
}
`;
