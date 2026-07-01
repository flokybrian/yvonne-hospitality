import styles from "./Card.module.css";

import { CardProps } from "./Card.types";

import CardImage from "./CardImage";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import CardOverlay from "./CardOverlay";

export default function Card({

    image,
    title,
    description,
    badge,
    footer

}: CardProps) {

    return (

        <article className={styles.card}>

            {image &&

                <div className={styles.imageWrapper}>

                    <CardImage
                        image={image}
                        title={title}
                    />

                    <CardOverlay
                        badge={badge}
                    />

                </div>

            }

            <div className={styles.body}>

                <CardContent
                    title={title}
                    description={description}
                />

                <CardFooter>

                    {footer}

                </CardFooter>

            </div>

        </article>

    );

}