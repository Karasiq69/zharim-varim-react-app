'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {useState} from "react";
import {Card, CardContent} from "@/components/ui/card";

const images = [
  "https://via.placeholder.com/1200x400?text=Slide%201",
  "https://via.placeholder.com/1200x400?text=Slide%202",
  "https://via.placeholder.com/1200x400?text=Slide%203",
  "https://via.placeholder.com/1200x400?text=Slide%204",
  "https://via.placeholder.com/1200x400?text=Slide%205",
];

type Props = {};
const CarouselHero = (props: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="w-full lg:max-w-5xl mx-auto">
            <Carousel className="relative">
                <CarouselContent
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                        transition: "transform 0.5s ease-in-out",
                    }}
                >
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="aspect-banner">
                                        <img
                                            src={image}
                                            alt={`Slide ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious onClick={prevSlide}/>
                <CarouselNext onClick={nextSlide}/>
            </Carousel>
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-indigo-500" : "bg-gray-400"
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};
export default CarouselHero;
