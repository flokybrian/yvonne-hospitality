import { ReactNode } from "react";
import styles from "./Container.module.css";

interface Props {
    children: ReactNode;
}

export default function Container({ children }: Props) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
}