import { ReactNode } from "react";

export interface CardProps {
    image?: string;
    title: string;
    description?: string;
    badge?: string;
    children?: ReactNode;
    footer?: ReactNode;
    overlay?: boolean;
}