import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const services = [
    { label: "Event Management",       path: "/services" },
    { label: "Hospitality Management", path: "/services" },
    { label: "Guest Relations",        path: "/services" },
    { label: "Corporate Hospitality",  path: "/services" },
    { label: "Staff Training",         path: "/services" },
];

export default function FooterServices() {
    return (
        <div>
            <h3 className={styles.colTitle}>Services</h3>
            <ul className={styles.links}>
                {services.map(s => (
                    <li key={s.label}>
                        <Link to={s.path}>{s.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
