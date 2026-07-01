import PortfolioItem from "./PortfolioItem";

import usePortfolio from "./hooks/usePortfolio";

import styles from "./PortfolioPreview.module.css";

export default function PortfolioGrid(){

const portfolio=usePortfolio();

return(

<div className={styles.grid}>

{

portfolio.map((item:any)=>(

<PortfolioItem

key={item.id}

item={item}

/>

))

}

</div>

);

}