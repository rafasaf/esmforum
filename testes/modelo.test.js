const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando resposta para pergunta', () =>{

  const id = modelo.cadastrar_pergunta('22 + 22 = ?');
  modelo.cadastrar_resposta(id, '44');
  expect(modelo.get_num_respostas(id)).toBe(1);
})

test('Testando se pergunta foi respondida', () =>{

  modelo.cadastrar_pergunta('maior de minas = ?');
  modelo.cadastrar_resposta(1,'cruzeiro!');
  const respostas = modelo.get_respostas(1);
  expect(respostas.length).toBe(1);
})

test('Testando se pergunta foi cadastrada', () =>{

  const id = modelo.cadastrar_pergunta('22 + 22 = ?');
  const perguntas = modelo.get_pergunta(id);
  expect(perguntas.texto).toBe('22 + 22 = ?');
})
