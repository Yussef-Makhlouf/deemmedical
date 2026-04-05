import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Package } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_ranges(name)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const youtubeEmbedUrl = product?.video_url
    ? getYouTubeEmbedUrl(product.video_url)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <Link to="/products">
            <Button variant="ghost" className="mb-6 gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Button>
          </Link>

          {isLoading ? (
            <div className="text-center text-muted-foreground py-20">Loading...</div>
          ) : !product ? (
            <div className="text-center text-muted-foreground py-20">Product not found.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {/* Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-20 h-20 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-6">
                {product.product_ranges && (
                  <span className="text-sm font-semibold tracking-wider uppercase text-primary">
                    {(product.product_ranges as any).name}
                  </span>
                )}
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                  {product.title}
                </h1>

                {product.description && (
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-2">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
                  </div>
                )}

                {product.specifications && (
                  <div>
                    <h2 className="font-display text-lg font-semibold text-foreground mb-2">Specifications</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{product.specifications}</p>
                  </div>
                )}

                {youtubeEmbedUrl && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2 w-fit">
                        <Play className="w-4 h-4" /> Watch Video
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-0 overflow-hidden">
                      <div className="aspect-video w-full">
                        <iframe
                          src={youtubeEmbedUrl}
                          title={`${product.title} video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v");
    } else if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default ProductDetail;
