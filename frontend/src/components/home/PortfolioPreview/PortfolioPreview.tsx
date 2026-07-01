import Container from "@/components/common/Container";

import SectionHeading from "@/components/common/SectionHeading";

import PortfolioGrid from "./PortfolioGrid";

import PortfolioCTA from "./PortfolioCTA";

export default function PortfolioPreview(){

return(

<section>

<Container>

<SectionHeading

subtitle="Portfolio"

title="Recent Hospitality Experiences"

description="A glimpse into some of our recent premium hospitality and event management projects."

center

/>

<PortfolioGrid/>

<PortfolioCTA/>

</Container>

</section>

);

}