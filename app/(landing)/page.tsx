import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";
import ProductsSection from "./components/home/products";
import { getAllCategories } from "../services/category.service";
import { getAllProducts } from "../services/product.service";


export default async function Home() {
  const [categories, products ] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <main className="min-h-[80vh] mx-auto pt-20 py-20">
      <div className="mx-auto py-20">   
      <HeroSection />
      <CategoriesSection categories={categories}/>
      <ProductsSection products={products}/>
      </div>
    </main>
  );
}