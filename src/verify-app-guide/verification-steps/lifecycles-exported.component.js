import React, { useState } from "react";
import CodeOutput from "../../shared/code-output.component";
import { importApp } from "./import-app";

export default React.forwardRef(function LifecycleExports(props, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  if (ref) {
    ref.current = {
      runTest() {
        /* global System */
        return importApp(props.app)
          .then((mod) => {
            if (
              typeof mod.bootstrap !== "function" ||
              typeof mod.mount !== "function" ||
              typeof mod.unmount !== "function"
            ) {
              console.info(
                `SystemJS module for application '${props.app.name}':`,
                mod
              );
              throw Error(
                `Application '${props.app.name}' does not correctly export bootstrap, mount, and unmount lifecycles into SystemJS. See browser console for details.`
              );
            }
          })
          .catch((err) => {
            setError(err);
            throw err;
          });
      },
      resetError() {
        setError(null);
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
        <div className="step-number">{props.stepNumber}</div>
        <div className="step-summary">
          Single-spa lifecycle methods correctly exported (bootstrap, mount, and
          unmount)
        </div>
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
