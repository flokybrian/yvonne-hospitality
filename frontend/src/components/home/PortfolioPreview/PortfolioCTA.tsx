import Button from "@/components/common/Button";

import { Link } from "react-router-dom";

export default function PortfolioCTA(){

return(

<div style={{

display:"flex",

justifyContent:"center",

marginTop:"70px"

}}>

<Link to="/portfolio">

<Button>

View Portfolio

</Button>

</Link>

</div>

);

}