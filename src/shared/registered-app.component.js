import React, { useContext } from "react";
import { useCss } from "kremling";
import Code from "./code.component";
import { LocalStorageContext } from "./use-local-storage-data.hook";
import { getPlaygroundDeps } from "../verify-app-guide/verification-steps/application-dependencies.component";
import { importAppCode } from "../verify-app-guide/verification-steps/import-app";

export default function RegisteredApp({ app, edit, interactive }) {
  const scope = useCss(css);

  const { removeApplication } = useContext(LocalStorageContext);
  const importMap = {
    imports: {
      [app.name]: window.importMapOverrides.getOverrideMap().imports[app.name],
      ...sharedDepsImportMap(app.sharedDeps),
    },
  };
  return (
    <div {...scope}>
      <div className="registered-app">
        <Code code={indentedCode(app, importMap)} />
        {interactive && (
          <>
            <button type="button" onClick={edit} className="edit">
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
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
  width: 100%;
  background-color: rgba(230, 230, 230, 0.8);
  display: none;
  align-items: center;
  justify-content: center;
}

& .registered-app:hover .edit, & .registered-app:focus .edit {
  display: flex;
  cursor: pointer;
}
`;

const indentedCode = (app, importMap) =>
  `
singleSpa.registerApplication({
  name: '${app.name}',
  app: ${importAppCode(app)},
  activeWhen: '${app.pathPrefix}'
});

/* Import map */
${JSON.stringify(importMap, null, 2)}
`;

export const sharedDepsImportMap = (sharedDeps = []) => {
  const { importMapOverridesDeps, playgroundSharedDep } = getPlaygroundDeps();
  return sharedDeps.reduce((importmap, sharedDep) => {
    let url =
      playgroundSharedDep[sharedDep] || importMapOverridesDeps[sharedDep];
    return {
      ...importmap,
      [sharedDep]: url || "%{ADD_YOUR_URL_USING_IMPORT_MAP_OVERRIDE}",
    };
  }, {});
};
