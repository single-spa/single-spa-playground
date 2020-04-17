import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../shared/page-header.component";

export default function Introduction(props) {
  return (
    <>
      <PageHeader title="Single-spa playground" />
      <article className="card">
        <section>
          The single-spa playground is a website that helps you get your code
          working with <a href="https://single-spa.js.org">single-spa</a>. If
          you don't know what single-spa is, check out{" "}
          <a href="https://www.youtube.com/watch?v=L4jqow7NTVg&feature=youtu.be">
            this intro video
          </a>
          .
        </section>
        <section>
          single-spa also has a{" "}
          <a
            href="https://github.com/single-spa/single-spa-inspector"
            target="_blank"
          >
            browser extension
          </a>{" "}
          that hooks into your browser's dev tools. The playground and browser
          extension can work in tandem to help you debug your single-spa
          applications.
        </section>
        <section>
          The playground will guide you to build a successful singe-spa
          application, highlighting important steps and give tools to help you
          understand what went wrong. Mind that this isn't the only way to use
          single-spa, but by better understanding the concepts, you'll be able
          to apply it in any way you like. Here's what we'll do:
          <ol>
            <li>
              Have micro-frontends that are in separate git repos. We will be
              focusing on React, but you could use Angular, Vue, etc
            </li>
            <li>Test if your microfrontend is build up correctly</li>
            <li>
              Understand and create a{" "}
              <a href="https://single-spa.js.org/docs/configuration">
                root config
              </a>
              , which will do the routing of your micro-frontends
            </li>
            <li>Deploy your micro-frontends independently.(coming soon)</li>
          </ol>
        </section>
        <section>
          If you get stuck or have suggestions for improving
          single-spa-playground, consider{" "}
          <a
            target="_blank"
            href="https://join.slack.com/t/single-spa/shared_invite/enQtODAwNTIyMzc4OTE1LWUxMTUwY2M1MTY0ZGMzOTUzMGNkMzI1NzRiYzYwOWM1MTEzZDM1NDAyNWM3ZmViOTAzZThkMDcwMWZmNTFmMWQ"
          >
            joining our slack workspace
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://github.com/single-spa/single-spa-playground/pulls"
          >
            opening a pull request
          </a>
          , or{" "}
          <a
            target="_blank"
            href="https://github.com/single-spa/single-spa-playground/issues"
          >
            filing an issue.
          </a>
        </section>
        <section className="actions">
          <Link className="primary button" to="/applications-guide">
            Get started
          </Link>
        </section>
      </article>
    </>
  );
}
