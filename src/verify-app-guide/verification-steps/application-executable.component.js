import React, { useState, useEffect, useCallback } from "react";
import CodeOutput from "../../shared/code-output.component";
import singleSpa from "single-spa";
import { importApp } from "./import-app";

export default React.forwardRef(function ApplicationExecutable(props, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [
    systemJsWebpackInteropErrorModuleName,
    setSystemJsWebpackInteropErrorModuleName,
  ] = useState(false);
  const [
    unableToResolveBareSpecifier,
    setUnableToResolveBareSpecifier,
  ] = useState(false);

  const errorHandler = useCallback((error) => {
    const match = error.message.match(
      /Unable to resolve bare specifier \'(.+?)\'/
    );
    if (match) {
      setUnableToResolveBareSpecifier(match[1]);
    }
    setError(error);
  });

  useEffect(() => {
    singleSpa.addErrorHandler(errorHandler);

    return () => {
      singleSpa.removeErrorHandler(errorHandler);
    };
  });

  if (ref) {
    ref.current = {
      runTest() {
        return importApp(props.app).catch((err) => {
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
          {unableToResolveBareSpecifier && (
            <div>
              This probably means your application is trying to System.import('
              {unableToResolveBareSpecifier}') but it's not defined in the
              import map!
            </div>
          )}
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
