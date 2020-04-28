import React, { useState } from "react";
import { triggerAppChange, getAppStatus, NOT_MOUNTED } from "single-spa";
import CodeOutput from "../../shared/code-output.component";
import { setShouldMount } from "./mount-lifecycle.component";

export default React.forwardRef(function UnmountLifecycle(
  { app, stepNumber },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(false);

  if (ref) {
    ref.current = {
      runTest() {
        setShouldMount(false);
        window.history.replaceState({}, document.title);
        return triggerAppChange()
          .then(() => {
            const status = getAppStatus(app.name);
            if (status !== NOT_MOUNTED) {
              throw Error(
                `Application '${app.name}' did not unmount correctly. Instead of being in status UNMOUNTED, it is in status ${status}`
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
        <div className="step-number">{stepNumber}</div>
        <div className="step-summary">Unmount lifecycle works correctly</div>
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
