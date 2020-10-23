import React, { useState, useEffect } from "react";
import Playground from "./playground.component";
import useLocalStorageData from "./shared/use-local-storage-data.hook";
import { getAppNames, registerApplication, navigateToUrl } from "single-spa";
import HiddenPlayground from "./hidden-playground.component";
import { importApp } from "./verify-app-guide/verification-steps/import-app";

export default function Root(props) {
  const [showPlayground, setShowPlayground] = useState(() =>
    location.pathname.startsWith("/playground")
  );
  const localStorageData = useLocalStorageData();

  useEffect(() => {
    const overridesTrigger = document.querySelector(".imo-trigger");
    if (overridesTrigger) {
      overridesTrigger.style.zIndex = "1000000";
    }
  });

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
      !localStorageData.application &&
      !window.location.pathname.startsWith("/playground")
    ) {
      navigateToUrl("/playground");
    }
  }, [localStorageData.application]);

  useEffect(() => {
    Promise.all(
      getAppNames().map((appName) =>
        window.__SINGLE_SPA_DEVTOOLS__.exposedMethods.unregisterApplication(
          appName
        )
      )
    ).then(() => {
      if (!showPlayground) {
        const { application } = localStorageData;
        if (!application) return;
        /* global System */
        registerApplication(
          application.name,
          () => importApp(application),
          (location) => location.pathname.startsWith(application.pathPrefix)
        );
      }
    });
  }, [localStorageData, showPlayground]);

  return showPlayground ? <Playground /> : <HiddenPlayground />;
}
