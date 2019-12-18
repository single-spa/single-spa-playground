import React from "react";
import Styleguide, {
  mediaMobile,
  mediaDesktop
} from "./styleguide/styleguide.component";
import { useCss } from "kremling";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Introduction from "./introduction/introduction.component";
import RegisteredApplications from "./registered-apps/registered-apps.component";
import useLocalStorageData, {
  LocalStorageContext
} from "./shared/use-local-storage-data.hook";
import TestApp from "./test-app/test-app.component";
import Navbars from "./navbars/navbars.component";
import ImportMap from "./import-map/import-map.component";
import HtmlFile from "./html-file/html-file.component";
import Stuck from "./stuck/stuck.component";

export default function Playground(props) {
  const scope = useCss(css);
  const localStorageData = useLocalStorageData();

  return (
    <Styleguide>
      <LocalStorageContext.Provider value={localStorageData}>
        <div {...scope} className="playground">
          <div className="navbar-margin">
            <div className="centered-content">
              <BrowserRouter basename="/playground">
                <Route path="/" component={Navbars} />
                <Route path="/" exact component={Introduction} />
                <Route
                  path="/registered-apps"
                  component={RegisteredApplications}
                />
                <Route path="/import-map" component={ImportMap} />
                <Route path="/app/:appName" component={TestApp} />
                <Route path="/html-file" component={HtmlFile} />
                <Route path="/stuck" component={Stuck} />
              </BrowserRouter>
            </div>
          </div>
        </div>
      </LocalStorageContext.Provider>
    </Styleguide>
  );
}

const css = `
& .playground {
  position: absolute;
  z-index: 88888;
  top: 0;
  left: 0;
  width: 100vw;
  box-sizing: border-box; 
  padding-bottom: 3.2rem;
}

body {
  width: 100vw;
  height: 100vh;
  background-color: var(--light-gray);
}

& .playground * {
  box-sizing: border-box; 
}

& .centered-content {
  margin: 0 auto;
}

${mediaMobile} {
  & .centered-content {
    width: 100vw;
  }
}

${mediaDesktop} {
  & .navbar-margin {
    margin-left: 23.6rem;
  }

  & .centered-content {
    min-width: 56.0rem;
    max-width: 76.8rem;
  }
}
`;
