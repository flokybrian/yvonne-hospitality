import { useEffect,useState } from "react";

import repository, { Portfolio } from "@/repository/portfolio.repository";

export default function usePortfolio(){

const[data,setData]=useState<Portfolio[]>([]);

useEffect(()=>{

repository.getPortfolio().then(setData);

},[]);

return data;

}