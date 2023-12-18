"use client";
import { useEffect, useState } from "react";

interface Category {
  title: string;
}
interface Location{
  display_address: string;
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

export default function Company({ params }: { params: { slug: string } }) {
  const [businessData, setBusinessData] = useState<Business | null>(null); // State to store the response data
  const businessId = params.slug;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fetchDetailsYelpApi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ businessId }), // Corrected body placement
        });
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const responseJson = await response.json();
        setBusinessData(responseJson); // Saving the response data in state
      } catch (error) {
        console.error("Error in fetch", error);
      }
    };

    fetchData();
  }, [businessId]);

  return (
    <div className="p-4">
      {businessData && (
        <div>
          <div className="carousel max-h-60   w-full overflow-hidden sm:max-h-80 md:max-h-96 ">
            {businessData.photos.map((photo, index) => (
              <div
                key={index}
                id={`slide${index + 1}`}
                className="carousel-item relative w-full"
              >
                <img
                  src={photo}
                  className="w-full rounded-xl object-cover"
                  alt={`Business Photo ${index + 1}`}
                />
                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${
                      index === 0 ? businessData.photos.length : index
                    }`}
                    className="btn btn-circle"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      index === businessData.photos.length - 1 ? 1 : index + 2
                    }`}
                    className="btn btn-circle"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center py-4">

          <h1 className="text-bold text-2xl">{businessData.name}</h1>
          <div className="">
            <div className="rating rating-half rating-sm  ">
              {[...Array(10)].map((_, index) => {
                const ratingValue = (index + 1) / 2;
                return (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className={`mask  mask-star-2  ${
                      ratingValue <= businessData.rating ? "bg-blue-500" : ""
                    } ${index % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
                    checked={ratingValue === businessData.rating}
                    readOnly
                  />
                );
              })}
            </div>
          </div>
            </div>

          <div className="p-4">
          <p className="text-sm md:text-base"><span className="font-semibold">Phone:</span> {businessData.phone}</p>
          <p className="text-sm md:text-base"><span className="font-semibold">Location:</span> {businessData.location.display_address} </p>
          <a href={businessData.url} className="text-blue-500 hover:text-blue-700 transition duration-300" target="_blank" rel="noopener noreferrer">Visit Yelp Page</a>
          <h2 className="font-semibold mt-3">Categories:</h2>
          <ul className="list-disc list-inside">
            {businessData.categories.map((category, index) => (
              <li key={index} className="text-sm md:text-base">{category.title}</li>
            ))}
          </ul>
        </div>
        </div>
      )}
    </div>
  );
}
