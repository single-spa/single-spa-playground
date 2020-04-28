import React, { useContext, useState } from "react";
import PageHeader from "../shared/page-header.component";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";
import { Link } from "react-router-dom";
import RegisteredApp from "../shared/registered-app.component";
import EditRegisteredApp from "../shared/edit-registered-app.component";
import VerificationSteps from "./verification-steps/verification-steps.component";
import {
  PlaygroundRegisteredAppLink,
  SlackLink,
  GithubPlaygroundIssuesLink,
} from "../shared/links.component";

export default function VerifyAppGuide(props) {
  const { application, addApplication, updateApplication } = useContext(
    LocalStorageContext
  );

  const [showVerificationSteps, setShowVerificationSteps] = useState(false);
  const [showRegisterApp, setShowRegisterApp] = useState(false);
  const [isEditingApp, setIsEditingApp] = useState(false);

  return (
    <>
      <PageHeader title="Validate single-spa application" />
      <article className="card">
        <section>
          If you came to single-spa-playground from the instructions in
          create-single-spa, your app should be already registered in this
          playground! But you can always register another one, so you can
          validate any single-spa application.
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
                <EditRegisteredApp
                  app={isEditingApp ? application : null}
                  cancel={() => setIsEditingApp(false)}
                  updateApp={updateApp}
                />
              </section>
            )}
            <section>
              You can also verify if your application is working by{" "}
              <PlaygroundRegisteredAppLink app={application}>
                using the playground
              </PlaygroundRegisteredAppLink>
              . This will let you see your application working inside of this
              browser tab. The single-spa playground will disappear, and your
              code will take over. To comeback, just click the single-spa logo!
            </section>
          </>
        )}
        <section>
          Got stuck? you can always hit us in our{" "}
          <SlackLink>single-spa slack workspace</SlackLink> or{" "}
          <GithubPlaygroundIssuesLink>
            file a github issue
          </GithubPlaygroundIssuesLink>
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
          <EditRegisteredApp
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
              can always come back after making changes to your single-spa
              application to check if it still conforms to single-spa API
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
            <section className="actions next-step">
              <Link to="/root-config-guide" className="primary button">
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
    app.url = url;
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
    window.location.reload();
    setShowRegisterApp(false);
  }
}
