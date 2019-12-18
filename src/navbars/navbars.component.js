import React, { useState, useEffect } from "react";
import Topbar from "./topbar.component";
import Sidebar from "./sidebar.component";

export default function Navbars(props) {
  const [forceSidebar, setForceSidebar] = useState(false);

  useEffect(() => {
    if (forceSidebar) {
      window.addEventListener("popstate", hideSidebar);
      return () => window.removeEventListener("popstate", hideSidebar);

      function hideSidebar() {
        setForceSidebar(false);
      }
    }
  }, [forceSidebar]);

  return (
    <>
      <Topbar showSidebar={showSidebar} />
      <Sidebar forceShow={forceSidebar} hideSidebar={hideSidebar} />
    </>
  );

  function hideSidebar() {
    setForceSidebar(false);
  }

  function showSidebar() {
    setForceSidebar(true);
  }
}
