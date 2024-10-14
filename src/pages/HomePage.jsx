import Categories from "../component/Categories";
import Header from "../component/Header";
import ProductBanner from "../component/ProductBanner";
import ProductCard from "../component/ProductCard";






export default function HomePage() {
    return (
      <div className="h-full bg-black">

        <ProductBanner />

        <div className="flex w-3/4 mx-auto mt-12">
        <Categories />
        </div>

        <div className="flex justify-around py-8 w-3/4 mx-auto">
         <ProductCard />
        </div>


      </div>
    );
  };
  