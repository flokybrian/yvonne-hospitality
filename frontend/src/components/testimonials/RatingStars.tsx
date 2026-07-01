import { FaStar } from "react-icons/fa";
import styles from "./Testimonials.module.css";

interface Props {
    rating: number;
}

export default function RatingStars({ rating }: Props) {
    return (
        <div className={styles.ratingStars}>
            {Array.from({ length: rating }).map((_, index) => (
                <FaStar key={index} />
            ))}
        </div>
    );
}
