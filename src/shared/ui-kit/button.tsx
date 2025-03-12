import { cn } from "@shared/utils/cn";
import { ComponentPropsWithRef } from "react";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
    disabled?: boolean;
}
// button {
//     border-radius: 8px;
//     border: 1px solid transparent;
//     padding: 0.6em 1.2em;
//     font-size: 1em;
//     font-weight: 500;
//     font-family: inherit;
//     background-color: #1a1a1a;
//     cursor: pointer;
//     transition: border-color 0.25s;
// }
// button:hover {
//     border-color: #646cff;
// }
// button:focus,
// button:focus-visible {
//     outline: 4px auto -webkit-focus-ring-color;
// }

export const Button = (props: ButtonProps) => {
    const { disabled = false, ...rest } = props;

    return (
        <button
            className={cn(
                "h-8 font-medium text-md border cursor-pointer py-1 px-2 transition-colors duration-200 rounded-md border-border",
                {
                    "opacity-50 cursor-not-allowed": disabled,
                    "hover:border-accent": !disabled,
                }
            )}
            disabled={disabled}
            {...rest}
        />
    );
};
