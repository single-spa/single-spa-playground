import React, { useState } from "react";
import {
  registerApplication,
  triggerAppChange,
  getAppStatus,
  MOUNTED,
  getAppNames,
} from "single-spa";
import CodeOutput from "../../shared/code-output.component";
import { importApp } from "./import-app";

export let shouldMount = false;
export const setShouldMount = (val) => (shouldMount = val);

export default React.forwardRef(function MountLifecycle(
  { app, stepNumber },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    shouldMount = true;
  }, []);

  if (ref) {
    ref.current = {
      runTest() {
        if (getAppNames().some((name) => name === app.name)) {
          window.__SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
            app.name
          );
        }
        /* global System */
        registerApplication(
          app.name,
          () => importApp(app),
          () => shouldMount
        );

        window.history.replaceState({ mountTestApp: true }, document.title);

        return triggerAppChange()
          .then(() => {
            if (getAppStatus(app.name) !== MOUNTED) {
              throw Error(
                `After attempting to mount the application '${
                  app.name
                }', the app is in ${getAppStatus(
                  app.name
                )} status instead of ${MOUNTED} status`
              );
            }
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
        <div className="step-summary">Application can mount to the DOM</div>
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
