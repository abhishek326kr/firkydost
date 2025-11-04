// Basic interactivity: color mode, contact form, year
(() => {
  const root = document.documentElement;
  const body = document.body;
  const toggle = document.getElementById('color-mode-toggle');
  const yearEl = document.getElementById('year');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // init mode
  function setMode(mode){
    if(mode === 'light'){
      document.body.classList.add('light-mode');
      toggle.textContent = '☀️';
    } else {
      document.body.classList.remove('light-mode');
      toggle.textContent = '🌙';
    }
    localStorage.setItem('color-mode', mode);
  }

  const saved = localStorage.getItem('color-mode');
  if(saved) setMode(saved);
  else setMode(prefersDark ? 'dark' : 'light');

  toggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-mode');
    setMode(isLight ? 'dark' : 'light');
  });

  // set year
  yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href === '#') return;
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
})();

// Simple contact handler: open mailto with pre-filled subject/body
function submitContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if(!name || !email || !message){
    alert('Please fill all fields.');
    return;
  }

  const mailto = `mailto:abhishek326kr@gmail.com?subject=${encodeURIComponent('Website contact from ' + name)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from portfolio`
  )}`;

  window.location.href = mailto;
}

// fallback button
function openMail(){
  window.location.href = 'mailto:abhishek326kr@gmail.com';
}
