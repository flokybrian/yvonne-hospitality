import { Link } from "react-router-dom";
import { navigation } from "@/config/navigation";
import styles from "./Footer.module.css";

export default function FooterNavigation() {
    return (
        <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.links}>
                {navigation.map(item => (
                    <li key={item.path}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
