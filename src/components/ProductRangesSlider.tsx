import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Package } from "lucide-react";

const ProductRangesSlider = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<any>(null);

  const { data: ranges, isLoading } = useQuery({
    queryKey: ["public-product-ranges-slider"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_ranges")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["public-products-for-ranges"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const rangeProducts = selectedRange
    ? products?.filter((p) => p.product_range_id === selectedRange.id) || []
    : [];

  if (isLoading || !ranges?.length) return null;

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-wider uppercase text-primary">
            Our Ranges
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Product Ranges
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Explore our comprehensive product categories to find the right equipment for your needs.
          </p>
        </div>

        <div className="px-10">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
              Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {ranges.map((range) => (
                <CarouselItem
                  key={range.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div
                    className="group cursor-pointer overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedRange(range)}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      {range.image_url ? (
                        <img
                          src={range.image_url}
                          alt={range.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-muted-foreground/40" />
                        </div>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-display font-semibold text-lg text-foreground">
                        {range.name}
                      </h3>
                      {range.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {range.description}
                        </p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <Dialog open={!!selectedRange} onOpenChange={(open) => !open && setSelectedRange(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedRange?.name}</DialogTitle>
            {selectedRange?.description && (
              <DialogDescription>{selectedRange.description}</DialogDescription>
            )}
          </DialogHeader>

          {rangeProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {rangeProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-all"
                  onClick={() => {
                    setSelectedRange(null);
                    navigate(`/products/${product.id}`);
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-10 h-10 text-muted-foreground/40" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-display font-semibold text-foreground">{product.title}</h4>
                    {product.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No products in this range yet.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductRangesSlider;
