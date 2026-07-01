export interface Portfolio {

    id:number;

    title:string;

    category:string;

    image:string;

}

export class PortfolioRepository{

    async getPortfolio(){

        return [

            {
                id: 1,
                title: "Luxury Wedding Event",
                category: "Event Management",
                image: "/images/portfolio/portfolio1.jpg"   // food2
            },

            {
                id: 2,
                title: "Corporate Conference",
                category: "Event Planning",
                image: "/images/portfolio/portfolio2.jpg"   // food1
            },

            {
                id: 3,
                title: "Gala Dinner",
                category: "Guest Experience",
                image: "/images/portfolio/portfolio3.jpg"   // profile
            }

        ];

    }

}

export default new PortfolioRepository();