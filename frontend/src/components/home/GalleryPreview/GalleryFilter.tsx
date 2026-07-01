import styles from "./GalleryPreview.module.css";

const categories = ["All", "Food", "Portfolio"];

interface Props {
    selected: string;
    onSelect: (category: string) => void;
}

export default function GalleryFilter({ selected, onSelect }: Props) {
    return (
        <div className={styles.galleryFilter}>
            {categories.map(category => (
                <button
                    key={category}
                    className={selected === category ? styles.filterActive : ""}
                    onClick={() => onSelect(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
