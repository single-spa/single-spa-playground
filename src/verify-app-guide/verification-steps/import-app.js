export function importApp(app) {
  if (app.useNativeModules) {
    return import(/* webpackIgnore: true */ getAppUrl(app));
  } else {
    return System.import(app.name);
  }
}

export function importAppCode(app) {
  if (app.useNativeModules) {
    return `import(/* webpackIgnore: true */ '${getAppUrl(app)}')`;
  } else {
    return `System.import('${app.name}')`;
  }
}

export function getAppUrl(app) {
  return window.importMapOverrides.getOverrideMap().imports[app.name];
}
