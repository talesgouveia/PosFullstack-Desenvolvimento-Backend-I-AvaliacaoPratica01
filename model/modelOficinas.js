var oficinas = [];
var proximoId = 1;

exports.listar = async function() {
  return oficinas.map(function(oficina) {
    return Object.assign({}, oficina);
  });
};

exports.consultar = async function(id) {
  var oficina = oficinas.find(function(item) {
    return item.id === Number(id);
  });

  return oficina ? Object.assign({}, oficina) : undefined;
};

exports.cadastrar = async function(dados) {
  var oficina = {
    id: proximoId,
    titulo: dados.titulo,
    responsavel: dados.responsavel,
    descricao: dados.descricao,
    cargaHoraria: dados.cargaHoraria,
    inscricoesAbertas: true
  };

  proximoId += 1;
  oficinas.push(oficina);
  return Object.assign({}, oficina);
};

exports.editar = async function(id, dados) {
  var oficina = oficinas.find(function(item) {
    return item.id === Number(id);
  });

  if (!oficina) {
    return undefined;
  }

  oficina.titulo = dados.titulo;
  oficina.responsavel = dados.responsavel;
  oficina.descricao = dados.descricao;
  oficina.cargaHoraria = dados.cargaHoraria;
  return Object.assign({}, oficina);
};

exports.alternarInscricoes = async function(id) {
  var oficina = oficinas.find(function(item) {
    return item.id === Number(id);
  });

  if (!oficina) {
    return false;
  }

  oficina.inscricoesAbertas = !oficina.inscricoesAbertas;
  return true;
};

exports.excluir = async function(id) {
  var indice = oficinas.findIndex(function(item) {
    return item.id === Number(id);
  });

  if (indice === -1) {
    return false;
  }

  oficinas.splice(indice, 1);
  return true;
};

exports.pesquisar = async function(termo) {
  var textoPesquisado = termo.toLowerCase();
  return (await exports.listar()).filter(function(oficina) {
    return oficina.titulo.toLowerCase().includes(textoPesquisado);
  });
};

exports.resumo = async function() {
  var resumo = {
    total: oficinas.length,
    abertas: 0,
    encerradas: 0,
    cargaHorariaAbertas: 0
  };

  oficinas.forEach(function(oficina) {
    if (oficina.inscricoesAbertas) {
      resumo.abertas += 1;
      resumo.cargaHorariaAbertas += oficina.cargaHoraria;
    } else {
      resumo.encerradas += 1;
    }
  });

  return resumo;
};
