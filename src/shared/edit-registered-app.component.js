import React, { useState } from "react";
import { useCss } from "kremling";
import { getAppDependencies } from "./use-app-shared-deps.hook";

export default function EditRegisteredApp({
  app = {},
  updateApp,
  addApp,
  cancel,
}) {
  const [framework, setFramework] = useState(app.framework || "react");
  const [name, setName] = useState(app.name || "");
  const [url, setUrl] = useState(
    window.importMapOverrides.getOverrideMap().imports[name] || ""
  );
  const [pathPrefix, setPathPrefix] = useState(app.pathPrefix || "/");
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appSharedDeps, setAppSharedDeps] = useState([]);
  const [useNativeModules, setUseNativeModules] = useState(false);
  const scope = useCss(css);

  const ariaPrefix = name || "new-app";
  const frameworkLabel = `${ariaPrefix}-framework`;
  const nameLabel = `${ariaPrefix}-name`;
  const urlLabel = `${ariaPrefix}-url`;
  const pathPrefixLabel = `${ariaPrefix}-pathprefix`;

  return (
    <form
      onSubmit={handleSubmit}
      {...scope}
      className="application-form"
      autoComplete="off"
    >
      <div className="section">
        <label>
          <div className="inner-label">Framework</div>
          <select
            value={framework}
            onChange={changeFramework}
            aria-labelledby={frameworkLabel}
            required
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
          </select>
        </label>
      </div>
      <div className="section">
        <label>
          <div className="inner-label">Application Name</div>
          <input
            type="text"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            placeholder="@org/package_name"
            aria-labelledby={nameLabel}
            required
            autoComplete="off"
          />
        </label>
      </div>
      <div className="section">
        <label>
          <div className="inner-label">Download URL</div>
          <input
            type="text"
            value={url}
            onChange={(evt) => setUrl(evt.target.value)}
            placeholder={
              framework === "vue"
                ? `http://localhost:8080/js/app.js`
                : `http://localhost:8080/${
                    name ? name.replace(/@/g, "").replace(/\//g, "-") : "app1"
                  }.js`
            }
            aria-labelledby={urlLabel}
            required
            autoComplete="off"
          />
        </label>
      </div>
      <div className="section">
        <label>
          <div className="inner-label">Prefix for frontend routes</div>
          <input
            type="text"
            value={pathPrefix}
            onChange={(evt) => setPathPrefix(evt.target.value)}
            placeholder="/app1"
            aria-labelledby={pathPrefixLabel}
            required
            autoComplete="off"
          />
        </label>
      </div>
      <div className="section">
        <label>
          <div className="inner-label">Module Loader (Advanced)</div>
          <div className="form-inputs">
            <label htmlFor="use-systemjs">SystemJS</label>
            <input
              id="use-systemjs"
              type="radio"
              name="use-esm"
              checked={!useNativeModules}
              onChange={(evt) => setUseNativeModules(!evt.target.checked)}
              required
              autoComplete="off"
            />
            <label htmlFor="use-esm">Browser</label>
            <input
              id="use-esm"
              type="radio"
              name="use-esm"
              checked={useNativeModules}
              onChange={(evt) => setUseNativeModules(evt.target.checked)}
              required
              autoComplete="off"
            />
          </div>
        </label>
      </div>
      <div className="actions">
        <button type="button" className="secondary" onClick={cancel}>
          Cancel
        </button>
        <button type="submit" className="primary">
          {loading ? "Loading" : `${app.name ? "Update" : "Add"} application`}
        </button>
      </div>
      {alertMessage && (
        <div className="alert-message">
          <div className="alert-content">
            <p>{alertMessage}</p>
            <div>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setAlertMessage(null);
                }}
              >
                No
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => {
                  saveApp(appSharedDeps);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );

  function handleSubmit(evt) {
    evt.preventDefault();

    setLoading(true);
    return getAppDependencies({ url })
      .then((appSharedDeps) => {
        const guessFramework = extractFrameworkName(appSharedDeps);
        if (guessFramework && framework !== guessFramework) {
          setAlertMessage(
            `Your selected framework (${framework}) is not the same as the framework detected (${guessFramework}). Continue anyway?`
          );
          setAppSharedDeps(appSharedDeps);
        } else {
          saveApp(appSharedDeps);
        }
      })
      .catch(() => {
        // The validation is more of a sugar than a requirement, if it fails, save it anyway
        saveApp();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function changeFramework(evt) {
    setFramework(evt.target.value);
  }

  function saveApp(newAppSharedDeps) {
    const appToSave = {
      framework,
      name,
      pathPrefix,
      sharedDeps: newAppSharedDeps || appSharedDeps,
      useNativeModules,
    };
    app.name ? updateApp(appToSave, url, app.name) : addApp(appToSave, url);
  }
}

const css = `
& .application-form {
  position: relative;
}

& .application-form .alert-message {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255,255,255,0.6);
  display: flex;
  align-items: center;
}

& .application-form .alert-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background: var(--light-gray);
}


& .application-form label {
  display: flex;
}

& .application-form .section {
  height: 5.0rem;
}

& .application-form label .inner-label {
  width: 25.0rem;
  display: flex;
  align-items: center;
}

& .application-form input[type="text"], & .application-form select {
  width: 35.0rem;
}

& .form-inputs {
  display: flex;
  align-items: center;
}

& .application-form input[type="radio"] {
  margin-right: 2.4rem;
}
`;

const extractFrameworkName = (dependencies) => {
  if (dependencies.find((dep) => dep.match(/react/))) return "react";
  if (dependencies.find((dep) => dep.match(/angular/))) return "angular";
  if (dependencies.find((dep) => dep.match(/vue/))) return "vue";
  return null;
};
