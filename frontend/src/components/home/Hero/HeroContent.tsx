import { motion } from "framer-motion";
import { siteContent } from "@/data/siteContent";
import styles from "./Hero.module.css";

export default function HeroContent() {
    return (
        <>
            <motion.p
                className={styles.badge}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className={styles.badgeLine}></span>
                {siteContent.hero.badge}
            </motion.p>

            <motion.h1
                className={styles.heading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                Bonjour, I'm{" "}
                <span className={styles.highlight}>Yvonne.</span>
            </motion.h1>

            <motion.p
                className={styles.intro}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                I'm{" "}
                <span className={styles.ageHighlight}>
                    {siteContent.hero.age}
                </span>{" "}
                and passionate about creating exceptional guest experiences through hospitality,
                event management, customer relations and service excellence.
            </motion.p>

            <motion.p
                className={styles.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
            >
                {siteContent.hero.description}
            </motion.p>

            <motion.p
                className={styles.quote}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
            >
                {siteContent.hero.quote}
            </motion.p>
        </>
    );
}