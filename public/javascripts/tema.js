var temaSalvo = localStorage.getItem('catalogo-oficinas-tema');

if (temaSalvo === 'light' || temaSalvo === 'dark') {
  document.documentElement.setAttribute('data-bs-theme', temaSalvo);
}
