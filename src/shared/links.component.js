import React from "react";
import { navigateToUrl } from "single-spa";

export const SlackLink = ({ children }) => (
  <a
    target="_blank"
    href="https://join.slack.com/t/single-spa/shared_invite/zt-l2iljnpv-pW_o92mMpMR8RWfIOI6pTQ"
    rel="nooopener"
  >
    {children}
  </a>
);

export const GithubPlaygroundIssuesLink = ({ children }) => (
  <a
    target="_blank"
    href="https://github.com/single-spa/single-spa-playground/issues"
    rel="nooopener"
  >
    {children}
  </a>
);

export const GithubPlaygroundPullsLink = ({ children }) => (
  <a
    target="_blank"
    href="https://github.com/single-spa/single-spa-playground/pulls"
    rel="nooopener"
  >
    {children}
  </a>
);

export const PlaygroundRegisteredAppLink = ({ children, app }) => (
  <a
    target="_blank"
    href={app.pathPrefix}
    onClick={navigateToUrl}
    rel="nooopener"
  >
    {children}
  </a>
);

export const ApplicationBundleLink = ({ children, app }) => (
  <a
    href={window.importMapOverrides.getOverrideMap().imports[app.name]}
    target="_blank"
    rel="nooopener"
  >
    {children}
  </a>
);

export const RegisterAppDocLink = ({ children }) => (
  <a
    href="https://single-spa.js.org/docs/api.html#registerapplication"
    target="_blank"
    rel="nooopener"
  >
    {children}
  </a>
);
