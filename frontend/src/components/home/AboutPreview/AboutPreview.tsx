import Container from "@/components/common/Container";

import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";
import ServicesIcons from "./ServicesIcons";

import styles from "./AboutPreview.module.css";

export default function AboutPreview(){

return(

<section className={styles.about}>

<Container>

<div className={styles.grid}>

<AboutImage/>

<AboutContent/>

</div>

<ServicesIcons />

</Container>

</section>

);

}