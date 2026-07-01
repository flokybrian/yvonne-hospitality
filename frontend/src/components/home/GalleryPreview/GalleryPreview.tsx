import { useMemo, useState } from "react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

import { galleryItems } from "@/data/gallery";

import GalleryFilter from "./GalleryFilter";
import GalleryGrid from "./GalleryGrid";

export default function GalleryPreview(){

const[selected,setSelected]=useState("All");

const filtered=useMemo(()=>{

if(selected==="All") return galleryItems;

return galleryItems.filter(

item=>item.category===selected

);

},[selected]);

return(

<section>

<Container>

<SectionHeading

subtitle="Gallery"

title="Moments We Created"

description="A collection of unforgettable hospitality and event experiences."

center

/>

<GalleryFilter

selected={selected}

onSelect={setSelected}

/>

<GalleryGrid

items={filtered}

/>

</Container>

</section>

);

}