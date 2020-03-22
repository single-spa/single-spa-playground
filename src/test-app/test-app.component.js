import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../shared/page-header.component";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";
import { Redirect, Link } from "react-router-dom";
import { useCss } from "kremling";
import ApplicationDownloadable from "./application-downloadable.component";
import ApplicationExecutable from "./application-executable.component";
import LifecyclesExported from "./lifecycles-exported.component";
import MountLifecycle from "./mount-lifecycle.component";
import UnmountLifecycle from "./unmount-lifecycle.component";
import Remounting from "./remounting.component";
import RegisteredApp from "../registered-apps/registered-app.component";
import { navigateToUrl } from "single-spa";

const stepComponents = [
  ApplicationDownloadable,
  ApplicationExecutable,
  LifecyclesExported,
  MountLifecycle,
  UnmountLifecycle,
  Remounting,
];

export default function TestApp(props) {
  const { applications } = useContext(LocalStorageContext);
  const app = applications.find(
    (a) => a.name === decodeURIComponent(props.match.params.appName)
  );
  const scope = useCss(css);
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
      {!app && <Redirect to="/registered-apps" />}
      <PageHeader title={`Application: ${app.name}`} />
      <article className="card" {...scope}>
        <section>
          Let's get {app.name} working. If you get stuck, feel free to ask a
          question in our{" "}
          <a
            target="_blank"
            href="https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ"
          >
            single-spa slack workspace
          </a>{" "}
          or{" "}
          <a
            target="_blank"
            href="https://github.com/single-spa/single-spa-playground/issues"
          >
            file a github issue
          </a>
        </section>
        <section>
          <RegisteredApp app={app} interactive={false} />
        </section>
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
        <section>
          You can also verify if your application is working by navigating this
          browser tab to the url that it is in charge of. This will let you see
          your application working inside of this browser tab. The single-spa
          playground will disappear, and your code will take over.
        </section>
        <section>
          To do this, click on the navigate to application link. You can come
          back to the playground by clicking on the blue single-spa logo that
          will appear in the bottom right of your screen. Once you've verified
          things are working as expected, proceed to the next step.
        </section>
        <section>
          <a
            className="secondary button"
            href={app.pathPrefix}
            onClick={navigateToUrl}
          >
            Navigate to application
          </a>
          <Link to="/html-file" className="primary button">
            Next step: HTML file
          </Link>
        </section>
      </article>
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

const css = `
& .step {
}

& .step-header {
  display: flex;
  align-items: center;
  cursor: pointer;
}

& .step-number {
  height: 3.0rem;
  width: 3.0rem;
  border-radius: 50%;
  border: .2rem solid var(--single-spa-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--single-spa-blue);
}

& .step-summary {
  margin-left: 1.6rem;
}

& .step-detail, & .between-steps {
  margin-left: 1.5rem;
  border-left: .2rem solid var(--single-spa-blue);
  padding-left: 3.2rem;
}

& .step-detail {
  padding-top: 1.6rem;
}

& .between-steps {
  height: 3.2rem;
}

& .error .step-number {
  border: .2rem solid red;
  background-color: red;
  color: white;
}

& .error .step-detail, & .error .between-steps, & .error-before-step .step-detail, & .error-before-step .between-steps {
  border-left: .2rem solid red;
}

& .error-before-step .step-number {
  border: .2rem solid red;
  color: red;
}

& .completed .step-number {
  background-color: var(--single-spa-blue);
  color: white;
}

& .congrats {
  height: 3.8rem;
  display: flex;
  align-items: center;
}
`;
