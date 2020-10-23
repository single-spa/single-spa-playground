import React, { useContext, useEffect } from "react";
import PageHeader from "../shared/page-header.component";
import { useCss } from "kremling";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";
import { SlackLink } from "../shared/links.component";
import Code from "../shared/code.component";
import { sharedDepsImportMap } from "../shared/registered-app.component";
import { Link } from "react-router-dom";
import { useAppSharedDependencies } from "../shared/use-app-shared-deps.hook";
import { importAppCode } from "../verify-app-guide/verification-steps/import-app";

export default function HtmlFile(props) {
  const scope = useCss(css);
  const [copying, setCopying] = React.useState(false);
  const { application } = useContext(LocalStorageContext);
  const { appSharedDeps } = useAppSharedDependencies({
    name: application && application.name,
    url: application && application.url,
  });
  useEffect(() => {
    if (copying) {
      const timeoutId = setTimeout(() => {
        setCopying(false);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [copying]);
  if (!application)
    return (
      <p>
        You need to{" "}
        <Link to="/verify-app-guide">register your application</Link> with
        single-spa-playground before generating your root config.
      </p>
    );

  const importMap = {
    imports: {
      [application.name]: window.importMapOverrides.getOverrideMap().imports[
        application.name
      ],
      ...sharedDepsImportMap(application.sharedDeps),
    },
  };
  const code = `
<script type="systemjs-importmap">
  ${JSON.stringify(importMap, null, 2)}
</script>`;

  const registerAppCode = `
singleSpa.registerApplication(
  '${application.name}',
  () => ${importAppCode(application)},
  location => location.pathname.startsWith('${application.pathPrefix}')
);

singleSpa.start();
  `;
  return (
    <>
      <PageHeader title="Root configuration" />
      <article className="card" {...scope}>
        <section>
          It's time to talk about the root-config. In single-spa, there is only
          one html file for your applications. We call it the "single-spa root
          config." This is different than normal -- you don't get one HTML file
          per application, just one for all of them. Only having one html file
          is actually the origin of the single-spa name (only a "single"
          single-page-application -- don't think about it too hard{" "}
          <span role="img" aria-label="Smiley emoji">
            😀
          </span>
          )
        </section>
        <section>
          The single-spa root config is something that we can provide for you
          entirely. Let's use create-single-spa again!
        </section>
        <h2>Creating a single-spa root config</h2>
        <div>
          You'll want to create an{" "}
          <span className="whole-new-git-repo">entirely new git repo</span> for
          your single-spa root config, separated from your applications.
        </div>
        <div>
          <Code code={`npx create-single-spa --module-type root-config`} />
        </div>
        <p>
          Running that create-single-spa comand will give you a root config, but
          it won't have your import map or applications set up yet. Here's what
          you need to do to get those set up:
        </p>
        <p>
          First, let's talk about{" "}
          <a href="https://github.com/WICG/import-maps" target="_blank">
            import maps
          </a>
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            title="import-map-tutorial"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Lfm2Ge_RUxs"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p>
          Import maps are a browser specification for controlling which{" "}
          <b>URL to download javascript bundles from</b>. The npm library{" "}
          <a
            href="https://github.com/systemjs/systemjs"
            target="_blank"
            rel="noopener"
          >
            systemjs
          </a>{" "}
          is a polyfill for this specification, which lets us use import maps in
          browsers that don't yet support them. We will use an import map to
          control where to download your applications from, which sets you up
          for easy independent deployability once you get things working
          locally.
        </p>
        <p>
          If you've been following this guide, and created a single-spa react
          application using our CLI (create-single-spa), how about checking the{" "}
          <a
            href={
              window.importMapOverrides.getOverrideMap().imports[
                application.name
              ]
            }
            target="_blank"
          >
            JS generated by webpack now?
          </a>{" "}
          What is important for now, is this line:
        </p>
        {!appSharedDeps ? (
          <p>loading...</p>
        ) : (
          <Code
            code={`System.register(${JSON.stringify(
              appSharedDeps
            )}, function(...`}
          />
        )}
        <p>
          This is how systemjs manages dependencies for systemjs modules. So,
          before running your single-spa react application, systemjs need to
          know what to do with "react" and "react-dom"! Just add them to your
          root-config import map and you are ready to go! Also, don't forget to
          add both the root-config and single-spa application!
        </p>
        <Code code={code} />
        <div className="copy-row">
          <button
            type="button"
            className="primary"
            onClick={() => {
              setCopying(true);
              copy(code);
            }}
            disabled={copying}
          >
            Copy import map
          </button>
        </div>
        <p>
          But how does my application run in the playground? Well, for your
          convenience, we already added "react" and "react-dom" in our import
          map! Just inspect the DOM and see for yourself!
        </p>

        <p>Now we need to start the root-config. Run:</p>
        <Code code={`yarn start`} />
        <p>
          But wait... Why am I only seeing a blank page? Well, did you register
          you single-spa application? You can add them to your import map, but
          if you never register them via{" "}
          <a href="https://single-spa.js.org/docs/api.html#registerapplication">
            registerApplication
          </a>
          , it will never bootstrap your applications! Just add this code in you
          root-config entrypoint file.
        </p>
        <Code code={registerAppCode} />
        <p>
          And that's all for now! Feedback is greatly appreciated,{" "}
          <SlackLink>join us in our slack</SlackLink> and give us a hello!
        </p>
      </article>
    </>
  );
}

function copy(str) {
  const el = Object.assign(document.createElement("textarea"), {
    value: str,
    readonly: true,
  });
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

const css = `
& .copy-row {
  display: flex;
  justify-content: flex-end;
  margin: .8rem 0;
}
`;
