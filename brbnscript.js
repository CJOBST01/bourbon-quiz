function toggleCustomName(selectElement) {
    const customWrapper = document.getElementById('customNameWrapper');
    if (selectElement.value === 'custom') {
      customWrapper.style.display = 'block';
    } else {
      customWrapper.style.display = 'none';
    }
  }
  window.addEventListener('scroll', () => {
    const speed = 0.5; // Lower = faster scroll relative to page
    const scrolled = window.scrollY;
    const image = document.getElementById('bottlePhoto');
    if (image) {
      image.style.transform = `translateY(${scrolled * speed}px)`;
    }
  });