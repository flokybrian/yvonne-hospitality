import { Link } from "react-router-dom";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";
import { Service } from "@/data/services";

interface Props{

service:Service;

}

export default function ServiceCard({

service

}:Props){

return(

<Card

image={service.image}

title={service.title}

description={service.description}

badge={service.badge}

footer={

<Link to="/services">
<Button>Learn More</Button>
</Link>

}

/>

);

}