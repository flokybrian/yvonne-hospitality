import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";
import clsx from "clsx";

export default function Button({
    children,
    variant = "primary",
    fullWidth = false,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                fullWidth && styles.fullWidth,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}