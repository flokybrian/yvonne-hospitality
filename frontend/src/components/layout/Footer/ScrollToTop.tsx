import { LuArrowUp } from "react-icons/lu";

export default function ScrollTop(){

const scroll=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

return(

<button

onClick={scroll}

>

<LuArrowUp/>

</button>

);

}