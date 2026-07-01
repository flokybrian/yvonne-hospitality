import Container from "@/components/common/Container";

import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroImage from "./HeroImage";
import HeroStats from "./HeroStats";
import HeroSocials from "./HeroSocials";

import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <Container>
                <div className={styles.grid}>

                    <div className={styles.left}>
                        <HeroContent />
                        <HeroButtons />
                        <HeroSocials />
                    </div>

                    <div className={styles.right}>
                        <HeroImage />
                    </div>

                </div>

                <HeroStats />

            </Container>
        </section>
    );
}