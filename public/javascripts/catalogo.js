var modalExcluir = document.getElementById('modalExcluir');

if (modalExcluir) {
  modalExcluir.addEventListener('show.bs.modal', function(event) {
    var botao = event.relatedTarget;
    var id = botao.getAttribute('data-id');
    var titulo = botao.getAttribute('data-titulo');

    document.getElementById('tituloOficinaExcluir').textContent = titulo;
    document.getElementById('formExcluir').action = '/oficina/exclui/' + id;
  });
}

var botaoTema = document.getElementById('alternarTema');

if (botaoTema) {
  var atualizarBotaoTema = function(tema) {
    var proximoTema = tema === 'dark' ? 'claro' : 'escuro';
    botaoTema.textContent = 'Tema: ' + (tema === 'dark' ? 'escuro' : 'claro');
    botaoTema.setAttribute('aria-label', 'Tema atual: ' + (tema === 'dark' ? 'escuro' : 'claro') + '. Alternar para tema ' + proximoTema);
  };

  atualizarBotaoTema(document.documentElement.getAttribute('data-bs-theme'));

  botaoTema.addEventListener('click', function() {
    var temaAtual = document.documentElement.getAttribute('data-bs-theme');
    var novoTema = temaAtual === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-bs-theme', novoTema);
    localStorage.setItem('catalogo-oficinas-tema', novoTema);
    atualizarBotaoTema(novoTema);
  });
}
