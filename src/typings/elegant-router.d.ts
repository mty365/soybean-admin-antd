/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

declare module "@elegant-router/types" {
  type RouteRecordRaw = import("vue-router").RouteRecordRaw;

  /**
   * route layout
   */
  export type RouteLayout = "base" | "blank";

  /**
   * route map
   */
  export type RouteMap = {
    "root": "/";
    "not-found": "/:pathMatch(.*)*";
    "403": "/403";
    "404": "/404";
    "500": "/500";
    "home": "/home";
    "login": "/login";
    "multi-menu": "/multi-menu";
    "multi-menu_first": "/multi-menu/first";
    "multi-menu_first_child": "/multi-menu/first/child";
    "multi-menu_second": "/multi-menu/second";
    "multi-menu_second_child": "/multi-menu/second/child";
    "multi-menu_second_child_home": "/multi-menu/second/child/home";
    "user": "/user";
    "user_detail": "/user/detail/:id";
    "user_list": "/user/list";
  };

  /**
   * route key
   */
  export type RouteKey = keyof RouteMap;

  /**
   * custom route key
   */ 
  export type CustomRouteKey = Extract<
    RouteKey,
    | "root"
    | "not-found"
  >;

  /**
   * the auto generated route key
   */ 
  export type AutoRouteKey = Exclude<RouteKey, CustomRouteKey>;

  /**
   * the first level route key, which contain the layout of the route
   */
  export type FirstLevelRouteKey = Extract<
    RouteKey,
    | "403"
    | "404"
    | "500"
    | "home"
    | "login"
    | "multi-menu"
    | "user"
  >;

  /**
   * the last level route key, which has the page file
   */
  export type LastLevelRouteKey = Extract<
    RouteKey,
    | "403"
    | "404"
    | "500"
    | "login"
    | "home"
    | "multi-menu_first_child"
    | "multi-menu_second_child_home"
    | "user_detail"
    | "user_list"
  >;

  /**
   * the last level route key as child
   */
  export type LastLevelChildRouteKey = Exclude<LastLevelRouteKey, FirstLevelRouteKey>;

  /**
   * the single level route key
   */
  export type SingleLevelRouteKey = FirstLevelRouteKey & LastLevelRouteKey;

  /**
   * the first level route key, but not the single level
   */
  export type FirstLevelRouteNotSingleKey = Exclude<FirstLevelRouteKey, SingleLevelRouteKey>;

  /**
   * the center level route key
   */
  export type CenterLevelRouteKey = Exclude<AutoRouteKey, FirstLevelRouteKey | LastLevelRouteKey>;

  /**
   * the center level route key
   */
  type GetChildRouteKey<K extends AutoRouteKey, T extends AutoRouteKey = AutoRouteKey> = T extends `${K}${infer R}` ? (R extends '' ? never : T) : never;

  /**
   * the child of single level route
   */
  type SingleLevelRouteChild<K extends string, N = K> = Omit<RouteRecordRaw, 'component' | 'children'> & {
    name: N;
    path: '';
    component: `view.${K}`;
  };
  
  /**
   * the single level route
   */
  type SingleLevelRoute<K extends SingleLevelRouteKey = SingleLevelRouteKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children'> & {
        path: RouteMap[K];
        component: `layout.${RouteLayout}`;
        children: [SingleLevelRouteChild<K>];
      }
    : never;
  
  /**
   * the center level route
   */
  type CenterLevelRoute<K extends CenterLevelRouteKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children' | 'redirect'> & {
        name: K;
        path: RouteMap[K];
        redirect: {
          name: GetChildRouteKey<K>;
        };
      }
    : never;
  
  /**
   * the last level route
   */
  type LastLevelRoute<K extends LastLevelRouteKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children'> & {
        name: K;
        path: RouteMap[K];
        component: `view.${K}`;
      }
    : never;
  
  /**
   * the multi level route
   */
  type MultiLevelRoute<K extends FirstLevelRouteNotSingleKey = FirstLevelRouteNotSingleKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children' | 'redirect'> & {
        name: K;
        path: RouteMap[K];
        component: `layout.${RouteLayout}`;
        redirect: {
          name: GetChildRouteKey<K>;
        };
        children: (CenterLevelRoute<GetChildRouteKey<K>> | LastLevelRoute<GetChildRouteKey<K>>)[];
      }
    : never;
  
  /**
   * the custom first level route
   */
  type CustomSingleLevelRoute<K extends CustomRouteKey = CustomRouteKey> = K extends string 
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children'> & {
        path: RouteMap[K];
        component: `layout.${RouteLayout}`;
        children: [SingleLevelRouteChild<LastLevelRouteKey, K>];
      }
    : never;

  /**
   * the custom multi level route
   */
  type CustomMultiLevelRoute<K extends CustomRouteKey = CustomRouteKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children' | 'redirect'> & {
        name: K;
        path: RouteMap[K];
        component: `layout.${RouteLayout}`;
        children: (CenterLevelRoute<CenterLevelRouteKey> | LastLevelRoute<LastLevelRouteKey>)[];
      }
    : never;

  /**
   * the custom redirect route
   */
  type CustomRedirectRoute<K extends CustomRouteKey = CustomRouteKey> = K extends string
    ? Omit<RouteRecordRaw, 'name' | 'path' | 'component' | 'children'> & {
        name: K;
        path: RouteMap[K];
        redirect: {
          name: Exclude<RouteKey, K>;
        };
      }
    : never;

  /**
   * the custom route
   */
  type CustomRoute = CustomSingleLevelRoute | CustomMultiLevelRoute | CustomRedirectRoute;

  /**
   * the elegant route
   */
  type ElegantRoute = SingleLevelRoute | MultiLevelRoute | CustomRoute;
}
