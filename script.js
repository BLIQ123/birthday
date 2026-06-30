const slides = document.querySelectorAll(".slide");
const progressBar = document.getElementById("progress");
const dotsContainer = document.getElementById("dots");

// Создаём точки навигации
function createDots() {
  dotsContainer.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => {
      window.scrollTo({
        top: index * window.innerHeight,
        behavior: "smooth"
      });
    });
    dotsContainer.appendChild(dot);
  });
}

// Обновление активного слайда
function updateActiveSlide() {
  const scroll = window.scrollY;
  const vh = window.innerHeight;
  let index = Math.min(
    slides.length - 1,
    Math.floor(scroll / vh + 0.4)
  );

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scroll / totalHeight) * 100;
  if (progressBar) progressBar.style.width = `${Math.min(100, progress)}%`;

  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

// Таймер
function startCountdown(targetDate) {
  const countdownEl = document.getElementById("countdown");
  if (!countdownEl) return;

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownEl.innerHTML = `<div style="font-size:28px;color:#f2c94c;">Праздник уже начался!</div>`;
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
  };

  updateTimer();
  setInterval(updateTimer, 1000);
};

// Построить маршрут (исправленный)
function buildRoute() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const userLat = position.coords.latitude.toFixed(6);
        const userLon = position.coords.longitude.toFixed(6);
        const destLat = 61.286526;
        const destLon = 73.372362;

        // Более надёжный способ — открыть Яндекс Карты с маршрутом
        const url = `https://yandex.ru/maps/?rtext=${userLat},${userLon}~${destLat},${destLon}&rtt=auto&mode=route`;
        window.open(url, '_blank');
      },
      function(error) {
        let message = "Не удалось определить ваше местоположение.";
        if (error.code === 1) message += "\nВы отказали в доступе к геолокации.";
        else if (error.code === 2) message += "\nМестоположение недоступно.";
        alert(message + "\nПожалуйста, разрешите доступ к геолокации.");
      }
    );
  } else {
    alert("Ваш браузер не поддерживает определение местоположения.");
  }
}

// Поделиться (оставил на всякий случай)
window.shareInvitation = function() {
  if (navigator.share) {
    navigator.share({
      title: 'Приглашение на MAXIM 50',
      text: 'Присоединяйся ко мне на юбилей!',
      url: window.location.href
    });
  } else {
    const text = 'Приглашение на MAXIM 50\n' + window.location.href;
    navigator.clipboard.writeText(text).then(() => alert('Ссылка скопирована!'));
  }
};

// Запуск
window.addEventListener("load", () => {
  createDots();
  const targetDate = new Date("2027-05-01T16:00:00").getTime();
  startCountdown(targetDate);

  window.addEventListener("scroll", updateActiveSlide);
  updateActiveSlide();
});

window.addEventListener("resize", updateActiveSlide);
