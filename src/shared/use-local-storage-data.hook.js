import React, { useState } from "react";

export const LocalStorageContext = React.createContext(null);

export default function useLocalStorageData() {
  const [data, setDataState] = useState(getDataFromLocalStorage);

  return {
    updateApplication(app, name) {
      setData({
        ...data,
        applications: data.applications.map((a) => (a.name === name ? app : a)),
      });
      window.importMapOverrides.addOverride(app.name, app.url);
    },
    applications: data.applications,
    addApplication(app) {
      setData({
        ...data,
        applications: [...data.applications, app],
      });
      window.importMapOverrides.addOverride(app.name, app.url);
    },
    removeApplication(appName) {
      setData({
        ...data,
        applications: data.applications.filter((a) => a.name !== appName),
      });
      window.importMapOverrides.removeOverride(appName);
    },
    resetApplications() {
      setData(emptyData);
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
    return (
      JSON.parse(localStorage.getItem("single-spa-playground")) || emptyData
    );
  } catch {
    return emptyData;
  }
}

const emptyData = {
  applications: [],
};
