import { NextResponse } from "next/server";
import type { NextApiRequest, NextApiResponse } from 'next'
import { redirect } from "next/navigation";
import { env } from "~/env";

interface YelpLocation {
  city: string;
  state: string;
  // Include other location fields if needed
}

interface YelpCategories {
    title: string;
}

interface YelpBusiness {
  id: string;
  name: string;
  location: YelpLocation;
  categories: YelpCategories[];
  phone: string;
  rating: number;
  review_count: number;
  image_url: string;

  // Add other fields from Yelp response as needed
}

interface Business {
  id: string;
  name: string;
  location: YelpLocation;
  categories: YelpCategories;
  phone: string;
  rating: number;
  review_count: number;
  image_url: string;
  // Define other fields for your formatted data as needed
}

export  async function POST(request: Request) {
    console.log('PINGGGGGGGGGGGG')
  const data = await request.json()

  const { zipCode, service } = data;
  console.log("Backend Data: ", data);

  const url = "https://api.yelp.com/v3/businesses/search";
  const params = new URLSearchParams({
    sort_by: "best_match",
    limit: "10",
    location: zipCode, // Use the zipCode from the request
    term: service, // Use the service type from the request
    radius: "5000",
    categories: service.toLowerCase(), // Optional: Adjust as per Yelp's category formats
  });


  try {
    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + env.YELP_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("origonal data: ", data);

    const formattedData: Business[] = data.businesses.map(
      (business: YelpBusiness) => ({
        id: business.id,
        name: business.name,
        city: business.location.city,
        state: business.location.state,
        rating: business.rating,
        ratingCount: business.review_count,
        
        imageUrl: business.image_url,
        // Map other fields as needed
      }),
    );
    console.log(formattedData);

    return Response.json(formattedData);
  } catch (error) {
    console.error("Failed to fetch data from Yelp API", error);
    throw error;
  }
   
  
}