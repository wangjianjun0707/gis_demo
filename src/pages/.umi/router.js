import React from "react";
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter
} from "react-router-dom";
import dynamic from "umi/dynamic";
import renderRoutes from "umi/lib/renderRoutes";
import history from "@@/history";
import RendererWrapper0 from "/Users/wangjianjun/IdeaProjects/gis_demo/src/pages/.umi/LocaleWrapper.jsx";
import { routerRedux, dynamic as _dvaDynamic } from "dva";

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: "/user",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__UserLayout" */ "../../layouts/UserLayout"
            ),
          LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/UserLayout").default,
    routes: [
      {
        name: "login",
        path: "/user/login",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(
                  /* webpackChunkName: "p__user__login" */ "../user/login"
                ),
              LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                .default
            })
          : require("../user/login").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/wangjianjun/IdeaProjects/gis_demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    path: "/",
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () =>
            import(
              /* webpackChunkName: "layouts__SecurityLayout" */ "../../layouts/SecurityLayout"
            ),
          LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
            .default
        })
      : require("../../layouts/SecurityLayout").default,
    routes: [
      {
        path: "/",
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(
                  /* webpackChunkName: "layouts__BasicLayout" */ "../../layouts/BasicLayout"
                ),
              LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                .default
            })
          : require("../../layouts/BasicLayout").default,
        authority: ["admin", "user"],
        routes: [
          {
            path: "/",
            redirect: "/welcome",
            exact: true
          },
          {
            path: "/welcome",
            name: "welcome",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Welcome" */ "../Welcome"),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../Welcome").default,
            exact: true
          },
          {
            path: "/circle",
            name: "circle",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__draw__circle" */ "../draw/circle"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../draw/circle").default,
            exact: true
          },
          {
            path: "/mapbox",
            name: "MapBox",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__mapbox__MapBox" */ "../mapbox/MapBox"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../mapbox/MapBox").default,
            exact: true
          },
          {
            path: "/ArcGISStaticXYZ",
            name: "ArcGISStaticXYZ",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISStaticXYZ" */ "../arcgis/ArcGISStaticXYZ"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISStaticXYZ").default,
            exact: true
          },
          {
            path: "/ArcGISImageLayer",
            name: "ArcGISImageLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISImageLayer" */ "../arcgis/ArcGISImageLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISImageLayer").default,
            exact: true
          },
          {
            path: "/ArcGISTileLayer",
            name: "ArcGISTileLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISTileLayer" */ "../arcgis/ArcGISTileLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISTileLayer").default,
            exact: true
          },
          {
            path: "/ArcGISXYZLayer",
            name: "ArcGISXYZLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISXYZLayer" */ "../arcgis/ArcGISXYZLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISXYZLayer").default,
            exact: true
          },
          {
            path: "/ArcGISXYZLayer2",
            name: "ArcGISXYZLayer2",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISXYZLayer2" */ "../arcgis/ArcGISXYZLayer2"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISXYZLayer2").default,
            exact: true
          },
          {
            path: "/WMSImageLayer",
            name: "WMSImageLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__wms__WMSImageLayer" */ "../wms/WMSImageLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../wms/WMSImageLayer").default,
            exact: true
          },
          {
            path: "/WMSTileLayer",
            name: "WMSTileLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__wms__WMSTileLayer" */ "../wms/WMSTileLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../wms/WMSTileLayer").default,
            exact: true
          },
          {
            path: "/WFSPoint2",
            name: "WFSPoint2",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__wfs__WFSPoint2" */ "../wfs/WFSPoint2"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../wfs/WFSPoint2").default,
            exact: true
          },
          {
            path: "/WFSPoint",
            name: "WFSPoint",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__wfs__WFSPoint" */ "../wfs/WFSPoint"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../wfs/WFSPoint").default,
            exact: true
          },
          {
            path: "/QueryLayer",
            name: "QueryLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__QueryLayer" */ "../arcgis/QueryLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/QueryLayer").default,
            exact: true
          },
          {
            path: "/QuerySimple",
            name: "QuerySimple",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__QuerySimple" */ "../arcgis/QuerySimple"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/QuerySimple").default,
            exact: true
          },
          {
            path: "/BigData",
            name: "BigData",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__pop__BigData" */ "../pop/BigData"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../pop/BigData").default,
            exact: true
          },
          {
            path: "/SelectPop",
            name: "SelectPop",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__pop__SelectPop" */ "../pop/SelectPop"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../pop/SelectPop").default,
            exact: true
          },
          {
            path: "/BigData2",
            name: "BigData2",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__pop__BigData2" */ "../pop/BigData2"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../pop/BigData2").default,
            exact: true
          },
          {
            path: "/ArcGISVectorTileLayer",
            name: "ArcGISVectorTileLayer",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISVectorTileLayer" */ "../arcgis/ArcGISVectorTileLayer"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISVectorTileLayer").default,
            exact: true
          },
          {
            path: "/ArcGISVectorTileLayer2",
            name: "ArcGISVectorTileLayer2",
            icon: "smile",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(
                      /* webpackChunkName: "p__arcgis__ArcGISVectorTileLayer2" */ "../arcgis/ArcGISVectorTileLayer2"
                    ),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../arcgis/ArcGISVectorTileLayer2").default,
            exact: true
          },
          {
            path: "/admin",
            name: "admin",
            icon: "crown",
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__Admin" */ "../Admin"),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../Admin").default,
            authority: ["admin"],
            exact: true
          },
          {
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () =>
                    import(/* webpackChunkName: "p__404" */ "../404"),
                  LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                    .default
                })
              : require("../404").default,
            exact: true
          },
          {
            component: () =>
              React.createElement(
                require("/Users/wangjianjun/IdeaProjects/gis_demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
                  .default,
                { pagesPath: "src/pages", hasRoutesInConfig: true }
              )
          }
        ]
      },
      {
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () =>
                import(/* webpackChunkName: "p__404" */ "../404"),
              LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
                .default
            })
          : require("../404").default,
        exact: true
      },
      {
        component: () =>
          React.createElement(
            require("/Users/wangjianjun/IdeaProjects/gis_demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
              .default,
            { pagesPath: "src/pages", hasRoutesInConfig: true }
          )
      }
    ]
  },
  {
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import(/* webpackChunkName: "p__404" */ "../404"),
          LoadingComponent: require("/Users/wangjianjun/IdeaProjects/gis_demo/src/components/PageLoading/index")
            .default
        })
      : require("../404").default,
    exact: true
  },
  {
    component: () =>
      React.createElement(
        require("/Users/wangjianjun/IdeaProjects/gis_demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js")
          .default,
        { pagesPath: "src/pages", hasRoutesInConfig: true }
      )
  }
];
window.g_routes = routes;
const plugins = require("umi/_runtimePlugin");
plugins.applyForEach("patchRoutes", { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach("onRouteChange", {
        initialValue: {
          routes,
          location,
          action
        }
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf("callback(history.location, history.action)") > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
