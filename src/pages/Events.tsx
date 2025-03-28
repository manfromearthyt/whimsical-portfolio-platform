
import { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  type: 'Workshop' | 'Exhibition' | 'Meetup' | 'Online';
  isFree: boolean;
  price?: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load events (in a real app, this would come from an API)
    setEvents([
      {
        id: 1,
        title: "Digital Art Exhibition: Future Portraits",
        description: "A showcase of digital portraiture exploring identity in the digital age. Featuring works from Nix Fine Arts and guest artists.",
        image: "https://images.unsplash.com/photo-1594388751539-4d3451b7dcd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        date: "April 22, 2025",
        time: "5:00 PM - 9:00 PM",
        location: "Art Gallery, Trivandrum",
        type: "Exhibition",
        isFree: true
      },
      {
        id: 2,
        title: "Character Design Masterclass",
        description: "An intensive one-day workshop on creating compelling character designs for games, animations, and illustrations.",
        image: "https://images.unsplash.com/photo-1571498664957-48c29b2266aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        date: "May 15, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "Creative Hub, Kochi",
        type: "Workshop",
        isFree: false,
        price: "₹3,000"
      },
      {
        id: 3,
        title: "Digital Artists Meetup",
        description: "Connect with fellow digital artists in Trivandrum. Share your work, get feedback, and build your network in a casual setting.",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        date: "June 5, 2025",
        time: "6:30 PM - 8:30 PM",
        location: "Cafe Artistica, Trivandrum",
        type: "Meetup",
        isFree: true
      },
      {
        id: 4,
        title: "Live Drawing Session: Character Expressions",
        description: "Join this online session to learn how to draw dynamic facial expressions for your characters. Perfect for illustrators and animators.",
        image: "https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        date: "July 12, 2025",
        time: "7:00 PM - 9:00 PM",
        location: "Online (Zoom)",
        type: "Online",
        isFree: false,
        price: "₹500"
      }
    ]);
  }, []);

  const getEventTypeColor = (type: string) => {
    switch(type) {
      case 'Workshop': return 'bg-blue-100 text-blue-800';
      case 'Exhibition': return 'bg-purple-100 text-purple-800';
      case 'Meetup': return 'bg-green-100 text-green-800';
      case 'Online': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 px-4 pb-16">
        <section className="section-container">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Events</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover upcoming workshops, exhibitions, and creative gatherings hosted by Nix Fine Arts.
            </p>
          </div>
          
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-60 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-col space-y-2 mt-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <span className="font-bold text-lg">
                      {event.isFree ? 'Free Entry' : event.price}
                    </span>
                    <Button>Register Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] border-2 border-dashed border-muted rounded-lg">
              <p className="text-xl text-muted-foreground">Loading events...</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
