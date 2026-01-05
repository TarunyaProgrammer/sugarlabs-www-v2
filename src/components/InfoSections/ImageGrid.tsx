import { motion } from 'framer-motion';
import MotionCarousel from '@/components/ui/MotionCarousel';
import { images, ImageConfig } from '@/constants/Info';
import { fadeIn, simpleGridContainer, subtleRise } from '@/styles/Animations';

const ImageGrid = () => {
  const renderCarouselItem = (key: string, image: ImageConfig) => (
    <div key={key} className="relative w-full h-full">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-48 sm:h-64 object-cover"
        loading="lazy"
      />
      {image.caption && (
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                       to-transparent p-3 sm:p-4"
        >
          <p className="text-white font-normal text-sm sm:text-base">
            {image.caption}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Image Grid */}
      <motion.div
        className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-4 max-w-7xl mx-auto"
        variants={simpleGridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {Object.entries(images)
          .filter(([key]) => key.startsWith('bottom'))
          .map(([key, image]) => (
            <motion.div
              key={key}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl 
            transition-all duration-500 bg-white dark:bg-gray-800"
              variants={subtleRise}
              whileHover="hover"
            >
              <img
                src={image.src}
                alt={image.alt || key}
                className="w-full h-auto object-cover transform group-hover:scale-105 
              transition-all duration-700 ease-out"
                loading="lazy"
              />
              {image.caption && (
                <div
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 
                to-transparent p-3 sm:p-4 md:p-6 lg:p-8"
                >
                  <p className="text-white font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                    {image.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
      </motion.div>

      {/* Mobile Carousel */}
      <motion.div
        className="md:hidden px-2 sm:px-4"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="h-64 w-full rounded-xl sm:rounded-2xl overflow-hidden">
          <MotionCarousel
            autoPlay
            infiniteLoop
            showArrows={false}
            className="rounded-xl sm:rounded-2xl overflow-hidden"
          >
            {Object.entries(images)
              .filter(([key]) => key.startsWith('bottom'))
              .map(([key, image]) => renderCarouselItem(key, image))}
          </MotionCarousel>
        </div>
      </motion.div>
    </>
  );
};

export default ImageGrid;
