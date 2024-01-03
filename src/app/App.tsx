import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { authRoutes } from './pages/auth/auth.router';
import { RouteType } from './types/router.type';
import { routes } from '../routes';
import LayoutApp from './pages/Layout';
import RouteProvider from './providers/RouteProvider';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {authRoutes.map((route: RouteType, index: number) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}

        <Route path="/" element={<LayoutApp />}>
          {routes.map((val: RouteType, index) => (
            <Route
              key={index}
              path={val.path}
              element={
                <RouteProvider>
                  <val.component />
                </RouteProvider>
              }
            >
              {val.children &&
                val.children.map((item, idx) => (
                  <Route
                    key={idx}
                    path={item.path}
                    element={
                      <RouteProvider>
                        <item.component />
                      </RouteProvider>
                    }
                  />
                ))}
            </Route>
          ))}
        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
