import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxHero = ({ image, title, subtitle, height = "min-h-[60vh]" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={ref} className={`relative ${height} flex items-center overflow-hidden`}>
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-blue-900/80 to-dark/90 dark:from-dark-bg/95 dark:via-dark-card/90 dark:to-black/95 z-10" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Floating Shapes */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-50"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-50"
                />
            </div>

            <div className="container mx-auto px-4 relative z-20 text-center">
                <motion.div style={{ y: textY }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default ParallaxHero;
