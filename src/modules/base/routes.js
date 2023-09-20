import loadable from "@loadable/component";

const baseRoutes = [
  {
    path: "/",
    element: loadable(() => import("./pages/dashboard")),
  },
  {
    path: "/jobs/:id",
    element: loadable(() => import("./pages/getJobList")),
  },
].map((x, id) => ({ id, ...x }));

export default baseRoutes;
