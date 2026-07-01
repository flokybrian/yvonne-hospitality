import { NavLink } from "react-router-dom";
import { navigation } from "@/config/navigation";

import styles from "./Navbar.module.css";

export default function NavLinks() {
    return (
        <ul className={styles.links}>
            {navigation.map((item) => (
                <li key={item.path}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? styles.active : ""
                        }
                    >
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}