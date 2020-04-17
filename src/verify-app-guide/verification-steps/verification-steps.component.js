import React, { useRef, useState, useEffect } from "react";
import ApplicationDownloadable from "./application-downloadable.component";
import ApplicationExecutable from "./application-executable.component";
import LifecyclesExported from "./lifecycles-exported.component";
import MountLifecycle from "./mount-lifecycle.component";
import UnmountLifecycle from "./unmount-lifecycle.component";
import Remounting from "./remounting.component";

const stepComponents = [
  ApplicationDownloadable,
  ApplicationExecutable,
  LifecyclesExported,
  MountLifecycle,
  UnmountLifecycle,
  Remounting,
];

export default function VerificationSteps({ app }) {
  const nextTestRef = useRef(null);
  const [nextTestIndex, setNextTestIndex] = useState(0);
  const [errorIndex, setErrorIndex] = useState(null);
  const [runningTest, setRunningTest] = useState(false);
  const [restartingTests, setRestartingTests] = useState(false);

  useEffect(() => {
    if (runningTest) {
      nextTestRef.current
        .runTest()
        .then(() => {
          setRunningTest(false);
          setNextTestIndex(nextTestIndex + 1);
        })
        .catch((err) => {
          setRunningTest(false);
          setErrorIndex(nextTestIndex);
        });
    }
  }, [runningTest, nextTestIndex]);

  useEffect(() => {
    if (restartingTests) {
      const timeoutId = setTimeout(() => {
        setRestartingTests(false);
        setRunningTest(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [restartingTests]);

  return (
    <>
      <section>
        Download url:{" "}
        <a
          href={window.importMapOverrides.getOverrideMap().imports[app.name]}
          target="_blank"
        >
          {window.importMapOverrides.getOverrideMap().imports[app.name]}
        </a>
      </section>
      <section>
        {nextTestIndex >= stepComponents.length ? (
          <div className="congrats">
            {"\u2713 Congrats! Your application is working!"}
          </div>
        ) : (
          <button
            className="primary"
            type="button"
            onClick={doTest}
            style={{ visibility: restartingTests ? "hidden" : "visible" }}
          >
            {buttonText()}
          </button>
        )}
      </section>
      <section>
        {stepComponents.map((Step, index) => (
          <div className={getStepStatusClass(index)} key={index}>
            <Step
              app={app}
              stepNumber={index}
              ref={index === nextTestIndex ? nextTestRef : null}
            />
            {index < stepComponents.length - 1 && (
              <div className="between-steps"></div>
            )}
          </div>
        ))}
      </section>
    </>
  );

  function getStepStatusClass(stepIndex) {
    if (stepIndex < nextTestIndex) {
      return "completed";
    } else if (stepIndex === nextTestIndex) {
      if (stepIndex === errorIndex) {
        return "error";
      } else {
        return "next";
      }
    } else {
      if (typeof errorIndex === "number") {
        return "error-before-step";
      } else {
        return "queued";
      }
    }
  }

  function buttonText() {
    if (errorIndex !== null) {
      return "Restart test";
    } else if (nextTestIndex === 0) {
      return "Start test";
    } else {
      return "Continue test";
    }
  }

  function doTest() {
    if (errorIndex !== null) {
      nextTestRef.current.resetError();
      setErrorIndex(null);
      setNextTestIndex(0);
      setRestartingTests(true);
    } else {
      setRunningTest(true);
    }
  }
}
