"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

/* =========================================================
   TYPES
========================================================= */

type Species = {
  _id?: string;
  id?: string;

  name?: string;
  commonName?: string;
  common_name?: string;

  scientificName?: string;
  scientific_name?: string;

  images?: string[];

  category?: string;
  status?: string;

  conservationStatus?: string;
  conservation_status?: string;
  iucnStatus?: string;

  group?: string;
  type?: string;
};

type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Skiper47 = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch("/api/species");

        if (!response.ok) {
          throw new Error("Failed to fetch species");
        }

        const data = await response.json();
        const animals: Species[] = data.animals || [];

        const carouselImages: CarouselImage[] = animals
          .map((animal) => {
            const speciesId = animal.id || animal._id;

            const name =
              animal.name ||
              animal.commonName ||
              animal.common_name ||
              "Unknown species";

            // Safe image fallback check
            const image =
              animal.images?.[3] ||
              animal.images?.[0] ||
              animal.images?.[1];

            if (!image || !speciesId) {
              return null;
            }

            return {
              id: speciesId,
              src: image,
              alt: name,
            };
          })
          .filter(
            (item): item is CarouselImage => item !== null
          );

        setImages(carouselImages);
      } catch (error) {
        console.error("Failed to load carousel images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center bg-[#f5f4f3] py-10">
        <div className="h-40 w-full max-w-[1600px] animate-pulse rounded-xl bg-gray-200" />
      </div>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (images.length === 0) {
    return (
      <div className="flex w-full items-center justify-center bg-[#f5f4f3] py-20">
        <p className="text-sm text-gray-500">
          No species images available.
        </p>
      </div>
    );
  }

  /* =========================================================
     CAROUSEL
  ========================================================= */

  return (
    <div className="w-full overflow-hidden bg-[#f5f4f3]">
      <Carousel_001
        images={images}
        showPagination={true}
        showNavigation={true}
        loop={true}
      />
    </div>
  );
};

export { Skiper47 };

/* =========================================================
   CAROUSEL COMPONENT
========================================================= */

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = true,
  loop = true,
}: {
  images: CarouselImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}) => {
  const router = useRouter();

  /* =========================================================
     CUSTOM CSS
  ========================================================= */

  const css = `
    .Carousal_001 {
      width: 100%;
      max-width: 1600px;
      margin: 0 auto;
      padding: 0 !important;
      border: none !important;
      outline: none !important;
    }

    .Carousal_001 .swiper {
      width: 100%;
      overflow: visible !important;
    }

    .Carousal_001 .swiper-wrapper {
      align-items: center;
    }

    .Carousal_001 .swiper-slide {
      height: auto !important;
      padding: 0 !important;
      margin: 0 !important;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
    }

    .Carousal_001 .species-image-card {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 11;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 3px solid transparent;
      border-radius: 16px;
      background: #e5e5e5;
      transform-origin: center center;
      transition:
        transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
        border-color 0.35s ease,
        box-shadow 0.35s ease;
      z-index: 1;
      cursor: pointer;
    }

    .Carousal_001 .species-image {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 35%;
      border-radius: 13px;
      user-select: none;
      -webkit-user-drag: none;
      transition:
        transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
        opacity 0.4s ease;
    }

    .Carousal_001
      .swiper-slide.swiper-slide-active
      .species-image-card {
      transform: scale(1.08);
      border-color: #111827;
      box-shadow:
        0 0 0 2px rgba(17, 24, 39, 0.08),
        0 14px 40px rgba(0, 0, 0, 0.20);
      z-index: 30;
    }

    .Carousal_001
      .swiper-slide:not(.swiper-slide-active)
      .species-image {
      opacity: 0.90;
    }

    .Carousal_001
      .swiper-slide.swiper-slide-active
      .species-image {
      opacity: 1;
    }

    .Carousal_001
      .species-image-card:hover {
      transform: scale(1.04);
      z-index: 15;
    }

    .Carousal_001
      .swiper-slide.swiper-slide-active
      .species-image-card:hover {
      transform: scale(1.12);
      border-color: #111827;
      box-shadow:
        0 0 0 3px rgba(17, 24, 39, 0.12),
        0 18px 50px rgba(0, 0, 0, 0.25);
    }

    .Carousal_001 .swiper-pagination {
      position: relative !important;
      margin-top: 16px;
      bottom: auto !important;
    }

    .Carousal_001 .species-next,
    .Carousal_001 .species-prev {
      width: 46px !important;
      height: 46px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none !important;
      outline: none !important;
      border-radius: 9999px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      transition:
        transform 0.2s ease,
        background 0.2s ease;
    }

    .Carousal_001 .species-next:hover,
    .Carousal_001 .species-prev:hover {
      background: rgba(0, 0, 0, 0.88);
      transform: scale(1.08);
    }

    .Carousal_001 .species-next::after,
    .Carousal_001 .species-prev::after {
      display: none !important;
    }

    @media (min-width: 1280px) {
      .Carousal_001 .species-image-card {
        aspect-ratio: 16 / 11;
      }
    }

    @media (max-width: 1023px) {
      .Carousal_001 .species-image-card {
        aspect-ratio: 16 / 11;
      }
    }

    @media (max-width: 767px) {
      .Carousal_001 .species-next,
      .Carousal_001 .species-prev {
        width: 40px !important;
        height: 40px !important;
      }

      .Carousal_001 .species-image-card {
        aspect-ratio: 4 / 3;
      }

      .Carousal_001
        .swiper-slide.swiper-slide-active
        .species-image-card {
        transform: scale(1.04);
      }

      .Carousal_001
        .swiper-slide.swiper-slide-active
        .species-image-card:hover {
        transform: scale(1.07);
      }
    }

    @media (max-width: 480px) {
      .Carousal_001 .species-image-card {
        aspect-ratio: 4 / 3;
      }
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn(
        "Carousal_001 relative mx-auto w-full max-w-[1600px]",
        className
      )}
    >
      <style>{css}</style>

      <Swiper
        loop={loop}
        centeredSlides={true}
        spaceBetween={0}
        grabCursor={true}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
          1280: { slidesPerView: 4, spaceBetween: 0 },
        }}
        navigation={
          showNavigation
            ? {
                nextEl: ".species-next",
                prevEl: ".species-prev",
              }
            : undefined
        }
        pagination={
          showPagination
            ? { clickable: true }
            : undefined
        }
        modules={[Navigation, Pagination]}
        className="species-carousel"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={`${image.id}-${index}`}
            className="!flex !h-auto !items-center !justify-center !overflow-visible !p-0"
          >
            <div
              className="species-image-card"
              onClick={() => router.push(`/species/${image.id}`)}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                draggable={false}
                className="species-image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            type="button"
            aria-label="Previous species"
            className="species-prev absolute left-3 top-1/2 z-40 -translate-y-1/2 text-white"
          >
            <ChevronLeftIcon className="mx-auto h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next species"
            className="species-next absolute right-3 top-1/2 z-40 -translate-y-1/2 text-white"
          >
            <ChevronRightIcon className="mx-auto h-5 w-5" />
          </button>
        </>
      )}
    </motion.div>
  );
};

export { Carousel_001 };