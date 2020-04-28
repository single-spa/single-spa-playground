import React, { useState, useEffect } from "react";
import CodeOutput from "../../shared/code-output.component";

export default React.forwardRef(function ApplicationDownloadable(
  { app, stepNumber },
  ref
) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [error, setError] = useState(null);

  if (ref) {
    ref.current = {
      runTest,
      resetError() {
        setError(false);
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
        <div className="step-summary">
          Application can be downloaded at the provided URL.
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

  function runTest() {
    return fetch(window.importMapOverrides.getOverrideMap().imports[app.name])
      .then((resp) => {
        if (resp.ok) {
          const contentType = resp.headers.get("content-type");
          if (!contentType.includes("application/javascript")) {
            throw Error(
              `Could not download app -- server didn't respond with javascript code, but with '${contentType}'`
            );
          }
        } else {
          throw Error(
            `Could not download app -- server responded with status '${resp.status}'`
          );
        }
      })
      .catch((err) => {
        setError(err);
        throw err;
      });
  }
});
