import { ReactNode } from "react";

interface Props {

    children?: ReactNode;

}

export default function CardFooter({

    children

}: Props) {

    if (!children) return null;

    return (

        <div>

            {children}

        </div>

    );

}