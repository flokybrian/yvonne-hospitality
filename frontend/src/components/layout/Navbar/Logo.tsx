import { Link } from "react-router-dom";
import YvonneLogo from "@/components/common/Logo";

export default function Logo() {
    return (
        <Link to="/" aria-label="Yvonne Hospitality – Home" style={{ display: "flex", alignItems: "center" }}>
            <YvonneLogo variant="dark" size={44} />
        </Link>
    );
}
