let xp = 0;
let vida = 100;
let ouro = 50;
let armaAtual = 0;
let lutando;
let monstroVida;
let inventario = ["Pauzinho"];

const botao1 = document.querySelector('#button1');
const botao2 = document.querySelector("#button2");
const botao3 = document.querySelector("#button3");
const texto = document.querySelector("#text");
const xpTexto = document.querySelector("#xpText");
const vidaTexto = document.querySelector("#healthText");
const ouroTexto = document.querySelector("#goldText");
const monstroStats = document.querySelector("#monsterStats");
const monstroNome = document.querySelector("#monsterName");
const monstroVidaTexto = document.querySelector("#monsterHealth");
const armas = [
  { nome: 'Pauzinho', poder: 5 },
  { nome: 'Adaga', poder: 30 },
  { nome: 'Martelo Pesado', poder: 50 },
  { nome: 'ESPADA DOS DEUSES', poder: 100 }
];
const monstros = [
  {
    nome: "Gosminha",
    level: 2,
    vida: 15
  },
  {
    nome: "Lobão do Mal",
    level: 8,
    vida: 60
  },
  {
    nome: "Dragão dos Deuses Foda",
    level: 20,
    vida: 300
  }
]
const localizações = [
  {
    nome: "cidade",
    "botão texto": ["Ir para loja", "Ir para caverna", "Lutar contra o DRAGÃO DOS DEUSES"],
    "botão funções": [irLoja, irCaverna, lutarDragao],
    texto: "Você está no centro da cidade. Você vê uma placa que diz \"Loja\"."
  },
  {
    nome: "loja",
    "botão texto": ["Comprar 10 de vida (10 ouro)", "Comprar Arma (30 ouro)", "Voltar para cidade"],
    "botão funções": [comprarVida, comprarArma, irCidade],
    texto: "Você entra na loja."
  },
  {
    nome: "caverna",
    "botão texto": ["Lutar contra a Gosminha", "Lutar contra o Lobão do Mal", "Voltar para a cidade"],
    "botão funções": [lutarSlime, lutarLobo, irCidade],
    texto: "Você entra na caverna. Você vê alguns monstros."
  },
  {
    nome: "lutar",
    "botão texto": ["Atacar", "Esquivar", "Correr"],
    "botão funções": [atacar, esquivar, irCidade],
    texto: "Você está lutando contra um monstro."
  },
  {
    nome: "matar monstro",
    "botão texto": ["Lutar contra Lobão do Mal", "Lutar contra Gosminha", "Voltar para a cidade"],
    "botão funções": [lutarLobo, lutarSlime, irCidade],
    texto: 'O monstro grita "AI CARALHO!" e morre. Você ganha XP e encontra ouro.'
  },
  {
    nome: "perder",
    "botão texto": ["TENTAR DE NOVO?", "TENTAR DE NOVO?", "TENTAR DE NOVO?"],
    "botão funções": [restart, restart, restart],
    texto: "VOCÊ MORREU HAHA. &#x2620;"
  },
  { 
    nome: "ganhar", 
    "botão texto": ["TENTAR DE NOVO?", "TENTAR DE NOVO?", "TENTAR DE NOVO?"], 
    "botão funções": [restart, restart, restart], 
    texto: "VOCÊ MATO O DRAGÃO DOS DEUSES! VOCÊ GANHOU O JOGO GG! &#x1F389;" 
  },
  {
    nome: "easter egg",
    "botão texto": ["2", "8", "Voltar para a cidade?"],
    "botão funções": [escolherDois, escolherOito, irCidade],
    texto: "Você achou um jogo secreto. Escolha um dos números acima. Números serão selecionados entre 0 e 10. Se o número que você escolheu exista na lista, tu ganha!"
  }
];

// initialize buttons
botao1.onclick = irLoja;
botao2.onclick = irCaverna;
botao3.onclick = lutarDragao;

function update(localização) {
  monstroStats.style.display = "none";
  botao1.innerText = localização["button text"][0];
  botao2.innerText = localização["button text"][1];
  botao3.innerText = localização["button text"][2];
  botao1.onclick = localização["button functions"][0];
  botao2.onclick = localização["button functions"][1];
  botao3.onclick = localização["button functions"][2];
  texto.innerHTML = localização.text;
}

function irCidade() {
  update(localizações[0]);
}

function irLoja() {
  update(localizações[1]);
}

