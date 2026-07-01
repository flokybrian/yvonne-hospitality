import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { LuMenu, LuX, LuPhone, LuMail } from "react-icons/lu";
import { FaInstagram, FaLinkedinIn, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

import YvonneLogo from "@/components/common/Logo";
import { navigation } from "@/config/navigation";
import { siteContent } from "@/data/siteContent";
import styles from "./Navbar.module.css";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const socials = [
    { icon: <FaInstagram />, href: siteContent.social.instagram, label: "Instagram" },
    { icon: <FaLinkedinIn />, href: siteContent.social.linkedin, label: "LinkedIn" },
    { icon: <FaFacebookF />, href: siteContent.social.facebook, label: "Facebook" },
    { icon: <FaTiktok />, href: siteContent.social.tiktok, label: "TikTok" },
    { icon: <FaWhatsapp />, href: siteContent.social.whatsapp, label: "WhatsApp" },
];

export default function MobileMenu({ open, setOpen }: Props) {
    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* Hamburger toggle */}
            <button
                className={styles.hamburger}
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
            >
                {open ? <LuX size={26} /> : <LuMenu size={26} />}
            </button>

            {/* Backdrop */}
            {open && (
                <div
                    className={styles.backdrop}
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Slide-in drawer */}
            <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
                {/* Drawer header */}
                <div className={styles.drawerHeader}>
                    <YvonneLogo variant="dark" size={40} />
                    <button
                        className={styles.drawerClose}
                        onClick={() => setOpen(false)}
                        aria-label="Close menu"
                    >
                        <LuX size={22} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className={styles.drawerNav}>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ""}`
                            }
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* CTA button */}
                <div className={styles.drawerCta}>
                    <Link
                        to="/contact"
                        className={styles.drawerCtaBtn}
                        onClick={() => setOpen(false)}
                    >
                        Let's Work Together
                    </Link>
                </div>

                {/* Contact info */}
                <div className={styles.drawerContact}>
                    <a href={`tel:${siteContent.contact.phone}`} className={styles.drawerContactItem}>
                        <LuPhone size={15} />
                        {siteContent.contact.phone}
                    </a>
                    <a href={`mailto:${siteContent.contact.email}`} className={styles.drawerContactItem}>
                        <LuMail size={15} />
                        {siteContent.contact.email}
                    </a>
                </div>

                {/* Socials */}
                <div className={styles.drawerSocials}>
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className={styles.drawerSocialIcon}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
}
