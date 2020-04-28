import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../shared/page-header.component";
import {
  SlackLink,
  GithubPlaygroundIssuesLink,
  GithubPlaygroundPullsLink,
} from "../shared/links.component";

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
          The playground will guide you to build a successful single-spa
          application, highlighting important steps, and giving you tools to
          help you understand what went wrong. Mind that this isn't the only way
          to use single-spa, but by better understanding the concepts you'll be
          able to apply it in any way you like. Here's what we'll do:
          <ol>
            <li>
              Have microfrontends that are in separate git repos. We will be
              focusing on React, but you could use Angular, Vue, etc
            </li>
            <li>Test if your microfrontend is built correctly</li>
            <li>
              Understand and create a{" "}
              <a
                href="https://single-spa.js.org/docs/configuration"
                target="_blank"
                rel="noopener"
              >
                root config
              </a>
              , which will do the routing for your microfrontends.
            </li>
            <li>
              Deploy your microfrontends independently{" "}
              <a
                href="https://single-spa.js.org/docs/recommended-setup/#deployment-and-continuous-integration-ci"
                target="_blank"
                rel="noopener"
              >
                (read more).
              </a>
            </li>
          </ol>
        </section>
        <section>
          If you get stuck or have suggestions for improving
          single-spa-playground, consider{" "}
          <SlackLink>joining our slack workspace</SlackLink>,{" "}
          <GithubPlaygroundPullsLink>
            opening a pull request
          </GithubPlaygroundPullsLink>
          , or{" "}
          <GithubPlaygroundIssuesLink>
            filing an issue.
          </GithubPlaygroundIssuesLink>
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
