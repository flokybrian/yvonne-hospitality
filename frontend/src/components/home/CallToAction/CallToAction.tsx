import { LuMail, LuPhone } from "react-icons/lu";
import Container from "@/components/common/Container";
import { siteContent } from "@/data/siteContent";
import styles from "./CallToAction.module.css";

export default function CallToAction() {
    return (
        <section className={styles.cta}>
            <Container>
                <div className={styles.inner}>

                    {/* Icon */}
                    <div className={styles.iconWrap}>
                        <LuMail />
                    </div>

                    {/* Text */}
                    <div className={styles.textWrap}>
                        <h3>{siteContent.cta.title}</h3>
                        <p>{siteContent.cta.subtitle}</p>
                    </div>

                    {/* Right: button + phone */}
                    <div className={styles.ctaRight}>
                        <a
                            href={`mailto:${siteContent.contact.email}`}
                            className={styles.getInTouchBtn}
                        >
                            Get In Touch
                        </a>

                        <a
                            href={`tel:${siteContent.contact.phone}`}
                            className={styles.phoneWrap}
                        >
                            <span className={styles.phoneIcon}>
                                <LuPhone />
                            </span>
                            <span className={styles.phoneText}>
                                <span>Call Me</span>
                                <span>{siteContent.contact.phone}</span>
                            </span>
                        </a>
                    </div>

                </div>
            </Container>
        </section>
    );
}
