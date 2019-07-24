import React, {useContext} from 'react'
import PageHeader from '../shared/page-header.component';
import {useCss} from 'kremling'
import { LocalStorageContext } from '../shared/use-local-storage-data.hook';
import Code from '../shared/code.component'

export default function HtmlFile(props) {
  const code = useCode()
  const scope = useCss(css)
  const [copying, setCopying] = React.useState(false)

  React.useEffect(() => {
    if (copying) {
      const timeoutId = setTimeout(() => {
        setCopying(false)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [copying])

  return (
    <>
      <PageHeader title="The HTML file" />
      <article className="card" {...scope}>
        <section>
          It's time to talk about the HTML file. In single-spa, there is only one html file for your applications. We call it the "single-spa root config."
          This is different than normal -- you don't get one HTML file per application, just one for all of them. Only having one html file is actually the
          origin of the single-spa name (only a "single" single-page-application -- don't think about it too hard <span role="img" aria-label="Smiley emoji">😀</span>)
        </section>
        <section>
          The single-spa root config is something that we can provide for you entirely. You will want to put this HTML file into its own git repo, not one of
          the application repos.
        </section>
        <h3>Your single-spa root config</h3>
        <div>
          You'll want to create an <span className="whole-new-git-repo">entirely new git repo</span> for your single-spa root config, separate from your
          applications. Then, copy the html below into a file called <code>index.html</code> and run <code>npx serve -s</code> from
          the same directory as the html file. You should now be able to see your application working locally!
        </div>
        <div className="copy-row">
          <button type="button" className="primary" onClick={() => {setCopying(true); copy(code)}} disabled={copying}>
            Copy html
          </button>
        </div>
        <Code code={code} />
      </article>
    </>
  )
}

function useCode() {
  const {applications} = useContext(LocalStorageContext)

  const appUrls = window.importMapOverrides.getOverrideMap().imports
  const needsZone = applications.some(app => app.framework === 'angular')

  const code =
`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Your application</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="importmap-type" content="systemjs-importmap">
    <script type="systemjs-importmap">
      {
        "imports": {${applications.map(app => (`
          "${app.name}": "${appUrls[app.name]}",`))}
          "single-spa": "https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.6/system/single-spa.min.js"
        }
      }
    </script>
    <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.6/system/single-spa.min.js" as="script" crossorigin="anonymous" />${needsZone ? `
    <script src="https://unpkg.com/zone.js"></script>` : ``}
    <script src="https://unpkg.com/import-map-overrides@1.7.2/dist/import-map-overrides.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.1.0/system.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.1.0/extras/amd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.1.0/extras/named-exports.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.1.0/extras/named-register.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/4.1.0/extras/use-default.min.js"></script>
  </head>
  <body>
    <script>
      System.import('single-spa').then(function (singleSpa) {${applications.map(app => (`
        singleSpa.registerApplication(
          '${app.name}',
          () => System.import('${app.name}'),
          location => location.pathname.startsWith('${app.pathPrefix}')
        );`))}
        singleSpa.start();
      })
    </script>
    <!-- See https://github.com/joeldenning/import-map-overrides#user-interface  -->
    <import-map-overrides-full show-when-local-storage="overrides-ui"></import-map-overrides-full>
  </body>
</html>
`.trim()

  return code
}

function copy(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const css = `
& .copy-row {
  display: flex;
  justify-content: flex-end;
  margin: .8rem 0;
}
`