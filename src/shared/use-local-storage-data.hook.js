import React, { useState } from "react";

export const LocalStorageContext = React.createContext(null);

export default function useLocalStorageData() {
  const [data, setDataState] = useState(getDataFromLocalStorage);

  return {
    updateApplication(app) {
      setData({
        ...data,
        application: app,
      });
      window.importMapOverrides.addOverride(app.name, app.url);
    },
    application: data ? data.application : null,
    addApplication(app) {
      setData({
        ...data,
        application: app,
      });
      window.importMapOverrides.addOverride(app.name, app.url);
    },
    removeApplication(appName) {
      setData({
        ...data,
        application: null,
      });
      window.importMapOverrides.removeOverride(appName);
    },
    resetApplications() {
      setData(null);
      window.importMapOverrides.resetOverrides();
    },
  };

  function setData(data) {
    localStorage.setItem("single-spa-playground", JSON.stringify(data));
    setDataState(data);
  }
}

function getDataFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("single-spa-playground"));
  } catch {
    return null;
  }
}
