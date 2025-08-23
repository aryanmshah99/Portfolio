// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  this.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  
  // Save the theme preference
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check for saved theme preference and apply it
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('theme-toggle').textContent = 'Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('theme-toggle').textContent = 'Dark Mode';
  }
});

// Tech stack scroll functionality
document.addEventListener('DOMContentLoaded', function() {
  const techStack = document.querySelector('.tech-stack');
  const leftArrow = document.querySelector('.scroll-left');
  const rightArrow = document.querySelector('.scroll-right');
  const scrollAmount = 300; // Adjust this value to control scroll distance

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

  // Show/hide arrows based on scroll position
  const updateArrowVisibility = () => {
    leftArrow.style.opacity = techStack.scrollLeft <= 0 ? '0.5' : '1';
    rightArrow.style.opacity = 
      techStack.scrollLeft >= (techStack.scrollWidth - techStack.clientWidth) ? '0.5' : '1';
  };

  techStack.addEventListener('scroll', updateArrowVisibility);
  updateArrowVisibility(); // Initial check
});

// Modal functionality
const modal = document.getElementById('experienceModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Experience data
const experiences = {
  'btech': {
    title: 'BTech Computer Science',
    date: 'Aug 2023 - Present',
    company: 'Virginia Tech (Blacksburg, VA)',
    description: `
      <ul>
        <li><strong>Coursework:</strong> Data structures, Problem solving, Statistics, Computer Organization</li>
        <li>Maintaining strong academic performance while pursuing hands-on projects</li>
        <li>Actively involved in campus tech communities and workshops</li>
      </ul>
    `
  },
  'data-science': {
    title: 'Data Science Intern',
    date: 'May 2025 - Aug 2025',
    company: 'DXFactor LLC (Fairfax, VA)',
    description: `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <img src="./assets/images/2024Cipio_logo_color_blk.png" alt="CIPIO.ai Logo" style="width: 60px; height: auto; border-radius: 8px;">
        <div>
          <strong>Company:</strong> CIPIO.ai (DXFactor LLC)
        </div>
      </div>
      <ul>
        <li>Built AI Reply Service integrating Groove webhooks, Gemini, and Supabase, reducing manual drafting time 98%</li>
        <li>Automated 100% of manual follow-ups by deploying a scheduled email service with SendGrid using CRON</li>
        <li>Shipped Next.js dashboard for drafts/follow-ups; boosted agent throughput 10×, reduced errors 24%</li>
        <li>Enabled 50+ concurrent replies, <100ms DB ops through indexing, async queues and retries</li>
      </ul>
    `
  },
  'grading': {
    title: 'Undergraduate Grading Assistant',
    date: 'Aug 2024 - Dec 2024',
    company: 'VT Department of Engineering',
    description: `
      <ul>
        <li>Providing grading support to over 140 students in ENGE 1215, ensuring fair assessment and constructive feedback</li>
        <li>Collaborating with faculty to maintain a high academic standard and support student success</li>
        <li>Developing strong communication and mentoring skills</li>
      </ul>
    `
  },
  'project-management': {
    title: 'Project Management Intern',
    date: 'Aug 2024 - Dec 2024',
    company: 'Commonwealth Cyber Initiative (SW VA)',
    description: `
      <ul>
        <li>Contributing to the development of programs, including workforce development, innovation, and research initiatives</li>
        <li>Assisting in event planning for seminars and for an annual meeting involving over 40 researchers presenting their research</li>
        <li>Updated the entire CCI SWVA website Using Ensemble (CMS) including reviewing the website for accuracy, creating content and checking website's accessibility</li>
      </ul>
    `
  },
  'software-eng': {
    title: 'Software Engineering Intern',
    date: 'May 2024 - July 2024',
    company: 'Krossmark Innovations (Embee Group, India)',
    description: `
      <ul>
        <li>Working closely with a team of 5 to develop an online machine inventory system, leading to a 15% improvement in record management efficiency</li>
        <li>Implementing functionalities for adding, deleting, and updating bill of material records, reducing the time spent on these tasks by 25% using Python with SQL for Data management and React and JavaScript for frontend</li>
        <li>Taking charge of post-launch updates, troubleshooting and debugging, improving system performance by an additional 10%</li>
      </ul>
    `
  },
  'rd-intern': {
    title: 'R&D Intern',
    date: 'May 2024 - Sept 2024',
    company: 'MachWorks @ Virginia Tech',
    description: `
      <ul>
        <li>Collaborating with a multidisciplinary team to design and prototype a supersonic AI powered UAV</li>
        <li>Conducting simulations and analyses using MATLAB to validate design concepts and improve performance</li>
        <li>Developing comprehensive technical documentation, CAD models, and detailed project reports; enhancing project tracking and communication</li>
      </ul>
    `
  }
};

function openModal(experienceId) {
  const experience = experiences[experienceId];
  if (experience) {
    modalContent.innerHTML = `
      <h2>${experience.title}</h2>
      <div class="date">${experience.date}</div>
      <div class="company">${experience.company}</div>
      <div class="description">${experience.description}</div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add border class after a short delay
    setTimeout(() => {
      modal.classList.add('show-border');
    }, 300);
  }
}

// Close modal when clicking the X
closeBtn.onclick = function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  modal.classList.remove('show-border');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.classList.remove('show-border');
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    modal.classList.remove('show-border');
  }
});
