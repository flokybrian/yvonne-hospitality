import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaWhatsapp, FaYoutube, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { siteContent } from "@/data/siteContent";
import styles from "./Footer.module.css";

const socials = [
    { icon: <FaInstagram />, href: siteContent.social.instagram, label: "Instagram", color: "#E4405F" },
    { icon: <FaLinkedinIn />, href: siteContent.social.linkedin, label: "LinkedIn", color: "#0077B5" },
    { icon: <FaFacebookF />, href: siteContent.social.facebook, label: "Facebook", color: "#1877F2" },
    { icon: <FaTiktok />, href: siteContent.social.tiktok, label: "TikTok", color: "#000000" },
    { icon: <FaWhatsapp />, href: siteContent.social.whatsapp, label: "WhatsApp", color: "#25D366" },
    { icon: <FaYoutube />, href: siteContent.social.youtube, label: "YouTube", color: "#FF0000" },
    { icon: <FaXTwitter />, href: siteContent.social.x, label: "X (Twitter)", color: "#000000" },
    { icon: <FaDiscord />, href: siteContent.social.discord, label: "Discord", color: "#5865F2" },
    { icon: <SiGmail />, href: siteContent.social.gmail, label: "Gmail", color: "#EA4335" },
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
                        data-tooltip={s.label}
                        style={{ "--brand-color": s.color } as React.CSSProperties}
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
        </div>
    );
}
