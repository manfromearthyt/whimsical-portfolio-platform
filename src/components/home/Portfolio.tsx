
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

// Sample portfolio items (in a real app, these would come from an API or CMS)
const portfolioItems = [
  {
    id: 1,
    title: 'Sunset in Kerala',
    description: 'Watercolor Landscape, 2024',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    forSale: true,
  },
  {
    id: 2,
    title: 'Animated Short: The Journey',
    description: 'Digital Animation, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    videoUrl: '#',
    forSale: false,
  },
  {
    id: 3,
    title: 'Harmony in Blue',
    description: 'Oil on Canvas, 2023',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    forSale: true,
  },
  {
    id: 4,
    title: 'Urban Sketches',
    description: 'Pen and Ink, 2024',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    forSale: true,
  },
  {
    id: 5,
    title: 'Digital Dreams',
    description: 'Digital Art, 2023',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    forSale: false,
  },
  {
    id: 6,
    title: 'Animation Loop: Nature',
    description: 'Motion Graphics, 2024',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    type: 'video',
    videoUrl: '#',
    forSale: true,
  },
];

const Portfolio = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisibleItems((prevItems) => [...prevItems, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <section id="portfolio" className="section-container">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl font-bold">My Portfolio</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my creative works spanning traditional art, digital illustrations, and animations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[index] = el)}
            data-id={item.id}
            className={`rounded-lg overflow-hidden shadow-md transition-all duration-700 animate-on-scroll ${
              visibleItems.includes(item.id) ? 'visible' : ''
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Play size={28} className="text-primary ml-1" />
                  </div>
                </div>
              )}

              {item.forSale && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full shadow-md">
                  For Sale
                </div>
              )}
            </div>

            <div className="p-5 bg-white dark:bg-card">
              <h3 className="text-xl font-serif font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-1">{item.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                {item.forSale ? (
                  <Link
                    to={`/shop/${item.id}`}
                    className="text-primary hover:text-primary/80 font-medium link-underline"
                  >
                    View in Shop
                  </Link>
                ) : (
                  <Link
                    to={`/portfolio/${item.id}`}
                    className="text-primary hover:text-primary/80 font-medium link-underline"
                  >
                    View Details
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          to="/shop" 
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    </section>
  );
};

export default Portfolio;
