import React from "react";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";

export default function InstantTest(props) {
  const params = new URLSearchParams(location.search);
  const isValid = params.has("name") && params.has("url");
  const { addApplication } = React.useContext(LocalStorageContext);

  React.useEffect(() => {
    if (!isValid) {
      return;
    }

    const app = {
      name: params.get("name"),
      pathPrefix: "/",
      framework: params.get("framework") || undefined,
    };

    addApplication(app);

    window.importMapOverrides.addOverride(
      params.get("name"),
      params.get("url")
    );

    location.assign("/");
  }, [addApplication, isValid, params]);

  if (isValid) {
    return null;
  } else {
    return "Please provide name and url query params to use this feature";
  }
}
