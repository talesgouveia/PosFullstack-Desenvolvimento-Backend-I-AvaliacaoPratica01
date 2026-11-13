var createError = require('http-errors');
var modelOficinas = require('../model/modelOficinas');

function tratarErro(next, erro) {
  next(erro);
}

function dadosFormulario(body) {
  var titulo = typeof body.titulo === 'string' ? body.titulo.trim() : '';
  var responsavel = typeof body.responsavel === 'string' ? body.responsavel.trim() : '';
  var descricao = typeof body.descricao === 'string' ? body.descricao.trim() : '';
  var cargaHorariaTexto = typeof body.cargaHoraria === 'string' ? body.cargaHoraria : '';
  var cargaHoraria = Number(cargaHorariaTexto);

  if (!titulo || !responsavel || !descricao) {
    return { erro: 'Preencha todos os campos.' };
  }

  if (!Number.isInteger(cargaHoraria) || cargaHoraria < 1 || cargaHoraria > 40) {
    return { erro: 'A carga horária deve ser um número inteiro entre 1 e 40 horas.' };
  }

  return {
    dados: {
      titulo: titulo,
      responsavel: responsavel,
      descricao: descricao,
      cargaHoraria: cargaHoraria
    }
  };
}

function valoresFormulario(body) {
  return {
    titulo: typeof body.titulo === 'string' ? body.titulo : '',
    responsavel: typeof body.responsavel === 'string' ? body.responsavel : '',
    descricao: typeof body.descricao === 'string' ? body.descricao : '',
    cargaHoraria: typeof body.cargaHoraria === 'string' ? body.cargaHoraria : ''
  };
}

async function obterOficina(id) {
  var oficina = await modelOficinas.consultar(id);
  if (!oficina) {
    throw createError(404, 'Oficina não encontrada');
  }
  return oficina;
}

exports.inicio = async function(req, res, next) {
  try {
    var oficinas = await modelOficinas.listar();
    res.render('index', {
      titulo_pagina: 'Oficinas cadastradas',
      inicioAtivo: true,
      oficinas: oficinas,
      resumo: await modelOficinas.resumo(),
      todasAtivo: true,
      abertasAtivo: false,
      semOficinas: oficinas.length === 0,
      nenhumaAberta: false,
      exibirModal: oficinas.length > 0
    });
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.abertas = async function(req, res, next) {
  try {
    var todasOficinas = await modelOficinas.listar();
    var oficinasAbertas = todasOficinas.filter(function(oficina) {
      return oficina.inscricoesAbertas;
    });
    res.render('index', {
      titulo_pagina: 'Oficinas cadastradas',
      inicioAtivo: true,
      oficinas: oficinasAbertas,
      resumo: await modelOficinas.resumo(),
      todasAtivo: false,
      abertasAtivo: true,
      semOficinas: todasOficinas.length === 0,
      nenhumaAberta: todasOficinas.length > 0 && oficinasAbertas.length === 0,
      exibirModal: oficinasAbertas.length > 0
    });
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.sobre = function(req, res) {
  res.render('sobre', {
    titulo_pagina: 'Sobre o catálogo',
    sobreAtivo: true
  });
};

exports.nova = function(req, res) {
  res.render('oficina/formulario', {
    titulo_pagina: 'Nova Oficina',
    titulo_formulario: 'Nova Oficina',
    novaAtivo: true,
    acaoFormulario: '/oficina/nova',
    textoBotao: 'Cadastrar',
    urlCancelar: '/',
    valores: { titulo: '', responsavel: '', descricao: '', cargaHoraria: '' }
  });
};

exports.cadastrar = async function(req, res, next) {
  try {
    var resultado = dadosFormulario(req.body);
    if (resultado.erro) {
      return res.status(400).render('oficina/formulario', {
        titulo_pagina: 'Nova Oficina',
        titulo_formulario: 'Nova Oficina',
        novaAtivo: true,
        acaoFormulario: '/oficina/nova',
        textoBotao: 'Cadastrar',
        urlCancelar: '/',
        valores: valoresFormulario(req.body),
        erroFormulario: resultado.erro
      });
    }

    await modelOficinas.cadastrar(resultado.dados);
    res.redirect('/');
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.consultar = async function(req, res, next) {
  try {
    res.render('oficina/consulta', {
      titulo_pagina: 'Consulta de Oficina',
      oficina: await obterOficina(req.params.id)
    });
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.editar = async function(req, res, next) {
  try {
    var oficina = await obterOficina(req.params.id);
    res.render('oficina/formulario', {
      titulo_pagina: 'Editar Oficina',
      titulo_formulario: 'Editar Oficina',
      acaoFormulario: '/oficina/edita/' + oficina.id,
      textoBotao: 'Salvar',
      urlCancelar: '/oficina/consulta/' + oficina.id,
      oficina: oficina,
      valores: oficina
    });
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.salvarEdicao = async function(req, res, next) {
  try {
    var oficina = await obterOficina(req.params.id);
    var resultado = dadosFormulario(req.body);
    if (resultado.erro) {
      return res.status(400).render('oficina/formulario', {
        titulo_pagina: 'Editar Oficina',
        titulo_formulario: 'Editar Oficina',
        acaoFormulario: '/oficina/edita/' + oficina.id,
        textoBotao: 'Salvar',
        urlCancelar: '/oficina/consulta/' + oficina.id,
        oficina: oficina,
        valores: valoresFormulario(req.body),
        erroFormulario: resultado.erro
      });
    }

    await modelOficinas.editar(oficina.id, resultado.dados);
    res.redirect('/');
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.alternarInscricoes = async function(req, res, next) {
  try {
    await obterOficina(req.params.id);
    await modelOficinas.alternarInscricoes(req.params.id);
    res.redirect('/');
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.excluir = async function(req, res, next) {
  try {
    await obterOficina(req.params.id);
    await modelOficinas.excluir(req.params.id);
    res.redirect('/');
  } catch (erro) {
    tratarErro(next, erro);
  }
};

exports.pesquisa = function(req, res) {
  res.render('pesquisa', {
    titulo_pagina: 'Pesquisa de Oficinas',
    pesquisaAtivo: true,
    pesquisaRealizada: false
  });
};

exports.pesquisar = async function(req, res, next) {
  try {
    var termo = typeof req.body.titulo === 'string' ? req.body.titulo.trim() : '';
    if (!termo) {
      return res.status(400).render('pesquisa', {
        titulo_pagina: 'Pesquisa de Oficinas',
        pesquisaAtivo: true,
        pesquisaRealizada: false,
        erroFormulario: 'Digite um termo para pesquisar pelo título da oficina.'
      });
    }

    var oficinas = await modelOficinas.pesquisar(termo);
    res.render('pesquisa', {
      titulo_pagina: 'Pesquisa de Oficinas',
      pesquisaAtivo: true,
      pesquisaRealizada: true,
      encontrouOficinas: oficinas.length > 0,
      oficinas: oficinas,
      termo: termo
    });
  } catch (erro) {
    tratarErro(next, erro);
  }
};
