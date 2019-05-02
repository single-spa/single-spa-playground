import React, {useState} from 'react'
import {entries} from 'lodash-es'
import {useCss} from 'kremling'

export default function EditImportMap(props) {
  const [imports, setImports] = useState(() => entries(window.importMapOverrides.getOverrideMap().imports))
  const scope = useCss(css)

  return (
    <form onSubmit={handleSubmit} {...scope} autoComplete="off">
      <div className="labels">
        <div id="module-name-label">
          Module name
        </div>
        <div id="module-url-label">
          Module url
        </div>
      </div>
      {imports.map((imp, index) => (
        <div key={index} className="module">
          <input type="text" aria-labelledby="module-name-label" value={imp[0]} onChange={handleNameChange(index)} />
          <input type="text" aria-labelledby="module-url-label" value={imp[1]} onChange={handleUrlChange(index)} />
          <button type="button" className="secondary remove" onClick={remove(imp, index)}>
            Remove
          </button>
        </div>
      ))}
      <section className="actions">
        <button type="button" className="secondary" onClick={props.finished}>
          Cancel
        </button>
        <button type="submit" className="primary">
          Update import map
        </button>
      </section>
    </form>
  )

  function handleNameChange(index) {
    return evt => {
      setImports(imports.map((imp, ind) => ind === index ? [evt.target.value, imp[1]] : imp))
    }
  }

  function handleUrlChange(index) {
    return evt => {
      setImports(imports.map((imp, ind) => ind === index ? [imp[0], evt.target.value] : imp))
    }
  }

  function handleSubmit() {
    window.importMapOverrides.resetOverrides()
    imports.forEach(imp => {
      window.importMapOverrides.addOverride(imp[0], imp[1])
    })
    props.finished()
  }

  function remove(imp, index) {
    return () => {
      if (window.confirm(`Are you sure you want to remove '${imp.name}' from the import map?`)) {
        setImports(imports.filter((imp, i) => i !== index))
      }
    }
  }
}

const css = `
& [aria-labelledby="module-name-label"], #module-name-label {
  width: 160rem;
}

& [aria-labelledby="module-url-label"], #module-url-label {
  width: 300rem;
}

& .labels {
  display: flex;
  margin-bottom: 8rem;
}

& .module {
  margin-bottom: 8rem;
  display: flex;
  align-items: center;
}

& .actions {
  padding-top: 8rem;
}

& .remove {
  margin-left: 16rem;
}
`