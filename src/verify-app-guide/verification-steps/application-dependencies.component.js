import React, { useState, useEffect } from "react";
import CodeOutput from "../../shared/code-output.component";

export default React.forwardRef(function ApplicationDependencies(
  { app, stepNumber },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);
  const [sharedDependencies, setSharedDependencies] = useState([]);
  const [missingDeps, setMissingDeps] = useState([]);

  if (ref) {
    ref.current = {
      runTest,
      resetError() {
        setError(false);
      },
    };
  }

  useEffect(() => {
    if (missingDeps.length > 0) {
      setError(true);
    }
  }, [missingDeps]);

  return (
    <div className="step">
      <div
        role="button"
        tabIndex={0}
        className="step-header"
        onClick={toggleExpanded}
      >
        <div className="step-number">{stepNumber}</div>
        <div className="step-summary">
          Checking if application has shared dependencies
        </div>
      </div>
      {isExpanded && (
        <div className="step-detail">
          {sharedDependencies && (
            <>
              <div>Your app has the following shared dependencies:</div>
              <CodeOutput code={sharedDependencies} />
            </>
          )}
          {error && missingDeps.length > 0 ? (
            <>
              <div>Found missing dependencies:</div>
              <CodeOutput code={missingDeps} />
              <div>
                Add them to the playground (using import-map-overrides on
                bottom-right corner) to continue, otherwise, an error will be
                thrown in the next step!
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );

  function toggleExpanded() {
    setIsExpanded(!isExpanded);
  }

  function runTest() {
    return fetch(window.importMapOverrides.getOverrideMap().imports[app.name])
      .then((resp) => resp.text())
      .then((jsBundleStringified) => {
        const matchFirstArgumentArray = /^System\.register\((\[.+?\])/;
        const match = jsBundleStringified.match(matchFirstArgumentArray);
        if (match) {
          const sharedDependenciesFromSystemjsBundle = JSON.parse(match[1]);
          if (Array.isArray(sharedDependenciesFromSystemjsBundle)) {
            setSharedDependencies(sharedDependenciesFromSystemjsBundle);
            const missingDeps = getMissingDeps(
              sharedDependenciesFromSystemjsBundle
            );
            if (missingDeps.length > 0) {
              setMissingDeps(missingDeps);
              throw new Error("Missing shared dependencies");
            }

            toggleExpanded();
          }
        }
      })
      .catch((err) => {
        setError(err);
        throw err;
      });
  }
});

const getMissingDeps = (sharedDependencies) => {
  const playgroundImportmap = document.getElementById("playground-import-map");
  const playgroundSharedDep = Object.keys(
    JSON.parse(playgroundImportmap.textContent).imports
  );
  const missingDeps = sharedDependencies.reduce(
    (acc, sharedDep) =>
      playgroundSharedDep.includes(sharedDep) ? acc : acc.concat(sharedDep),
    []
  );

  return missingDeps;
};
