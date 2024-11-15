"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { GiCrossedSabres } from "react-icons/gi";

const Navlinks = ({close,setclose}:any) => {
  const Linksbtn = [
    { name: "home", link: "/" },
    { name: "about", link: "/" },
    { name: "service", link: "/" },
    { name: "contact us", link: "/" },
  ];





  return (
    <nav className={`text-white w-full sm:w-[300px] p-10 lg:p-0 lg:w-auto fixed ${close ? "right-0 " : "-right-[140%]"} bottom-0 top-0 z-50 transition-all bg-[#2344c6ad]  backdrop-blur-md lg:bg-transparent lg:relative lg:right-0 lg:flex`}>
      <GiCrossedSabres
        className="lg:hidden block absolute right-5 top-5 text-white cursor-pointer hover:text-red-500"
        size={30}
        onClick={()=>{
          console.log("it close")
          setclose(false)
          
        }}
      />
      {close}
      {Linksbtn.map((data, index) => (
        <Link href={data.link} key={data.name}>
          <Button
            variant={"link"}
            className="text-white text-xl lg:text-lg  capitalize block hover:text-pink-600 my-3 lg:m-0"
          >
            {data.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default Navlinks;
