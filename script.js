const slides = document.querySelectorAll(".slide");

window.addEventListener("scroll", () => {
  const scroll = window.scrollY;
  const index = Math.min(
    slides.length - 1,
    Math.floor(scroll / window.innerHeight)
  );

  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
});