import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type SVGProps,
} from "react";

export type Advantage = {
  title: string;
  description: string;
  Icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & RefAttributes<SVGSVGElement>
  >;
};
