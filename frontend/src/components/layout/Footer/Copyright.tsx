import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Copyright() {
    return (
        <div className={styles.copyright}>
            <p>© {new Date().getFullYear()} Yvonne Agane Mugasia. All Rights Reserved.</p>
            <p>
                <Link to="/contact">Contact</Link>
                &nbsp;·&nbsp;
                <a href="/cv/yvonne-agane-mugasia-cv.html" target="_blank" rel="noopener noreferrer">
                    Download CV
                </a>
            </p>
        </div>
    );
}
