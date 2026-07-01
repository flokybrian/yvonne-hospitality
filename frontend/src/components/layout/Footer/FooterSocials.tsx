import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { siteContent } from "@/data/siteContent";
import styles from "./Footer.module.css";

const socials = [
    { icon: <FaInstagram />, href: siteContent.social.instagram, label: "Instagram" },
    { icon: <FaLinkedinIn />, href: siteContent.social.linkedin, label: "LinkedIn" },
    { icon: <FaFacebookF />, href: siteContent.social.facebook, label: "Facebook" },
    { icon: <FaTiktok />, href: siteContent.social.tiktok, label: "TikTok" },
    { icon: <FaWhatsapp />, href: siteContent.social.whatsapp, label: "WhatsApp" },
];

export default function FooterSocials() {
    return (
        <div className={styles.socialsRow}>
            <span className={styles.socialsLabel}>Follow Yvonne</span>
            <div className={styles.socials}>
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className={styles.socialIcon}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
