export interface Testimonial {
    id: number;
    rating: number;
    review: string;
    featured: boolean;
}

export const testimonials: Testimonial[] = [
    {
        id: 1,
        rating: 5,
        review: "Yvonne's professionalism, attention to detail and dedication made our event truly unforgettable. Every single detail was handled with such care and precision — we couldn't have asked for a better experience.",
        featured: true
    }
];
