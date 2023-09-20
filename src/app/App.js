import modules from "../modules";
import { BrowserRouter, Routes } from "react-router-dom";
import { Suspense, useCallback } from "react";
import Loader from "../main/components/Loader";

const App = () => {
  const renderModules = useCallback(
    () => modules.map((module) => module()),
    []
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>{renderModules()}</Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
