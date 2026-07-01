import styles from "./Hero.module.css";

const stats = [
    { value: "30+", label: "Events Managed" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "15+", label: "Happy Clients" },
    { value: "3+", label: "Years of Experience" }
];

export default function HeroStats() {
    return (
        <div className={styles.heroStats}>
            {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                    <h3>{stat.value}</h3>
                    <p>{stat.label}</p>
                </div>
            ))}
        </div>
    );
}