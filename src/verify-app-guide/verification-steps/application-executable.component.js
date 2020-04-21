import React, { useState } from "react";
import CodeOutput from "../../shared/code-output.component";

export default React.forwardRef(function ApplicationExecutable(props, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [
    systemJsWebpackInteropErrorModuleName,
    setSystemJsWebpackInteropErrorModuleName,
  ] = useState(false);

  if (ref) {
    ref.current = {
      runTest() {
        /* global System */
        return System.import(props.app.name).catch((err) => {
          console.error(err);
          setError(err);
          if (err.message.match(/systemjs-webpack-interop/)) {
            const moduleName = err.message.match(/no such module \'(.+?)\'/);
            setSystemJsWebpackInteropErrorModuleName(
              moduleName && moduleName[1]
            );
          }
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
          Application code executes without a javascript error
        </div>
      </div>
      {(isExpanded || error) && (
        <div className="step-detail">
          <CodeOutput code={error} />
          {systemJsWebpackInteropErrorModuleName && (
            <div>
              Your app name in the playground, does not match with the name
              declared in your application! Try editing your app's name, in the
              playground, to be: <b>{systemJsWebpackInteropErrorModuleName}</b>
            </div>
          )}
        </div>
      )}
    </div>
  );

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }
});
