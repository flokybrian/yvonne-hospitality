import { LuCalendarDays, LuUsers, LuBuilding2, LuTrendingUp, LuGraduationCap, LuSettings2 } from "react-icons/lu";
import styles from "./AboutPreview.module.css";

const serviceItems = [
    {
        icon: <LuCalendarDays size={36} />,
        title: "Event Management",
        description: "Professional planning and coordination of memorable events."
    },
    {
        icon: <LuUsers size={36} />,
        title: "Guest Relations",
        description: "Ensuring guest satisfaction and building lasting relationships."
    },
    {
        icon: <LuBuilding2 size={36} />,
        title: "Corporate Hospitality",
        description: "Executive and business event hosting with excellence."
    },
    {
        icon: <LuTrendingUp size={36} />,
        title: "Hospitality Consulting",
        description: "Improving customer experience and service quality."
    },
    {
        icon: <LuGraduationCap size={36} />,
        title: "Staff Training",
        description: "Training teams to deliver outstanding hospitality service."
    },
    {
        icon: <LuSettings2 size={36} />,
        title: "Operations Management",
        description: "Efficient hospitality operations and quality assurance."
    }
];

export default function ServicesIcons() {
    return (
        <div className={styles.servicesIconsWrapper}>
            <p className={styles.servicesIconsLabel}>HOW I CAN HELP</p>
            <div className={styles.servicesIconsGrid}>
                {serviceItems.map((item) => (
                    <div key={item.title} className={styles.serviceIconItem}>
                        <div className={styles.serviceIconSymbol}>{item.icon}</div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
