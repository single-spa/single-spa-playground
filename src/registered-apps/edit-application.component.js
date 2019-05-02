import React, { useState } from 'react'
import {useCss} from 'kremling'

export default function EditApplication({ app = {}, updateApp, addApp, cancel }) {
  const [framework, setFramework] = useState(app.framework || '')
  const [name, setName] = useState(app.name || '')
  const [url, setUrl] = useState(window.importMapOverrides.getOverrideMap().imports[name] || '')
  const [pathPrefix, setPathPrefix] = useState(app.pathPrefix || '/')
  const scope = useCss(css)

  const ariaPrefix = name || 'new-app'
  const frameworkLabel = `${ariaPrefix}-framework`
  const nameLabel = `${ariaPrefix}-name`
  const urlLabel = `${ariaPrefix}-url`
  const pathPrefixLabel = `${ariaPrefix}-pathprefix`

  return (
    <form onSubmit={handleSubmit} {...scope} className="application-form" autoComplete="off">
      <div>
        <label>
          <div>
            Framework
          </div>
          <select value={framework} onChange={changeFramework} aria-labelledby={frameworkLabel} required>
            <option value="react">
              React
            </option>
            <option value="vue">
              Vue
            </option>
            <option value="angular">
              Angular
            </option>
          </select>
        </label>
      </div>
      <div>
        <label>
          <div>Application Name</div>
          <input type="text" value={name} onChange={evt => setName(evt.target.value)} placeholder="app1" aria-labelledby={nameLabel} required autoComplete="off" />
        </label>
      </div>
      <div>
        <label>
          <div>Download URL</div>
          <input type="text" value={url} onChange={evt => setUrl(evt.target.value)} placeholder="http://localhost:8080/app1.js" aria-labelledby={urlLabel} required autoComplete="off" />
        </label>
      </div>
      <div>
        <label>
          <div>Prefix for frontend routes</div>
          <input type="text" value={pathPrefix} onChange={evt => setPathPrefix(evt.target.value)} placeholder="/app1" aria-labelledby={pathPrefixLabel} required autoComplete="off" />
        </label>
      </div>
      <div className="actions">
        <button type="button" className="secondary" onClick={cancel}>
          Cancel
        </button>
        <button type="submit" className="primary">
          {app.name ? 'Update' : 'Add'} application
        </button>
      </div>
    </form>
  )

  function handleSubmit(evt) {
    evt.preventDefault()
    const appToSave = {
      framework,
      name,
      pathPrefix,
    }
    app.name ? updateApp(appToSave, url, app.name) : addApp(appToSave, url)
  }

  function changeFramework(evt) {
    setFramework(evt.target.value)
  }
}

const css = `
& .application-form label {
  display: flex;
}

& .application-form div {
  height: 50rem;
}

& .application-form label div {
  width: 250rem;
  display: flex;
  align-items: center;
}

& .application-form input, & .application-form select {
  width: 350rem;
}
`