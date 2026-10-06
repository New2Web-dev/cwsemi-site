document.addEventListener('DOMContentLoaded', function () {
  const carouselItems = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');

  if (!carouselItems.length) return;

  let currentIndex = 0;
  let carouselInterval;

  // 显示指定索引的幻灯片
  function showSlide(index) {
    // 处理循环
    if (index >= carouselItems.length) index = 0;
    if (index < 0) index = carouselItems.length - 1;

    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(ind => ind.classList.remove('active'));

    carouselItems[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');

    currentIndex = index;
  }

  // 下一张
  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  // 上一张
  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // 按钮点击
  if (nextBtn) nextBtn.addEventListener('click', function () {
    nextSlide();
    restartAutoPlay();
  });

  if (prevBtn) prevBtn.addEventListener('click', function () {
    prevSlide();
    restartAutoPlay();
  });

  // 指示器点击
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function () {
      showSlide(index);
      restartAutoPlay();
    });
  });

  // 自动播放
  function startAutoPlay() {
    carouselInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(carouselInterval);
  }

  function restartAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // 鼠标悬停时暂停
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // 启动
  startAutoPlay();
});