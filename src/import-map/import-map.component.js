import React, {useState, useContext} from 'react'
import Code from '../shared/code.component'
import PageHeader from '../shared/page-header.component';
import {useCss} from 'kremling'
import EditImportMap from './edit-import-map.component'
import {Link} from 'react-router-dom'
import { LocalStorageContext } from '../shared/use-local-storage-data.hook';

export default function ImportMap(props) {
  const scope = useCss(css)
  const [editingImportMap, setEditingImportMap] = useState(false)
  const {applications} = useContext(LocalStorageContext)

  return (
    <>
      <PageHeader title="Import map" />
      <article className="card" {...scope}>
        <h3>Your import map</h3>
        <section>
          <a href="https://github.com/WICG/import-maps" target="_blank">Import maps</a> are a browser specification for controlling which
          URL to download javascript bundles from. The npm library <a href="https://github.com/systemjs/systemjs" target="_blank">systemjs</a> is
          a polyfill for this specification, which lets us use import maps in browsers that don't yet support them.
          We will use an import map to control where to download your applications from, which sets you up for easy independent deployability
          once you get things working locally.
        </section>
        {editingImportMap
          ?
            <EditImportMap
              finished={finishedEditing}
            />
          :
            <>
              <section className="call-to-action">
                <div>
                  Here is your import map.
                </div>
                <button className="primary" onClick={editImportMap}>
                  Edit
                </button>
              </section>
              <Code code={JSON.stringify(window.importMapOverrides.getOverrideMap(), null, 2)} />
              <section className="actions">
                <Link to="/registered-apps" className="secondary button">
                  Back
                </Link>
                {applications.length > 0 &&
                  <Link to={`/app/${applications[0].name}`} className="primary button">
                    Next step: test it out
                  </Link>
                }
              </section>
            </>
        }
      </article>
    </>
  )

  function editImportMap() {
    setEditingImportMap(true)
  }

  function finishedEditing() {
    setEditingImportMap(false)
    window.location.reload()
  }
}

const css = `
& .edit {
}

& .call-to-action {
  display: flex;
  justify-content: space-between;
}
`