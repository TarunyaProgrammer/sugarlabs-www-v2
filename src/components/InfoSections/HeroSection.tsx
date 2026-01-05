import { motion } from 'framer-motion';
import { heroContent, images } from '@/constants/Info';
import { simpleFadeIn, subtleRise } from '@/styles/Animations';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-2 sm:px-4 py-6 sm:py-8 max-w-7xl">
      <motion.div
        className="relative mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl 
                 transform hover:scale-[1.01] transition-all duration-500 
                 ease-out bg-white dark:bg-gray-800"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={simpleFadeIn}
      >
        <img
          src={images.main.src}
          alt={images.main.alt}
          className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/70 
                   via-black/50 to-transparent"
        />
        <motion.div
          className="absolute top-1/2 left-2 sm:left-6 md:left-12 transform -translate-y-1/2 
                   text-white max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl p-2 sm:p-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={subtleRise}
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 md:mb-6 lg:mb-8 
                     leading-tight tracking-tight animate-fade-in font-display"
          >
            {heroContent.title}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 
                     animate-fade-in-delayed font-light"
          >
            {heroContent.description}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
