import React from "react";
import nikon from "../assets/nikon.svg";

export default function ProductCard() {
  const categories = [
    { price: "23,000", title: "Canon EOS R6 Mark II", description: "Lorem ipsum dolor sit armet." },
    { price: "23,000", title: "Canon EOS R6 Mark II", description: "Lorem ipsum dolor sit armet." },
    { price: "23,000", title: "Canon EOS R6 Mark II", description: "Lorem ipsum dolor sit armet." },
    { price: "235,000", title: "Nikon D6400", description: "Lorem ipsum dolor sit armet." },
    { price: "235,000", title: "Nikon D6400", description: "Lorem ipsum dolor sit armet." },
    { price: "235,000", title: "Nikon D6400", description: "Lorem ipsum dolor sit armet." },
    { price: "235,000", title: "Nikon D6400", description: "Lorem ipsum dolor sit armet." },
    { price: "235,000", title: "Nikon D6400", description: "Lorem ipsum dolor sit armet." },
  
  ];

  return (
    <div className="flex flex-wrap justify-around gap-12 text-black  ">
      {categories.map((category, index) => (
        <div key={index} className="card bg-white w-80 shadow-xl mb-4 transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-100">
          <figure className="px-10 pt-10">
            <img
              src={nikon}
              className="rounded-xl"
              alt={category.title}
            />
          </figure>
          <div className="card-body items-center text-center">
            <h1>{category.price}</h1>
            <h2 className="card-title">{category.title}</h2>
            <p>{category.description}</p>
            <div className="card-actions">
              <button className="btn btn-warning">Info</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
