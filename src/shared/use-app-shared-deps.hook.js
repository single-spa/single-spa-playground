import { useEffect, useState } from "react";

export const getAppDependencies = ({ name, url }) => {
  const fetchUrl =
    url || window.importMapOverrides.getOverrideMap().imports[name];
  return fetch(fetchUrl)
    .then((resp) => resp.text())
    .then((jsBundleStringified) => {
      const systemjsModule = /^System\.register\((\[.*?\])/;
      const amdModule = /define\((\[.+?\])/;
      const match =
        jsBundleStringified.match(systemjsModule) ||
        jsBundleStringified.match(amdModule);

      if (match) {
        const appSharedDeps = JSON.parse(match[1]);
        return appSharedDeps;
      }

      return [];
    });
};

export const useAppSharedDependencies = ({ name, url }) => {
  const [appSharedDeps, setAppSharedDeps] = useState(null);

  useEffect(() => {
    if (!name || !url) return;
    getAppDependencies({
      name,
      url,
    }).then((appSharedDeps) => {
      setAppSharedDeps(appSharedDeps);
    });
  }, [name, url]);

  return {
    appSharedDeps,
  };
};
