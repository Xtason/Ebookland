/* Ensure page always starts at the top on refresh (F5) */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.15
    };
  
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after revealing to prevent repeating the animation
            observer.unobserve(entry.target);
            
            // Self-clean: Remove reveal classes after animation completes to restore snappy hover transitions
            setTimeout(() => {
                entry.target.classList.remove('reveal-on-scroll', 'active');
            }, 2500); // Wait 2.5s (1.6s animation + max 0.8s staggered delay)
        }
      });
    }, revealOptions);
  
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});
