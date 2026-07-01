import Container from "@/components/common/Container";

import FooterBrand from "./FooterBrand";
import FooterNavigation from "./FooterNavigation";
import FooterServices from "./FooterServices";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";
import FooterSocials from "./FooterSocials";
import Copyright from "./Copyright";
import ScrollTop from "./ScrollTop";

import styles from "./Footer.module.css";

export default function Footer(){

return(

<footer className={styles.footer}>

<Container>

<div className={styles.grid}>

<FooterBrand/>

<FooterNavigation/>

<FooterServices/>

<FooterContact/>

<FooterNewsletter/>

</div>

<FooterSocials/>

<Copyright/>

<ScrollTop/>

</Container>

</footer>

);

}