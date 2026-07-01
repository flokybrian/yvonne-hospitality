import { GalleryItem } from "@/data/gallery";

import styles from "./GalleryPreview.module.css";

interface Props{

item:GalleryItem;

}

export default function GalleryCard({

item

}:Props){

return(

<div className={styles.card}>

<img

src={item.image}

alt={item.title}

loading="lazy"

/>

<div className={styles.overlay}>

<h3>

{item.title}

</h3>

<p>

{item.category}

</p>

</div>

</div>

);

}