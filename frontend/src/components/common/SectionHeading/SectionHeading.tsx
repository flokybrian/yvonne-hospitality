import styles from "./SectionHeading.module.css";
import { SectionHeadingProps } from "./SectionHeading.types";
import clsx from "clsx";

export default function SectionHeading({
    subtitle,
    title,
    description,
    center=false
}:SectionHeadingProps){

return(

<div className={clsx(styles.heading,center&&styles.center)}>

{subtitle&&<span>{subtitle}</span>}

<h2>{title}</h2>

{description&&<p>{description}</p>}

</div>

);

}