import { JSXElement } from '@babel/types';

export type RouteType = {
  path: string;
  component: any;
  children?: RouteType[];
  isProtected?: boolean;
};
