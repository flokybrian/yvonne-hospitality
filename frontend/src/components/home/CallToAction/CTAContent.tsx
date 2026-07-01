import { siteContent } from "@/data/siteContent";

import CTAButtons from "./CTAButtons";

import ContactQuickActions from "./ContactQuickActions";

import styles from "./CallToAction.module.css";

export default function CTAContent(){

    return(

        <div className={styles.content}>

            <p>READY TO WORK WITH US?</p>

            <h2>

                {siteContent.cta.title}

            </h2>

            <p>

                {siteContent.cta.subtitle}

            </p>

            <CTAButtons/>

            <ContactQuickActions/>

        </div>

    );

}