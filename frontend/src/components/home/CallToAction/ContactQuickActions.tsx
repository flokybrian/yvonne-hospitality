import { LuPhone, LuMail } from "react-icons/lu";
import { siteContent } from "@/data/siteContent";
import styles from "./CallToAction.module.css";

export default function ContactQuickActions(){

    return(

        <div className={styles.quickActions}>

            <a href={`tel:${siteContent.contact.phone}`}>
                <LuPhone/>
                {siteContent.contact.phone}
            </a>

            <a href={`mailto:${siteContent.contact.email}`}>
                <LuMail/>
                {siteContent.contact.email}
            </a>

        </div>

    );

}