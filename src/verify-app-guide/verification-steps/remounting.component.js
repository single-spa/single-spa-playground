import React, { useState, forwardRef } from "react";
import { triggerAppChange, getAppStatus, MOUNTED } from "single-spa";
import CodeOutput from "../../shared/code-output.component";
import { setShouldMount } from "./mount-lifecycle.component";

export default forwardRef(function Remounting({ app, stepNumber }, ref) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  if (ref) {
    ref.current = {
      runTest() {
        setShouldMount(true);
        window.history.replaceState({ mountTestApp: true }, document.title);

        return triggerAppChange()
          .then(() => {
            if (getAppStatus(app.name) !== MOUNTED) {
              throw Error(
                `After attempting to remount the application '${
                  app.name
                }', the app is in ${getAppStatus(
                  app.name
                )} status instead of ${MOUNTED} status`
              );
            }

            window.__SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
              app.name
            );
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
        <div className="step-summary">Remounting the application works</div>
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
