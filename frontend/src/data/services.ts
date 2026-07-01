export interface Service {

    id:number;

    title:string;

    description:string;

    image:string;

    badge:string;

}

export const services:Service[]=[

{

id:1,

title:"Event Management",

description:"Professional planning and coordination of memorable events and corporate functions.",

image:"/images/services/service1.jpg",

badge:"Popular"

},

{

id:2,

title:"Hospitality Management",

description:"Delivering exceptional guest experiences and operational excellence from start to finish.",

image:"/images/services/service2.jpg",

badge:"Premium"

},

{

id:3,

title:"Guest Relations",

description:"Building lasting relationships through outstanding client care and VIP concierge services.",

image:"/images/services/service3.jpg",

badge:"Luxury"

}

];
