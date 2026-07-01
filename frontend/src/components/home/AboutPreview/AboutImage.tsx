import ExperienceBadge from "./ExperienceBadge";
import styles from "./AboutPreview.module.css";

export default function AboutImage(){
    return(
        <div className={styles.imageWrapper}>
            <img
                src="/images/about/about.jpg"
                alt="Yvonne at work"
            />
            <ExperienceBadge/>
        </div>
    );
}