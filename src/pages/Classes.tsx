
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Class {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  startDate: string;
  spots: number;
}

const Classes = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load classes (in a real app, this would come from an API)
    setClasses([
      {
        id: 1,
        title: "Digital Portrait Fundamentals",
        description: "Learn the basics of digital portraiture. This course covers facial proportions, lighting, and color theory specifically for portraits.",
        image: "https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: "₹5,000",
        duration: "6 weeks",
        level: "Beginner",
        startDate: "April 15, 2025",
        spots: 10
      },
      {
        id: 2,
        title: "Character Design Workshop",
        description: "Dive into the world of character design. Learn how to create memorable characters with distinct personalities through visual design.",
        image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: "₹7,500",
        duration: "8 weeks",
        level: "Intermediate",
        startDate: "May 1, 2025",
        spots: 8
      },
      {
        id: 3,
        title: "Digital Animation Basics",
        description: "An introduction to animation principles using digital tools. Learn timing, spacing, and how to bring your illustrations to life.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: "₹8,000",
        duration: "10 weeks",
        level: "Beginner",
        startDate: "June 10, 2025",
        spots: 6
      },
      {
        id: 4,
        title: "Advanced Digital Painting Techniques",
        description: "Take your digital painting skills to the next level with advanced techniques in texture, lighting, and composition.",
        image: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        price: "₹10,000",
        duration: "12 weeks",
        level: "Advanced",
        startDate: "July 5, 2025",
        spots: 5
      }
    ]);
  }, []);

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4 pb-16">
        <section className="section-container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Classes</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn art and animation techniques through comprehensive courses taught by Nix Fine Arts.
            </p>
          </div>
          
          {classes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={classItem.image} 
                      alt={classItem.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{classItem.title}</CardTitle>
                      <Badge className={getLevelColor(classItem.level)}>{classItem.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{classItem.description}</p>
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Starts {classItem.startDate}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{classItem.duration}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4" />
                        <span>{classItem.spots} spots available</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <span className="font-bold text-xl">{classItem.price}</span>
                    <Button>Enroll Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-muted rounded-lg">
              <p className="text-xl text-muted-foreground">Loading classes...</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Classes;
