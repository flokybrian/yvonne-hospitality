import { services } from "@/data/services";

import ServiceCard from "./ServiceCard";

import styles from "./ServicesPreview.module.css";

export default function ServiceGrid(){

return(

<div className={styles.grid}>

{

services.map(service=>(

<ServiceCard

key={service.id}

service={service}

/>

))

}

</div>

);

}