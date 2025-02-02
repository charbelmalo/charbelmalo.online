document.addEventListener('scroll', function() {
  const sparkleElements = document.querySelectorAll('.sparkle');

  sparkleElements.forEach(function(element) {
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    const isVisible = (elementTop >= 0 && elementBottom <= window.innerHeight) || (elementTop < window.innerHeight && elementBottom >= 0);

    if (isVisible) {
      const scrollPosition = window.scrollY + window.innerHeight;
      const triggerPosition = document.body.scrollHeight * 0.3;

      if (2 * scrollPosition > triggerPosition) {
        element.classList.add('animate-sparkle');
      } else {
        element.classList.remove('animate-sparkle');
      }
    } else {
      element.classList.remove('animate-sparkle');
    }
  });
});
