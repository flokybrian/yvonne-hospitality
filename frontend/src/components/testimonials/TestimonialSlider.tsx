import { testimonials } from "@/data/testimonials";
import TestimonialCard from "./TestimonialCard";
import styles from "./Testimonials.module.css";

export default function TestimonialSlider() {
    return (
        <div className={styles.singleCard}>
            {testimonials.map(item => (
                <TestimonialCard key={item.id} testimonial={item} />
            ))}
        </div>
    );
}
