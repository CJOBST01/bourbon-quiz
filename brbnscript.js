function toggleCustomName(selectElement) {
    const customWrapper = document.getElementById('customNameWrapper');
    if (selectElement.value === 'custom') {
      customWrapper.style.display = 'block';
    } else {
      customWrapper.style.display = 'none';
    }
  }
  