const header = document.querySelector('header');

let section_about = document.querySelector('#about');
let section_contact = document.querySelector('#contact');
let section_services = document.querySelector('#services');

const header_home = document.querySelector('#header-home'),
  header_about = document.querySelector('#header-about'),
  header_services = document.querySelector('#header-services'),
  header_contact = document.querySelector('#header-contact'),
  header_links = document.querySelectorAll('nav li a');

const line_home = document.querySelector('#first'),
  line_about = document.querySelector('#second'),
  line_services = document.querySelector('#third'),
  line_contact = document.querySelector('#fourth'),
  lines = document.querySelectorAll('#navigation_lines .nav-line');


let about_top,
  contact_top,
  services_top,
  loaded = false;

window.onload = function() {
  about_top = section_about.offsetTop - 100;
  services_top = section_services.offsetTop - 300;
  contact_top = section_contact.offsetTop - 400;
  loaded = true;
  setActive();

  let menu_button = document.querySelector('#menu-icon');
  let nav = document.querySelector('nav');
  let navLinks = document.querySelectorAll('nav a');
  let isMenuExpanded = false;

  menu_button.addEventListener('click', function() {
    if (isMenuExpanded) {
      isMenuExpanded = false;
      menu_button.classList.remove('cross');
      nav.style.display = 'none';
      document.querySelector('body').style.overflow = 'unset';
      document.querySelector('header').classList.remove('mobile');
    } else {
      isMenuExpanded = true;
      menu_button.classList.add('cross');
      nav.style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('header').classList.add('mobile');
    }
  })

  if (window.innerWidth <= 768) {
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function() {
        quitMobileMenu()

        $('html, body').animate({
          scrollTop: $(this.hash).offset().top - 70
        },1, function(){});
      })
    }
  } else {
    let links = document.querySelectorAll('a[href^="#"]');
    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
          scrollTop: $(this.hash).offset().top - 50
        }, 1000, function(){
        });
      });
    }
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].removeEventListener('click', function() {
        quitMobileMenu()
      })
    }
  }

  function quitMobileMenu() {
    menu_button.classList.remove('cross');
    nav.style.display = 'none';
    isMenuExpanded = false;
    document.querySelector('body').style.overflow = 'unset';
    document.querySelector('header').classList.remove('mobile');
  }
}

document.onscroll = function() {
  let position = window.scrollY || document.documentElement.scrollTop;
  position += 50;

  if (position <= 50) {
    header.classList.remove('scroll');
  } else {
    header.classList.add('scroll');
  }

  activateColor(position);
  activateLinks(position);
}

function setActive() {
  let position = window.scrollY || document.documentElement.scrollTop;
  position += 50;

  if (position <= 50) {
    header.classList.remove('scroll');
  } else {
    header.classList.add('scroll');
  }

  activateColor(position);
  activateLinks(position);
}

function activateLinks(position) {
  if (position) {
    if (position <= about_top) {
      removeActive();
      header_home.classList.add('active');
      line_home.classList.add('active');
    } else if ((position > about_top) && (position <= services_top)) {
      removeActive();
      header_about.classList.add('active');
      line_about.classList.add('active');
    } else if ((position > services_top) && (position <= contact_top)) {
      removeActive();
      header_services.classList.add('active');
      line_services.classList.add('active');
    } else if ((position > contact_top)) {
      removeActive();
      header_contact.classList.add('active');
      line_contact.classList.add('active');
    }
  }
}

function activateColor(position) {
  if (position) {
    if (position <= about_top - 270 ) {
      removeWhite();
      for (let i = 0; i < lines.length; i++) {
        lines[i].classList.add('white');
      }
    } else if ((position > about_top - 270) && (position <= services_top - 270)) {
      removeWhite();
    } else if ((position > services_top - 270) && (position <= contact_top - 50)) {
      removeWhite();
    } else if ((position > contact_top - 50)) {
      removeWhite();
      for (let i = 0; i < lines.length; i++) {
        lines[i].classList.add('white')
      }
    }
  }
}

function removeActive() {
  for (let i = 0; i < header_links.length; i++) {
    header_links[i].classList.remove('active');
  }
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.remove('active');
  }
}

function removeWhite() {
  for (let i = 0; i < lines.length; i++) {
    lines[i].classList.remove('white');
  }
}
