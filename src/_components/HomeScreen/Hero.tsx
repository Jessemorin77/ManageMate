"use client";
import { redirect } from "next/navigation";
import Select from "../DataInput/Selector";
import React, { useState } from "react";
import { useRouter } from "next/navigation";



export default function Hero() {
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
