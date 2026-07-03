import { useState } from "react";
import { Link } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import Button from "@/components/common/Button";
import styles from "./Hero.module.css";

export default function HeroButtons() {
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        setTimeout(() => setDownloading(false), 3000);
    };

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

            {/* Download CV with progress message */}
            <a
                href="/cv/yvonne-agane-mugasia-cv.html"
                target="_blank"
                rel="noopener noreferrer"
                download="Yvonne-Agane-Mugasia-CV.html"
                className={styles.downloadBtn}
                onClick={handleDownload}
            >
                <LuDownload size={16} />
                {downloading ? "Downloading..." : "Download CV"}
            </a>
        </div>
    );
}
