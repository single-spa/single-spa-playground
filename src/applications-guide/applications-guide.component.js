import React from "react";
import { useCss } from "kremling";
import { Link } from "react-router-dom";
import createSingleSpaCli from "./create-single-spa-cli.gif";
import Code from "../shared/code.component";
import PageHeader from "../shared/page-header.component";

export default function RegisteredApps() {
  const scope = useCss(css);

  return (
    <>
      <PageHeader title="single-spa applications" />
      <article className="card" {...scope}>
        <section>
          A{" "}
          <a href="https://single-spa.js.org/docs/building-applications.html">
            single-spa application
          </a>{" "}
          is everything a normal SPA is, except it must share a single HTML file
          with other applications
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
            Since single-spa applications do not have their own HTML files, they
            cannot be run as standalone apps. Instead, they produce javascript
            and css that can be dynamically injected into an HTML file. This
            playground allows you to dynamically inject your javascript and css
            into it so that you can test out your application! How?
          </p>
          <p>Remember the last 2 steps?</p>
          <Code
            code={`
Project setup complete!
Steps to test your React single-spa application:
1. Run 'yarn start --port 8500'
2. Go to https://single-spa-playground.org/playground/instant-test?name=@org/app&url=8500 to see it working!
          `}
          />
          <p>The first was to start your webpack-dev-server</p>
          <p>
            The second is a redirect to this playground, so we can bootstrap
            your single-spa application for you! And there it is! You have a
            single-spa application, being served by your localhost, and being
            run in a deployed application!
          </p>
          <p>Welcome to the microfrontend era!</p>
          <p>
            Before we guide you into making the{" "}
            <a
              href="https://single-spa.js.org/docs/configuration"
              target="_blank"
              rel="noopener"
            >
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
