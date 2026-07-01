import { Link } from "react-router-dom";
import Button from "@/components/common/Button";
import styles from "./ServicesPreview.module.css";

export default function ServiceCTA(){

return(

<div className={styles.cta}>

<Link to="/services">
<Button>View All Services</Button>
</Link>

</div>

);

}