function irCaverna() {
  update(localizações[2]);
}

function comprarVida() {
  if (ouro >= 10) {
    ouro -= 10;
    vida += 10;
    ouroTexto.innerText = ouro;
    vidaTexto.innerText = vida;
  } else {
    texto.innerText = "Você não tem ouro o suficiente para comprar vida";
  }
}

function comprarArma() {
  if (armaAtual < armas.length - 1) {
    if (ouro >= 30) {
      ouro -= 30;
      armaAtual++;
      ouroTexto.innerText = ouro;
      let newWeapon = armas[armaAtual].nome;
      texto.innerText = "Você agora possui um " + newWeapon + ".";
      inventario.push(newWeapon);
      texto.innerText += " No seu inventário você tem: " + inventario;
    } else {
      texto.innerText = "Você não tem ouro o suficiente para comprar uma arma.";
    }
  } else {
    texto.innerText = "Você já tenha a ESPADA DOS DEUSES porra, quer mais?!";
    botao2.innerText = "Vender arma por 15 ouro";
    botao2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventario.length > 1) {
    ouro += 15;
    ouroTexto.innerText = ouro;
    let currentWeapon = inventario.shift();
    texto.innerText = "Você vendeu um " + currentWeapon + ".";
    texto.innerText += " No seu inventário você tem: " + inventario;
  } else {
    texto.innerText = "Não venda sua única arma, imbecil!";
  }
}

function lutarSlime() {
  lutando = 0;
  irLuta();
}

function lutarLobo() {
  lutando = 1;
  irLuta();
}

function lutarDragao() {
  lutando = 2;
  irLuta();
}

function irLuta() {
  update(localizações[3]);
  monstroVida = monstros[lutando].vida;
  monstroStats.style.display = "block";
  monstroNome.innerText = monstros[lutando].nome;
  monstroVidaTexto.innerText = monstroVida;
}

function atacar() {
  texto.innerText = "O " + monstros[lutando].nome + " ataca.";
  texto.innerText += " Você ataca ele com seu " + armas[armaAtual].nome + ".";
  vida -= pegarMonstroValorAtaque(monstros[lutando].level);
  if (monstroFoiAtacado()) {
    monstroVida -= armas[armaAtual].poder + Math.floor(Math.random() * xp) + 1;    
  } else {
    texto.innerText += " Você erra.";
  }
  vidaTexto.innerText = vida;
  monstroVidaTexto.innerText = monstroVida;
  if (vida <= 0) {
    perder();
  } else if (monstroVida <= 0) {
    if (lutando === 2) {
      ganharJogo();
    } else {
      matarMonstro();
    }
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    texto.innerText += " Seu " + inventario.pop() + " quebra.";
    armaAtual--;
  }
}

function pegarMonstroValorAtaque(level) {
  const pegar = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(pegar);
  return pegar > 0 ? pegar : 0;
}

function monstroFoiAtacado() {
  return Math.random() > .2 || vida < 20;
}

function esquivar() {
  texto.innerText = "Você esquiva o ataque do " + monstros[lutando].nome;
}

function matarMonstro() {
  ouro += Math.floor(monstros[lutando].level * 6.7);
  xp += monstros[lutando].level;
  ouroTexto.innerText = ouro;
  xpTexto.innerText = xp;
  update(localizações[4]);
}

function perder() {
  update(localizações[5]);
}

function ganharJogo() {
  update(localizações[6]);
}

function restart() {
  xp = 0;
  vida = 100;
  ouro = 50;
  armaAtual = 0;
  inventario = ["stick"];
  ouroTexto.innerText = ouro;
  vidaTexto.innerText = vida;
  xpTexto.innerText = xp;
  irCidade();
}

function easterEgg() {
  update(localizações[7]);
}

function escolherDois() {
  pick(2);
}

function escolherOito() {
  pick(8);
}

function pick(adivinha) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  texto.innerText = "Você escolheu " + adivinha + ". Aqui está os números alea:\n";
  for (let i = 0; i < 10; i++) {
    texto.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(adivinha)) {
    texto.innerText += "Certo! Você ganha 20 de ouro!";
    ouro += 20;
    ouroTexto.innerText = ouro;
  } else {
    texto.innerText += "Errado! Você perde 10 de vida!";
    vida -= 10;
    vidaTexto.innerText = vida;
    if (vida <= 0) {
      perder();
    }
  }
}