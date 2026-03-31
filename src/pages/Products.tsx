import Navbar from "@/components/Navbar";
import ProductsSection from "@/components/ProductsSection";
import Footer from "@/components/Footer";

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ProductsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Products;
