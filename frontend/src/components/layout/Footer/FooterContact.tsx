import { LuPhone, LuMail, LuMapPin } from "react-icons/lu";
import { siteContent } from "@/data/siteContent";
import styles from "./Footer.module.css";

export default function FooterContact() {
    return (
        <div>
            <h3 className={styles.colTitle}>Get In Touch</h3>
            <div className={styles.contactList}>
                <a href={`tel:${siteContent.contact.phone}`} className={styles.contactItem}>
                    <LuPhone size={14} className={styles.contactIcon} />
                    {siteContent.contact.phone}
                </a>
                <a href={`mailto:${siteContent.contact.email}`} className={styles.contactItem}>
                    <LuMail size={14} className={styles.contactIcon} />
                    {siteContent.contact.email}
                </a>
                <span className={styles.contactItem}>
                    <LuMapPin size={14} className={styles.contactIcon} />
                    {siteContent.contact.address}
                </span>
            </div>
        </div>
    );
}
