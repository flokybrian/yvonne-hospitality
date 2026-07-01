import styles from "./Hero.module.css";

export default function HeroImage() {
    return (
        <div className={styles.imageContainer}>
            <img
                src="/images/hero/hero.jpg"
                alt="Yvonne - Hospitality & Management Professional"
                loading="eager"
                className={styles.heroImg}
            />
        </div>
    );
}