import { LuCircleCheck } from "react-icons/lu";

const features=[

"Event Coordination & Management",

"Corporate Hospitality",

"Guest Relations Excellence",

"Tailored Luxury Experiences"

];

export default function AboutFeatures(){

return(

<ul className="about-features">

{

features.map(feature=>(

<li key={feature}>

<LuCircleCheck/>

<span>{feature}</span>

</li>

))

}

</ul>

);

}
