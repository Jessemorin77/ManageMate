"use client";

import Select from "~/_components/DataInput/Selector";
import daisySelect from "~/_components/DataInput/daisySelector";
import React, { useState } from "react";
import { error } from "console";
import Image from "next/image";
import { string } from "zod";
import Link from "next/link";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "", value: "" },
  { label: "Cleaner", value: "cleaner" },
  { label: "Plumber", value: "plumber" },
  { label: "Carpenter", value: "carpenter" },
  { label: "Electrician", value: "electrician" },
  { label: "Mechanic", value: "mechanic" },
  { label: "Cook", value: "cook" },
];

interface DataItem {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
}

export default function Services() {
  const [zipCode, setZipCode] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedValue, zipCode);
    if (selectedValue == "" || zipCode == undefined) {
      alert("please select a value service, or zipcode");
      console.error("invalid input");
      return;
    }
    const dataToSend = {
      service: selectedValue,
      zipCode: zipCode,
    };
    try {
      const response = await fetch("/api/fetchYelpApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`http error: ${response.status}`);
      }
      const responseJson = await response.json();
      setData(responseJson);
      console.log(response);
    } catch (error) {
      console.error("error in fetch", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <h1 className="text-xl">Search For Service Providers in Your Area!</h1>
        </div>
        <form onSubmit={handleSubmit} className="text-white py-3 ">
          <Select
            options={options}
            onSelect={(value: string) => {
              setSelectedValue(value);
            }}
          />
          <input
            placeholder="ZipCode"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="input input-bordered input-info input-sm"
          />
          <button type="submit" className="btn btn-info btn-sm ml-3">
            Submit
          </button>
        </form>
      </div>
      <div>
        {data.map((item) => (
          <div key={item.name} className="flex justify-center">
            <Link href={`/Services/${item.id}`}>
              <div className="mb-15  mt-20 flex-col items-center rounded-2xl bg-gray-700 px-8 py-6">
                <div>
                  <img
                    src={item.imageUrl}
                    alt="Service Doesn't Have Picture Available"
                    width="300" // Adjust width as needed
                    height="300" // Adjust height as needed
                    style={{ maxWidth: "100%" }}
                    className="rounded-2xl" // Ensures the image is responsive
                  />
                </div>
                <div className=" mt-3">
                  <h3 className="text-lg font-bold ">{item.name}</h3>
                  <h3>
                    Location: {item.city}, {item.state}
                  </h3>
                  <h3>Rating: {item.rating}</h3>
                  <h3>Amount of Reviews: {item.ratingCount}</h3>
                  {/* Display other item details */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
