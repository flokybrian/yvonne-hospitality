import { useState, useEffect } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function ScrollTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                position: "fixed",
                bottom: "30px",
                right: "30px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--primary)",
                color: "white",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "var(--shadow-md)",
                zIndex: 999,
                transition: "var(--transition)"
            }}
        >
            <LuArrowUp />
        </button>
    );
}
