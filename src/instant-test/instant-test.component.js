import React, { useState } from "react";
import { LocalStorageContext } from "../shared/use-local-storage-data.hook";

export default function InstantTest(props) {
  const [isValid, setIsValid] = useState(true);
  const { addApplication } = React.useContext(LocalStorageContext);

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (!(params.has("name") && params.has("url"))) {
      setIsValid(false);
    } else {
      const app = {
        name: params.get("name"),
        pathPrefix: "/",
        framework: params.get("framework") || undefined,
        useNativeModules: params.get("useNativeModules") === "true",
      };

      addApplication(app);

      window.importMapOverrides.addOverride(
        params.get("name"),
        params.get("url")
      );

      location.assign("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isValid) {
    return null;
  } else {
    return "Please provide name and url query params to use this feature";
  }
}
