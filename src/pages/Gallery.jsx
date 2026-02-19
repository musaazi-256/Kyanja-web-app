import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";

const images = [
  {
    src: "/assets/kyanja-hero-image.webp",
    alt: "Kyanja Hero Image",
    aspect: "landscape",
  },
  { src: "/assets/scouts.webp", alt: "Scouts", aspect: "landscape" },
  { src: "/assets/mdd.webp", alt: "MDD Performance", aspect: "landscape" },
  { src: "/assets/sports.webp", alt: "Sports Day", aspect: "landscape" },
  { src: "/assets/sports2.webp", alt: "Sports Action", aspect: "landscape" },
  { src: "/assets/DOS.webp", alt: "Director of Studies", aspect: "portrait" },
  { src: "/assets/Director.webp", alt: "School Director", aspect: "portrait" },
  {
    src: "/assets/admissions-banner.webp",
    alt: "Admissions Banner",
    aspect: "landscape",
  },
  { src: "/assets/burser-1.webp", alt: "Bursar", aspect: "portrait" },
  { src: "/assets/brian.png", alt: "Staff Member", aspect: "portrait" },
  {
    src: "/assets/excellence-202.png",
    alt: "Excellence Icon",
    aspect: "square",
  },
  { src: "/assets/faith-201.png", alt: "Faith Icon", aspect: "square" },
  { src: "/assets/community-203.png", alt: "Community Icon", aspect: "square" },
  {
    src: "/assets/resilience-205.png",
    alt: "Resilience Icon",
    aspect: "square",
  },
  { src: "/assets/respect-204.png", alt: "Respect Icon", aspect: "square" },
  {
    src: "/assets/responsibility-206.png",
    alt: "Responsibility Icon",
    aspect: "square",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-16 md:pt-24 pb-12 px-4 sm:px-8 bg-gray-50 min-h-screen">
      <div className="w-full">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Gallery
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant life at Kyanja Junior School through our photo
            collection.
          </p>
        </div>

        {/* Masonry Layout */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6 gap-6 space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
              onClick={() => openLightbox(image)}
            >
              {/* Skeleton Loader */}
              {!loadedImages[image.src] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center min-h-[200px]">
                  <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                </div>
              )}

              <img
                src={image.src}
                alt={image.alt}
                className={`w-full h-auto transform group-hover:scale-110 transition-transform duration-500 ease-in-out ${
                  loadedImages[image.src] ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(image.src)}
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="bg-white/90 p-2 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-[-3rem] left-0 right-0 text-center text-white/90 text-lg font-medium">
              {selectedImage.alt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
