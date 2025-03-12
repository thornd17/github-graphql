import { type ComponentPropsWithRef, type ElementType } from "react";

export type PageContainerProps<T extends ElementType> =ComponentPropsWithRef<T> & {
    component?: T;
};

export const PageContainer = <T extends ElementType>(props: PageContainerProps<T>) => {
    const { component, ...rest } = props;

    const Comp = component ?? "div";

    return <Comp className="px-4 mt-4 m-auto max-w-[1024px] 2xl:max-w-[1440px]" {...rest} />;
};
