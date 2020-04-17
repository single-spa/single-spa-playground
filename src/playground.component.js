import React from "react";
import Styleguide, {
  mediaMobile,
  mediaDesktop,
} from "./styleguide/styleguide.component";
import { useCss } from "kremling";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Introduction from "./introduction/introduction.component";
import ApplicationsGuide from "./applications-guide/applications-guide.component";
import useLocalStorageData, {
  LocalStorageContext,
} from "./shared/use-local-storage-data.hook";
import VerifyAppGuide from "./verify-app-guide/verify-app-guide.component";
import Navbars from "./navbars/navbars.component";
import RootConfigGuide from "./root-config-guide/root-config-guide.component";
import Stuck from "./stuck/stuck.component";
import InstantTest from "./instant-test/instant-test.component";

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
                  path="/applications-guide"
                  component={ApplicationsGuide}
                />
                <Route path="/verify-app-guide" component={VerifyAppGuide} />
                <Route path="/root-config-guide" component={RootConfigGuide} />
                <Route path="/stuck" component={Stuck} />
                <Route path="/instant-test" component={InstantTest} />
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
