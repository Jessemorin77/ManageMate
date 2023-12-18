"use client";
import { redirect } from "next/navigation";
import Select from "../DataInput/Selector";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "", value: "" },
  { label: "Cleaner", value: "cleaner" },
  { label: "Plumber", value: "plumber" },
  { label: "Carpenter", value: "carpenter" },
];

export default function Hero() {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [ZipCode, setZipCode] = useState<number | undefined>(undefined);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedValue);
    console.log(ZipCode);
    if (selectedValue == "" || ZipCode == undefined) {
      alert("please select a value service, or zipcode");
      console.error("invalid input");
      return;
    }
    const dataToSend = {
      service: selectedValue,
      zipCode: ZipCode,
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
        throw new Error("http error: ${resonce.status}");
      }
      const responseJson = await response.json();
      console.log(response);

      router.push("/Services");
    } catch (error) {
      console.error("error in fetch", error);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">ServiceMate</h1>
          <p className="mb-5">Find services available in your area</p>
          <div className="flex justify-center">
            <a href="/Services">
              <button className="btn btn-primary">Explore</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
