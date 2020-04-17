import React, { useContext, useState } from "react";
import { useCss } from "kremling";
import { Link } from "react-router-dom";
import createSingleSpaCli from "./create-single-spa-cli.gif";
import Code from "../shared/code.component";
import PageHeader from "../shared/page-header.component";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";
import { RegisterAppDocLink } from "../shared/links.component";

export default function RegisteredApps(props) {
  const { applications, addApplication, updateApplication } = useContext(
    LocalStorageContext
  );

  const scope = useCss(css);

  return (
    <>
      <PageHeader title="single-spa applications" />
      <article className="card" {...scope}>
        <section>
          A{" "}
          <a href="https://single-spa.js.org/docs/building-applications.html">
            single-spa-application
          </a>{" "}
          is everything a normal SPA is, but it doesn't have to attach itself in
          the DOM as single-spa will handle this for you! You just need to{" "}
          <RegisterAppDocLink>
            register your applications with single-spa
          </RegisterAppDocLink>{" "}
          so that single-spa can make sure the right one is active for any
          particular url, but we'll talk more about this later.
        </section>
        <h3>Creating your first single-spa application</h3>
        <section>
          You can do this from scratch, but we highly recommend you to start
          from our{" "}
          <a href="https://single-spa.js.org/docs/create-single-spa">
            create-single-spa
          </a>{" "}
          CLI to setup your first application!
          <div style={{ textAlign: "center" }}>
            <img
              src={createSingleSpaCli}
              alt="gif explaining how to use CLI"
              style={{ width: 500, margin: 8 }}
            />
          </div>
          <p>
            By itself, your single-spa application cannot be ran on browser. So
            we prepared this playground to support ANY single-spa application!
            How?
          </p>
          <p>Remember the last 2 steps?</p>
          <Code
            code={`
Project setup complete!
Steps to test your React single-spa application:
1. Run 'yarn start --https --port 8500'
2. Go to https://single-spa-playground.org/playground/instant-test?name=@org/app&url=8500 to see it working!
          `}
          />
          <CollapsableContent title="The first was to start your webpack-dev-server using https">
            <>
              <h3>Do I need https?</h3>
            </>
            <p>
              No, not at all! The only reason we ask you to run https is so that
              this playground (which is also on https) can download your assets
              being served by your webpack-dev-server! If you don't start it on
              --https, sadly, the security will kick in and block the asset
              download. When running both root-config and applications in your
              localhost, you don't actually need to run in https!
            </p>
          </CollapsableContent>
          The second is a redirect to this playground, so we can bootstrap your
          single-spa application for you! And there it is! You have a single-spa
          application, being served by your localhost, and being run in a
          deployed application!
          <p>Welcome to the microfrontend era!</p>
          <p>
            Before we guide you into making the{" "}
            <a href="https://single-spa.js.org/docs/configuration">
              root-config
            </a>{" "}
            so you can locally bootstrap your application, we will validate your
            brand new single-spa application!
          </p>
          <section className="actions next-step">
            <Link to="/verify-app-guide" className="button primary">
              Next step: Validate single-spa application
            </Link>
          </section>
        </section>
      </article>
    </>
  );
}

const css = `
& .add-application {
  margin-top: 1.6rem;
}

& .call-to-action {
  display: flex;
  justify-content: space-between;
}

& .next-step {
  margin-top: 1.6rem;
}
`;

function CollapsableContent({ title, children }) {
  const [visible, setVisible] = useState(false);
  const scope = useCss(collapseCss);

  return (
    <>
      <p {...scope}>
        {title}{" "}
        <button
          className="toggle link"
          onClick={() => setVisible((visible) => !visible)}
        >
          ({visible ? "hide" : "more"})
        </button>
      </p>
      <blockquote>{visible ? children : null}</blockquote>
    </>
  );
}

const collapseCss = `
  & .toggle {
    cursor: pointer;
    color: var(--single-spa-blue);
    font-size: 1em;
  }

`;
