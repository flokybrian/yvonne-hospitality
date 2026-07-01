interface Props {

    badge?: string;

}

export default function CardOverlay({

    badge

}: Props) {

    if (!badge) return null;

    return (

        <span>

            {badge}

        </span>

    );

}