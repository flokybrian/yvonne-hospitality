export interface GalleryItem {
    id: number;
    title: string;
    category: string;
    image: string;
}

export const galleryItems: GalleryItem[] = [
    {
        id: 1,
        title: "Gourmet Experience",
        category: "Food",
        image: "/images/gallery/gallery1.jpg"   // food2
    },
    {
        id: 2,
        title: "Culinary Arts",
        category: "Food",
        image: "/images/gallery/gallery2.jpg"   // food1
    },
    {
        id: 3,
        title: "Hospitality Professional",
        category: "Portfolio",
        image: "/images/gallery/gallery3.jpg"   // profile
    }
];
