import React from 'react';
import { motion } from 'framer-motion';

// Fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay }}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide up animation
export const SlideUp = ({ children, delay = 0, duration = 0.6, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide in from left
export const SlideInLeft = ({ children, delay = 0, duration = 0.6, ...props }) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

// Slide in from right
export const SlideInRight = ({ children, delay = 0, duration = 0.6, ...props }) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

// Scale animation
export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

// Scroll-triggered animation
export const ScrollReveal = ({ children, threshold = 0.2, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: threshold }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        {...props}
    >
        {children}
    </motion.div>
);

// Hover scale effect
export const HoverScale = ({ children, scale = 1.05, ...props }) => (
    <motion.div
        whileHover={{ scale }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        {...props}
    >
        {children}
    </motion.div>
);

// Stagger children animation
export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay
                }
            }
        }}
        {...props}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, ...props }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
        }}
        {...props}
    >
        {children}
    </motion.div>
);

export default {
    FadeIn,
    SlideUp,
    SlideInLeft,
    SlideInRight,
    ScaleIn,
    ScrollReveal,
    HoverScale,
    StaggerContainer,
    StaggerItem
};
