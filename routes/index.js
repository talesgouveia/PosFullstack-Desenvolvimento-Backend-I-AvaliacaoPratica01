var express = require('express');
var router = express.Router();
var controllerOficinas = require('../controller/controllerOficinas');

router.get('/', controllerOficinas.inicio);
router.get('/oficina/abertas', controllerOficinas.abertas);
router.get('/sobre', controllerOficinas.sobre);
router.get('/oficina/nova', controllerOficinas.nova);
router.post('/oficina/nova', controllerOficinas.cadastrar);
router.get('/oficina/consulta/:id', controllerOficinas.consultar);
router.get('/oficina/edita/:id', controllerOficinas.editar);
router.post('/oficina/edita/:id', controllerOficinas.salvarEdicao);
router.post('/oficina/status/:id', controllerOficinas.alternarInscricoes);
router.post('/oficina/exclui/:id', controllerOficinas.excluir);
router.get('/pesquisa', controllerOficinas.pesquisa);
router.post('/pesquisa', controllerOficinas.pesquisar);

module.exports = router;
