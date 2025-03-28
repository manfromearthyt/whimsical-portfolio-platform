
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load products (in a real app, this would come from an API)
    setProducts([
      {
        id: 1,
        name: "Digital Portrait Commission",
        price: "₹2,500",
        image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Custom digital portrait in my signature style. Perfect for profile pictures, gifts, or personal keepsakes."
      },
      {
        id: 2,
        name: "Character Design",
        price: "₹3,500",
        image: "https://images.unsplash.com/photo-1613312328068-c6b01ccfee3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Original character design based on your specifications. Includes concept sketches and final colored artwork."
      },
      {
        id: 3,
        name: "Animation Snippet",
        price: "₹5,000",
        image: "https://images.unsplash.com/photo-1576686271442-c10befe0b77c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Short custom animation clip of your character or concept. Perfect for social media or personal projects."
      },
      {
        id: 4,
        name: "Digital Art Print",
        price: "₹1,200",
        image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "High-quality print of original artwork. Available in various sizes. Shipped directly to your door."
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4 pb-16">
        <section className="section-container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Shop</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse and purchase original artwork, commissions, and digital products.
            </p>
          </div>
          
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{product.description}</p>
                    <p className="font-bold text-xl">{product.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-muted rounded-lg">
              <p className="text-xl text-muted-foreground">Loading products...</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
