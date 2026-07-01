import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";

import TestimonialSlider from "./TestimonialSlider";

export default function Testimonials(){

return(

<section>

<Container>

<SectionHeading

subtitle="Testimonials"

title="What Our Clients Say"

description="The trust of our clients is our greatest achievement."

center

/>

<TestimonialSlider/>

</Container>

</section>

);

}