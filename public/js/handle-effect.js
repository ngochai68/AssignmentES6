// Funtion xử lý nền header
function handleHeaderBackground(a) {
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset;
    if (scrollTop >= 500) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// Funtion xử lý hover
function handleMouseHover(a, b) {
  a.addEventListener('mouseenter', () => {
    b.style.display = 'block';
  });

  a.addEventListener('mouseleave', () => {
    b.style.display = 'none';
  });
}

// Funtion xử lý click search list
function handleSearchList(a, b, c) {
  headerCtn.addEventListener('click', e => {
    e.stopPropagation();
  });

  b.addEventListener('click', () => {
    c.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (e.target != a) {
      c.style.display = 'none';
    }
  });
}
