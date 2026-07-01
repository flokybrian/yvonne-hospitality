import { Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import Button from "@/components/common/Button";
import styles from "./Hero.module.css";

export default function HeroButtons() {
    return (
        <div className={styles.heroButtons}>
            {/* View My Portfolio → /portfolio */}
            <Link to="/portfolio">
                <Button>View My Portfolio</Button>
            </Link>

            {/* Contact Me → /contact */}
            <Link to="/contact">
                <Button variant="outline">Contact Me</Button>
            </Link>

            {/* Download CV → opens the HTML CV in a new tab for print/save as PDF */}
            <a
                href="/cv/yvonne-agane-mugasia-cv.html"
                target="_blank"
                rel="noopener noreferrer"
                download="Yvonne-Agane-Mugasia-CV.html"
                className={styles.downloadBtn}
            >
                <LuDownload size={16} />
                Download CV
            </a>
        </div>
    );
}
