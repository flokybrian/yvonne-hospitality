import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import { siteContent } from "@/data/siteContent";
import styles from "./AboutPreview.module.css";

export default function AboutContent() {
    return (
        <div className={styles.content}>
            <p className={styles.subtitle}>{siteContent.about.subtitle}</p>

            <h2 className={styles.title}>
                A Passion for People.<br />
                A Commitment to Excellence.
            </h2>

            <p className={styles.text}>{siteContent.about.description1}</p>
            <p className={styles.text}>{siteContent.about.description2}</p>

            <blockquote className={styles.quote}>
                {siteContent.about.quote}
            </blockquote>

            <Link to="/about">
                <Button>{siteContent.about.ctaButton}</Button>
            </Link>
        </div>
    );
}