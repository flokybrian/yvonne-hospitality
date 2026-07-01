import Card from "@/components/common/Card";

interface Props{

item:any;

}

export default function PortfolioItem({

item

}:Props){

return(

<Card

image={item.image}

title={item.title}

badge={item.category}

/>

);

}