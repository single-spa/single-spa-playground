import React from "react";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";

export default function InstantTest(props) {
  const params = new URLSearchParams(location.search);
  const isValid = params.has("name") && params.has("url");
  const { applications, addApplication, updateApplication } = React.useContext(
    LocalStorageContext
  );

  React.useEffect(() => {
    if (!isValid) {
      return;
    }

    const app = { name: params.get("name"), pathPrefix: "/" };
    if (applications.some(app => app.name === params.get("name"))) {
      updateApplication(app, params.get("name"));
    } else {
      addApplication(app);
    }

    window.importMapOverrides.addOverride(
      params.get("name"),
      params.get("url")
    );

    location.assign("/");
  }, [isValid]);

  if (isValid) {
    return null;
  } else {
    return "Please provide name and url query params to use this feature";
  }
}
