import React from 'react'
import {Link} from 'react-router-dom'
import PageHeader from '../shared/page-header.component'

export default function Introduction(props) {
  return (
    <>
      <PageHeader title="Single-spa playground" />
      <article className="card">
        <section>
          The single-spa playground is a website that helps you get your code working with <a href="https://single-spa.js.org">single-spa</a>. If you
          don't know what single-spa is, check out <a href="https://www.youtube.com/watch?v=L4jqow7NTVg&feature=youtu.be">this intro video</a>.
        </section>
        <section>
          Single-spa also has a <a href="https://github.com/CanopyTax/single-spa-inspector" target="_blank">browser extension</a> that hooks into your browser's dev tools.
          The playground and browser extension can work in tandem to help you debug your single-spa applications.
        </section>
        <section>
          The playground isn't the only way to use single-spa, but is one of the easier ways. It will set you up with
          single-spa, <a href="https://github.com/systemjs/systemjs">systemjs@3</a>, and <a href="https://github.com/WICG/import-maps">import maps</a>.
          This lets you do the following:
          <ol>
            <li>
              Have microfrontends that are in separate git repos.
            </li>
            <li>
              Use different frameworks in the microfrontends, if you wish.
            </li>
            <li>
              Deploy your microfrontends independently.
            </li>
            <li>
              Not have to worry about some of the initial setup and configuration.
            </li>
          </ol>
        </section>
        <section>
          If you get stuck or have suggestions for improving single-spa-playground, consider <a target="_blank" href="https://join.slack.com/t/single-spa/shared_invite/enQtMzIwMTcxNTU3ODQyLTM1Y2U1OWMzNTNjOWYyZDBlMDJhN2VkYzk3MDI2NzQ2Nzg0MzMzNjVhNWE2YjVhMTcxNjFkOWYzMjllMmUxMjk">joining our slack workspace</a>,{" "}
          <a target="_blank" href="https://github.com/CanopyTax/single-spa-playground/pulls">opening a pull request</a>, or{" "}
          <a target="_blank" href="https://github.com/CanopyTax/single-spa-playground/issues">filing an issue.</a>
        </section>
        <section className="actions">
          <Link className="primary button" to="/registered-apps">
            Get started
          </Link>
        </section>
      </article>
    </>
  )
}