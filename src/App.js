import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

function App() {
  const [progress, setProgress] = useState(0);
  const pageSize = 7;

  return (
    <>
      <Router>
        <NavBar />
        <LoadingBar color="#0095a2" height={3} progress={progress} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                setkey="general"
                category="general"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/general"
            element={
              <News
                setProgress={setProgress}
                key="general"
                category="general"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                key="business"
                category="business"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                key="sports"
                category="sports"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                key="science"
                category="science"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                key="health"
                category="health"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                key="entertainment"
                category="entertainment"
                pageSize={pageSize}
                country="us"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                key="technology"
                category="technology"
                pageSize={pageSize}
                country="us"
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
