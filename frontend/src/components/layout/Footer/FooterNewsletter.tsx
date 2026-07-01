import { useState } from "react";
import styles from "./Footer.module.css";

export default function FooterNewsletter() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSent(true);
            setEmail("");
        }
    };

    return (
        <div>
            <h3 className={styles.colTitle}>Newsletter</h3>
            <p className={styles.newsletterDesc}>
                Subscribe for hospitality insights and updates.
            </p>

            {sent ? (
                <p style={{ color: "var(--primary)", fontSize: "0.875rem" }}>
                    ✓ Thanks for subscribing!
                </p>
            ) : (
                <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.newsletterInput}
                        required
                    />
                    <button type="submit" className={styles.newsletterBtn}>
                        Subscribe
                    </button>
                </form>
            )}
        </div>
    );
}
