import GalleryCard from "./GalleryCard";

import { GalleryItem } from "@/data/gallery";

import styles from "./GalleryPreview.module.css";

interface Props{

items:GalleryItem[];

}

export default function GalleryGrid({

items

}:Props){

return(

<div className={styles.grid}>

{

items.map(item=>(

<GalleryCard

key={item.id}

item={item}

/>

))

}

</div>

);

}