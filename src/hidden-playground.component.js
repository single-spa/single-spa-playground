import React from "react";
import { useCss } from "kremling";
import { navigateToUrl } from "single-spa";

export default function HiddenPlayground(props) {
  const scope = useCss(css);

  return (
    <div className="hidden-playground" {...scope}>
      <a href="/playground" onClick={navigateToUrl} className="link">
        <img
          className="logo"
          src="https://single-spa.js.org/img/logo-white-bgblue.svg"
          alt="single-spa logo"
        />
      </a>
    </div>
  );
}

const css = `
& .hidden-playground {
  z-index: 10000;
  position: fixed;
  bottom: 4px;
  right: 70px;
}

& .link, & .link:focus, & .link:visited {
  text-decoration: none;
  color: initial;
}

& .logo {
  width: 50px;
  height: 50px;
}
`;
