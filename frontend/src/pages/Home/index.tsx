import CallToAction from "@/components/home/CallToAction";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/testimonials/Testimonials";

export default function Home(){

    return(

        <>

            <Hero/>

            <AboutPreview/>

            <ServicesPreview/>

            <PortfolioPreview/>

            <GalleryPreview/>

            <Testimonials/>

            <CallToAction/>

        </>

    );

}