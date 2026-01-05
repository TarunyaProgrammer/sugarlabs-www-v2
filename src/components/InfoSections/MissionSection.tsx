import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mission } from '@/constants/Info';
import { simpleFadeIn, subtleRise } from '@/styles/Animations';

const MissionSection = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section
      className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={simpleFadeIn}
    >
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        <div
          className="inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-gradient-to-r 
                   from-red-500/10 to-orange-500/10 dark:from-red-500/20 dark:to-orange-500/20 rounded-full"
        >
          <span
            className="text-xs sm:text-sm font-bold text-red-600 dark:text-red-400 tracking-wider 
                     uppercase"
          >
            Empowering Young Learners
          </span>
        </div>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black space-y-1 sm:space-y-2 
                   font-display tracking-tight dark:text-white"
          variants={subtleRise}
        >
          <span className="font-bold tracking-wider font-Caveat text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Our Mission?
          </span>
          <div>
            <div
              className="text-transparent bg-clip-text bg-gradient-to-r 
                        from-red-500 to-orange-500 font-Caveat text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Authentic
            </div>
            <span className="font-semibold">Problem</span>
            <br />
            <span className="font-semibold">Solving</span>
          </div>
        </motion.h2>

        <motion.h4
          className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-200"
          variants={subtleRise}
        >
          Igniting Curiosity through Project Based Learning
        </motion.h4>

        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-Roboto">
          Empowering Young Minds with Hands-on Learning, Transforming Curiosity
          into Discovery and Innovation.
        </p>
      </div>

      <motion.div className="relative" variants={subtleRise}>
        <div className="bg-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
          {/* Background Image */}
          <motion.img
            src={mission.learnImage}
            alt="Students learning"
            className="w-full rounded-xl sm:rounded-2xl transform hover:scale-105 
            transition-all duration-500 ease-out"
            loading="lazy"
            whileHover={{ scale: 1.05 }}
          />

          {/* Card on Top Left */}
          {windowWidth >= 270 && (
            <motion.div
              className="absolute top-1 left-2 bg-black/60
              backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-6 shadow-lg 
              max-w-[180px] sm:max-w-[220px] md:max-w-xs transform hover:scale-105 
              transition-all duration-300 ease-out z-10 border border-white/50"
              whileHover={{ scale: 1 }}
            >
              {windowWidth >= 355 && (
                <>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 md:mb-2 text-gray-100 font-AnonymousPro">
                    Project Based Learning
                  </h3>
                  <p className="text-white text-xs sm:text-sm leading-tight sm:leading-snug">
                    Empowering learners and educators with hands-on
                    project-based tools that enable creation and real-world
                    problem-solving.
                  </p>
                </>
              )}
              {windowWidth < 355 && windowWidth >= 250 && (
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-100 font-AnonymousPro">
                  Project Based Learning
                </h3>
              )}
            </motion.div>
          )}

          {/* Card on Bottom Right */}
          {windowWidth >= 270 && (
            <motion.div
              className="absolute bottom-1 right-2 bg-black/60
              backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 md:p-6 shadow-lg 
              max-w-[180px] sm:max-w-[220px] md:max-w-xs transform hover:scale-105 
              transition-all duration-300 ease-out z-10 border border-white/50"
              whileHover={{ scale: 1 }}
            >
              {windowWidth >= 355 && (
                <>
                  <h3 className="text-base sm:text-lg font-bold mb-1 text-amber-100 font-AnonymousPro">
                    Challenge and Fun: It's hard fun.
                  </h3>
                  <p className="text-white text-xs sm:text-sm leading-tight sm:leading-snug">
                    Bringing interactive, meaningful experiences that make
                    education exciting and impactful.
                  </p>
                </>
              )}
              {windowWidth < 355 && windowWidth >= 270 && (
                <h3 className="text-base sm:text-lg font-bold text-amber-100 font-AnonymousPro">
                  Challenge and Fun: It's hard fun.
                </h3>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default MissionSection;
