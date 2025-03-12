import { ComponentPropsWithRef } from "react";
import { cn } from "@shared/utils/cn";

export interface InputProps extends ComponentPropsWithRef<"input"> {}

export const Input = (props: InputProps) => {
    const {className, ...rest} = props;
    return (
        <input
            className={cn("bg-input border border-border rounded-md p-2", className)}
            {...rest}
        />
    );
};
