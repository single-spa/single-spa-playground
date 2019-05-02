import React, {useContext, useState} from 'react'
import PageHeader from '../shared/page-header.component';
import {LocalStorageContext} from '../shared/use-local-storage-data.hook'
import RegisteredApp from './registered-app.component'
import EditApplication from './edit-application.component'
import {useCss} from 'kremling'
import {Link} from 'react-router-dom'

export default function RegisteredApps(props) {
  const {applications, addApplication, updateApplication} = useContext(LocalStorageContext)
  const [addingNewApplication, setAddingNewApplication] = useState(applications.length === 0)
  const [nameOfAppEditing, setNameOfAppEditing] = useState(null)
  const scope = useCss(css)

  return (
    <>
      <PageHeader title="Registered applications" />
      <article className="card" {...scope}>
        <section>
          A <a href="https://single-spa.js.org/docs/building-applications.html">single-spa-application</a> is a micro-frontend that is in charge
          of certain url routes. You need to <a href="https://single-spa.js.org/docs/api.html#registerapplication">register these with single-spa</a> so
          that single-spa can make sure the right applications  are active for any particular url.
        </section>
        <h3>Your single-spa applications</h3>
        <section className="call-to-action">
          <div>
            {applications.length === 0 ? `Let's add your first single-spa application.` : `Click on any application to edit or test it.`}
          </div>
          {!addingNewApplication && !nameOfAppEditing &&
            <button className="primary" onClick={() => setAddingNewApplication(true)}>
              Create app
            </button>
          }
        </section>
        <section className="add-application">
          {addingNewApplication &&
            <EditApplication
              addApp={addAndClose}
              cancel={cancelAdd}
            />
          }
        </section>
        {applications.map(app =>
          app.name === nameOfAppEditing
          ?
            <EditApplication
              key={app.name}
              app={app}
              updateApp={updateApp}
              cancel={() => setNameOfAppEditing(null)}
            />
          :
            <RegisteredApp
              key={app.name}
              app={app}
              edit={() => setNameOfAppEditing(app.name)}
              interactive={true}
            />
        )}
        {!addingNewApplication && !nameOfAppEditing &&
          <section className="actions next-step">
            <Link to="/import-map" className="button primary">
              Next step: Import Map
            </Link>
          </section>
        }
      </article>
    </>
  )

  function addAndClose(app, url) {
    setAddingNewApplication(false)
    addApplication(app)
    window.importMapOverrides.addOverride(app.name, url)
  }

  function cancelAdd() {
    setAddingNewApplication(false)
  }

  function updateApp(app, url, oldName) {
    updateApplication(app, oldName)
    setNameOfAppEditing(null)
    const oldUrl = window.importMapOverrides.getOverrideMap().imports[app.name]
    if (oldUrl !== url) {
      window.importMapOverrides.removeOverride(oldName)
      window.importMapOverrides.addOverride(app.name, url)
      // Changes to the import map require a page reload
      window.location.reload()
    }
  }
}

const css = `
& .add-application {
  margin-top: 16rem;
}

& .call-to-action {
  display: flex;
  justify-content: space-between;
}

& .next-step {
  margin-top: 16rem;
}
`