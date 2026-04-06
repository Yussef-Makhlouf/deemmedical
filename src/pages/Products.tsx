import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const rangeId = searchParams.get("range");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rangeId]);

  const { data: ranges } = useQuery({
    queryKey: ["product-ranges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_ranges")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", rangeId],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (rangeId) query = query.eq("product_range_id", rangeId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const selectedRange = rangeId ? ranges?.find((r) => r.id === rangeId) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Header */}
            <div className="text-center mb-14">
              {selectedRange ? (
                <>
                  <Button
                    variant="ghost"
                    className="mb-4 gap-2"
                    onClick={() => navigate("/products")}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    All Ranges
                  </Button>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                    {selectedRange.name}
                  </h1>
                  {selectedRange.description && (
                    <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                      {selectedRange.description}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                    Our Products
                  </span>
                  <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
                    Equipment You Can Rely On
                  </h1>
                  <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                    We supply a comprehensive range of medical equipment to hospitals, clinics, and laboratories across the country.
                  </p>
                </>
              )}
            </div>

            {/* Range chips when no range selected */}
            {!rangeId && ranges && ranges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {ranges.map((range) => (
                  <Button
                    key={range.id}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => navigate(`/products?range=${range.id}`)}
                  >
                    {range.name}
                  </Button>
                ))}
              </div>
            )}

            {/* Products slider */}
            {isLoading ? (
              <div className="text-center text-muted-foreground py-12">Loading products...</div>
            ) : products && products.length > 0 ? (
              <div className="px-10">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  plugins={[
                    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {products.map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <Card
                          className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={() => navigate(`/products/${product.id}`)}
                        >
                          <div className="aspect-[4/3] overflow-hidden bg-muted">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-12 h-12 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-5">
                            <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                              {product.title}
                            </h3>
                            {product.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {product.description}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                No products available yet. Check back soon!
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
