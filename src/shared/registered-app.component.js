import React, { useContext } from "react";
import { useCss } from "kremling";
import Code from "./code.component";
import { LocalStorageContext } from "./use-local-storage-data.hook";
import { ApplicationBundleLink } from "./links.component";

export default function RegisteredApp({ app, edit, interactive }) {
  const scope = useCss(css);

  const { removeApplication } = useContext(LocalStorageContext);

  return (
    <div {...scope}>
      <div className="registered-app">
        <Code code={indentedCode(app)} />
        {interactive && (
          <>
            <div role="button" tabIndex={0} onClick={edit} className="edit">
              Edit
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={removeButton}
              className="remove"
            >
              Remove
            </div>
          </>
        )}
      </div>
    </div>
  );

  function removeButton(evt) {
    if (
      window.confirm(
        `Are you sure you want to remove application '${app.name}'?`
      )
    ) {
      evt.stopPropagation();
      evt.preventDefault();
      removeApplication(app.name);
    }
  }
}

const css = `
& .registered-app {
  position: relative;
}

& .edit {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: calc(100% - 15.0rem);
  background-color: rgba(230, 230, 230, 0.8);
  display: none;
  align-items: center;
  justify-content: center;
}

& .registered-app:hover .edit, & .registered-app:focus .edit {
  display: flex;
  cursor: pointer;
}

& .remove {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 15.0rem;
  background-color: lightgray;
  display: none;
  align-items: center;
  justify-content: center;
}

& .registered-app:hover .remove, & .registered-app:focus .remove {
  display: flex;
  cursor: pointer;
}
`;

const indentedCode = (app) =>
  `
singleSpa.registerApplication({
  name: '${app.name}',
  app: () => System.import('${app.name}'),
  activeWhen: '${app.pathPrefix}'
});

/** Partial import-map
 * { "${app.name}": "${
    window.importMapOverrides.getOverrideMap().imports[app.name]
  }" }
 ** /
`;
