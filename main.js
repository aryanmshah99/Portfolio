document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'dark'; 
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle').textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('theme-toggle').textContent = 'Dark Mode';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const techStack = document.querySelector('.tech-stack');
  const leftArrow = document.querySelector('.scroll-left');
  const rightArrow = document.querySelector('.scroll-right');
  const scrollAmount = 300; 

  leftArrow.addEventListener('click', () => {
    techStack.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });

  rightArrow.addEventListener('click', () => {
    techStack.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  const updateArrowVisibility = () => {
    leftArrow.style.opacity = techStack.scrollLeft <= 0 ? '0.5' : '1';
    rightArrow.style.opacity = 
      techStack.scrollLeft >= (techStack.scrollWidth - techStack.clientWidth) ? '0.5' : '1';
  };

  techStack.addEventListener('scroll', updateArrowVisibility);
  updateArrowVisibility(); 
});
