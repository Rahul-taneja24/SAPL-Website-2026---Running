import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollRevealManager - IntersectionObserver for reveal animations
export function ScrollRevealManager() {
    const location = useLocation();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        // Small delay ensures React has finished painting the DOM after route change
        const timer = setTimeout(() => {
            const els = document.querySelectorAll('.reveal, .hero-reveal, .heading-accent, .img-clip-reveal');
            els.forEach((el) => observer.observe(el));
        }, 120);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, [location.pathname]);

    return null;
}

// ScrollProgressBar - Shows scroll progress at top of page
export function ScrollProgressBar() {
    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            const progressBar = document.getElementById('scroll-progress');
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return <div id="scroll-progress" style={{ width: '0%' }} />;
}

// Hero Particles Component — denser orange fire embers
export function HeroParticles() {
    return (
        <div className="hero-particles" aria-hidden="true">
            <span className="spark spark-1" />
            <span className="spark spark-2" />
            <span className="spark spark-3" />
            <span className="spark spark-4" />
            <span className="spark spark-5" />
            <span className="spark spark-6" />
            <span className="spark spark-7" />
            <span className="spark spark-8" />
            <span className="spark spark-9" />
            <span className="spark spark-10" />
            <span className="spark spark-11" />
            <span className="spark spark-12" />
            <span className="spark spark-13" />
            <span className="spark spark-14" />
            <span className="spark spark-15" />
            <span className="spark spark-16" />
            <span className="spark spark-17" />
            <span className="spark spark-18" />
            <span className="spark spark-19" />
            <span className="spark spark-20" />
        </div>
    );
}

export default ScrollRevealManager;