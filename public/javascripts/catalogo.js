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
