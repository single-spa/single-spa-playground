import React, { useState, useEffect } from "react";
import Playground from "./playground.component";
import useLocalStorageData from "./shared/use-local-storage-data.hook";
import { getAppNames, registerApplication, navigateToUrl } from "single-spa";
import HiddenPlayground from "./hidden-playground.component";

export default function Root(props) {
  const [showPlayground, setShowPlayground] = useState(() =>
    location.pathname.startsWith("/playground")
  );
  const localStorageData = useLocalStorageData();

  useEffect(() => {
    window.addEventListener("single-spa:routing-event", routeChange);
    return () =>
      window.removeEventListener("single-spa:routing-event", routeChange);

    function routeChange() {
      const shouldShowPlayground = window.location.pathname.startsWith(
        "/playground"
      );
      setShowPlayground(shouldShowPlayground);
    }
  }, []);

  useEffect(() => {
    if (
      !localStorage.getItem("single-spa-playground") &&
      !window.location.pathname.startsWith("/playground")
    ) {
      navigateToUrl("/playground");
    }
  }, []);

  useEffect(() => {
    Promise.all(
      getAppNames().map(appName =>
        window.__SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
          appName
        )
      )
    ).then(() => {
      if (!showPlayground) {
        localStorageData.applications.forEach(app => {
          /* global System */
          registerApplication(
            app.name,
            () => System.import(app.name),
            location => location.pathname.startsWith(app.pathPrefix)
          );
        });
      }
    });
  }, [showPlayground]);

  return showPlayground ? <Playground /> : <HiddenPlayground />;
}
