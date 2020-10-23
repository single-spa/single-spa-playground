import React, { forwardRef, useState } from "react";
import { registerApplication } from "single-spa";
import CodeOutput from "../../shared/code-output.component";
import { importApp } from "./import-app";

export default forwardRef(function ViewApplication({ app, stepNumber }, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  if (ref) {
    ref.current = {
      runTest() {
        return window.__SINGLE_SPA_DEVTOOLS__.exposedMethods
          .unregisterApplication(app.name)
          .then(() => {
            /* global System */
            registerApplication(
              app.name,
              () => importApp(app),
              (location) => location.pathname.startsWith(app.pathPrefix)
            );
            window.history.pushState({}, document.title, app.pathPrefix);
          })
          .catch((err) => {
            setError(err);
            throw err;
          });
      },
      resetError() {
        setError(false);
        window.history.replaceState({}, document.title);
        window.__SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
          app.name
        );
      },
    };
  }

  return (
    <div className="step">
      <div
        role="button"
        tabIndex={0}
        className="step-header"
        onClick={toggleExpanded}
      >
        <div className="step-number">{stepNumber}</div>
        <div className="step-summary">View the application</div>
      </div>
      {(isExpanded || error) && (
        <div className="step-detail">
          <CodeOutput code={error} />
        </div>
      )}
    </div>
  );

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
});
