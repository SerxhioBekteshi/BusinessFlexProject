import { Route } from "react-router-dom";
import routes from "./routes";

const UserModule = () => {
  return routes.map((route) => {
    const Element = route.element;
    return (
      <Route
        key={`${route.path}_key`}
        element={<Element />}
        path={route.path}
      />
    );
  });
};

export default UserModule;
