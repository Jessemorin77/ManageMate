import { env } from "~/env";

interface Category {
    title: string;
}

interface Location {
    address1: string;
    city: string;
    zip_code: string;
    state: string;
    display_address: string[];
}

interface Business {
    id: string;
    name: string;
    imageUrl: string;
    url: string;
    phone: string;
    categories: Category[];
    rating: number;
    location: Location;
    photos: string[];
}

export async function POST(request: Request) {
    console.log("DINGGGGGGG")
    const requestData = await request.json();

    const businessId = requestData.businessId;
    const url = `https://api.yelp.com/v3/businesses/${businessId}`;


    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + env.YELP_API_KEY,
            }
        })
        
        if(!response.ok){
            throw new Error(`error in fetch ${response.status}`);
        }

        const responseData = await response.json();

        const formattedData: Business = {
            id: responseData.id,
            name: responseData.name,
            imageUrl: responseData.image_url, // Ensure property names match the API response
            url: responseData.url,
            phone: responseData.phone,
            categories: responseData.categories,
            rating: responseData.rating,
            location: responseData.location,
            photos: responseData.photos
        };
        console.log("origonal data: ", requestData)
        console.log("formated Data: ", formattedData)
        return Response.json(formattedData);
    } catch(error) {
        console.error("error in catch", error)
    }
}