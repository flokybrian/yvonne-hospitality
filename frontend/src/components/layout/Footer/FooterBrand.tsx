import { Link } from "react-router-dom";
import YvonneLogo from "@/components/common/Logo";
import { siteContent } from "@/data/siteContent";
import styles from "./Footer.module.css";

export default function FooterBrand() {
    return (
        <div className={styles.brand}>
            <Link to="/" aria-label="Yvonne Hospitality – Home">
                <YvonneLogo variant="light" size={42} />
            </Link>
            <p className={styles.brandTagline}>
                {siteContent.company.tagline}
            </p>
            <p className={styles.brandDesc}>
                Creating exceptional guest experiences through hospitality,
                event management and service excellence.
            </p>
        </div>
    );
}
