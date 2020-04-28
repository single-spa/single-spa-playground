import React from "react";
import { useCss } from "kremling";

export default function Code(props) {
  const scope = useCss(css);

  return (
    <pre {...scope} className="styled-code">
      <code>{props.code.trim()}</code>
    </pre>
  );
}

const css = `
& pre {
  white-space: pre-wrap;
  word-break: break-word;
}

& pre, & code {
  margin: 0;
  padding: 0;
}

& .styled-code {
  background-color: rgb(239, 236, 244);
  padding: 1.6rem;
}
`;
