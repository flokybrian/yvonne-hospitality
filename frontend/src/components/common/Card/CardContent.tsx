interface Props {
    title: string;
    description?: string;
}

export default function CardContent({
    title,
    description
}: Props) {

    return (

        <div>

            <h3>{title}</h3>

            {description &&

                <p>{description}</p>

            }

        </div>

    );

}