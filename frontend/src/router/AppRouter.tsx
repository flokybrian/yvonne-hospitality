import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import Gallery from "../pages/Gallery";
import Videos from "../pages/Videos";
import Testimonials from "../pages/Testimonials";
import Contact from "../pages/Contact";

export default function AppRouter() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
    );
}
