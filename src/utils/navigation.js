export const smoothScrollToSection = (sectionId, offset = 20) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - offset;
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }
};
