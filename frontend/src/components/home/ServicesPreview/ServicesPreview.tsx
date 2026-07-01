import Container from "@/components/common/Container";

import SectionHeading from "@/components/common/SectionHeading";

import ServiceGrid from "./ServiceGrid";

import ServiceCTA from "./ServiceCTA";

export default function ServicesPreview(){

return(

<section style={{ background: "var(--secondary)" }}>

<Container>

<SectionHeading

subtitle="My Services"

title="How I Can Help"

description="A range of hospitality and management services designed to create unforgettable experiences."

center

/>

<ServiceGrid/>

<ServiceCTA/>

</Container>

</section>

);

}