import React from "react";
import { navigateToUrl } from "single-spa";

export const SlackLink = ({ children }) => (
  <a
    target="_blank"
    href="https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ"
  >
    {children}
  </a>
);

export const GithubPlaygroundIssuesLink = ({ children }) => (
  <a
    target="_blank"
    href="https://github.com/single-spa/single-spa-playground/issues"
  >
    {children}
  </a>
);

export const GithubPlaygroundPullsLink = ({ children }) => (
  <a
    target="_blank"
    href="https://github.com/single-spa/single-spa-playground/pulls"
  >
    {children}
  </a>
);

export const PlaygroundRegisteredAppLink = ({ children, app }) => (
  <a target="_blank" href={app.pathPrefix} onClick={navigateToUrl}>
    {children}
  </a>
);

export const ApplicationBundleLink = ({ children, app }) => (
  <a
    href={window.importMapOverrides.getOverrideMap().imports[app.name]}
    target="_blank"
  >
    {children}
  </a>
);

export const RegisterAppDocLink = ({ children }) => (
  <a href="https://single-spa.js.org/docs/api.html#registerapplication">
    {children}
  </a>
);
