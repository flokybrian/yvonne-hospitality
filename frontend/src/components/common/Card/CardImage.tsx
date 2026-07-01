interface Props {
    image?: string;
    title: string;
}

export default function CardImage({
    image,
    title
}: Props) {

    return (

        <img
            src={image}
            alt={title}
            loading="lazy"
        />

    );

}