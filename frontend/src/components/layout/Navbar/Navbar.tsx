import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import useScroll from "./hooks/useScroll";

import Button from "@/components/common/Button";
import Container from "@/components/common/Container";

import styles from "./Navbar.module.css";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    const scrolled = useScroll();

    return (

        <header
            className={`${styles.navbar} ${
                scrolled ? styles.scrolled : ""
            }`}
        >
            <Container>

                <nav className={styles.nav}>

                    <Logo />

                    <div className={styles.desktop}>

                        <NavLinks />

                        <Link to="/contact">
                            <Button>
                                Let's Work Together
                            </Button>
                        </Link>

                    </div>

                    <div className={styles.mobile}>

                        <MobileMenu
                            open={open}
                            setOpen={setOpen}
                        />

                    </div>

                </nav>

            </Container>

        </header>

    );

}