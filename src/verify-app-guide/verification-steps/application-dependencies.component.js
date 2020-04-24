import React, { useState, useEffect } from "react";
import CodeOutput from "../../shared/code-output.component";
import { getAppDependencies } from "../../shared/use-app-shared-deps.hook";

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
      setIsExpanded(true);
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
    return getAppDependencies({ name: app.name })
      .then((appSharedDeps) => {
        setSharedDependencies(appSharedDeps);
        const missingDeps = getMissingDeps(appSharedDeps);
        if (missingDeps.length > 0) {
          setMissingDeps(missingDeps);
          throw new Error("Missing shared dependencies");
        }

        toggleExpanded();
      })
      .catch((err) => {
        setError(err);
        console.error(err);
        throw err;
      });
  }
});

export const getPlaygroundDeps = () => {
  const playgroundImportmap = document.getElementById("playground-import-map");
  const importmapOverrides = document.getElementById("import-map-overrides");
  let importMapOverridesDeps;
  try {
    importMapOverridesDeps = JSON.parse(importmapOverrides.textContent).imports;
  } catch (e) {
    // do nothing
  }

  const playgroundSharedDep = JSON.parse(playgroundImportmap.textContent)
    .imports;

  return {
    importMapOverridesDeps,
    playgroundSharedDep,
  };
};

const getMissingDeps = (sharedDependencies) => {
  const { importMapOverridesDeps, playgroundSharedDep } = getPlaygroundDeps();
  const missingDeps = sharedDependencies.reduce(
    (acc, sharedDep) =>
      Object.keys(playgroundSharedDep).includes(sharedDep) ||
      Object.keys(importMapOverridesDeps).includes(sharedDep)
        ? acc
        : acc.concat(sharedDep),
    []
  );

  return missingDeps;
};
