import React, { useContext, useEffect, useRef, useState } from "react";
import PageHeader from "../shared/page-header.component";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";
import { Redirect, Link } from "react-router-dom";
import { useCss } from "kremling";
import RegisteredApp from "../registered-apps/registered-app.component";
import { navigateToUrl } from "single-spa";
import VerificationSteps from "./verification-steps.component";
import EditApplication from "../registered-apps/edit-application.component";

export default function TestApp(props) {
  const { application, addApplication, updateApplication } = useContext(
    LocalStorageContext
  );

  const scope = useCss(css);

  const [showVerificationSteps, setShowVerificationSteps] = useState(false);
  const [showRegisterApp, setShowRegisterApp] = useState(false);
  const [isEditingApp, setIsEditingApp] = useState(false);

  return (
    <>
      <PageHeader title="Validate single-spa application" />
      <article className="card" {...scope}>
        <section>
          If you came from the redirect from create-single-spa, your app should
          be already registered in this playground! But you can always register
          another one, so you can validate any single-spa application.
        </section>
        {application && (
          <>
            <section>
              This configuration example, is what make it possible to run your
              local single-spa application in this playground:
            </section>
            <section>
              <RegisteredApp app={application} edit={edit} interactive />
            </section>

            {isEditingApp && (
              <section>
                <EditApplication
                  app={isEditingApp ? application : null}
                  cancel={() => setIsEditingApp(false)}
                  updateApp={updateApp}
                />
              </section>
            )}
            <section>
              You can also verify if your application is working by{" "}
              <a
                target="_blank"
                href={application.pathPrefix}
                href={application.pathPrefix}
                onClick={navigateToUrl}
              >
                {" "}
                using the playground
              </a>
              . This will let you see your application working inside of this
              browser tab. The single-spa playground will disappear, and your
              code will take over. To comeback, just click the single-spa logo!
            </section>
          </>
        )}
        <section>
          Got stuck? you can always hit us in our{" "}
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
          <div style={{ margin: "16px 0" }}>
            {!application && (
              <button
                className="secondary"
                type="button"
                onClick={() => setShowRegisterApp(true)}
              >
                {`Register app`}
              </button>
            )}
          </div>
        </section>
        {showRegisterApp && (
          <EditApplication
            addApp={addAndClose}
            cancel={() => setShowRegisterApp(false)}
            updateApp={updateApp}
          />
        )}

        {application && (
          <>
            <section>
              Now, lets verify if your application is ready to go! If you came
              from create-single-spa, this should work out-of-the-box, but you
              can always come back when you customized and evolved you
              single-spa application to check if it still conforms to single-spa
              API
            </section>
            <section>
              <button
                className="primary"
                type="button"
                onClick={() => {
                  setShowVerificationSteps(true);
                  setShowRegisterApp(false);
                }}
              >
                {`Verify "${application.name}"`}
              </button>
            </section>

            {showVerificationSteps && <VerificationSteps app={application} />}

            <section>
              Once you've verified things are working as expected, proceed to
              the next step.
            </section>
            <section>
              <Link to="/root-config" className="primary button">
                Next step: root-config
              </Link>
            </section>
          </>
        )}
      </article>
    </>
  );

  function edit(app) {
    setIsEditingApp(true);
  }

  function updateApp(app, url, oldName) {
    updateApplication(app);
    const oldUrl = window.importMapOverrides.getOverrideMap().imports[app.name];
    if (oldUrl !== url) {
      window.importMapOverrides.removeOverride(oldName);
      window.importMapOverrides.addOverride(app.name, url);
      // Changes to the import map require a page reload
      window.location.reload();
    }
    setIsEditingApp(false);
  }

  function addAndClose(app, url) {
    window.importMapOverrides.addOverride(app.name, url);
    app.url = url;
    addApplication(app);
    // window.location.reload();
    setShowRegisterApp(false);
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
