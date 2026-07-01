import RatingStars from "./RatingStars";
import { Testimonial } from "@/data/testimonials";
import styles from "./Testimonials.module.css";

interface Props {
    testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: Props) {
    return (
        <div className={styles.card}>
            <RatingStars rating={testimonial.rating} />

            <p className={styles.review}>
                "{testimonial.review}"
            </p>

            <div className={styles.clientAnon}>
                <span className={styles.anonLabel}>— A Satisfied Client</span>
            </div>
        </div>
    );
}
