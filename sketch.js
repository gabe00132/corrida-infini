//Variáveis globais do jogo
var fundoImg, fundo;
var cartaovermelhoImg, cartaovermelho, cartaovermelhoGroup;
var jogador, jogadorImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

//Pré-carregamento de imagens
function preload(){
  fundoImg = loadImage("FUNDO.png.jpg");
  cartaovermelhoImg = loadImage("cartaovermelho.png");
  jogadorImg = loadImage("jogador.png");
}

function setup() {
  //Tela
  createCanvas(600,600);
 
  //fundo(campo )
  fundo = createSprite(300,300);
  fundo.addImage("fundo",fundoImg);
  fundo.velocityY = 1;
  //Grupo de sprites
  cartaovermelhoGroup = new Group();
  invisibleBlockGroup = new Group();
  //jogador
  jogador= createSprite(200,200,50,50);
  jogador.scale = 0.07;
  jogador.addImage("jogador", jogadorImg);
}


function draw() {

  //Plano de fundo
  background(255);
   
  if (gameState === "play") {
      
    //DESAFIO2
    //mover p/ a esquerda quando a seta esquerda for pressionada
    if(keyDown("LEFT_ARROW")){
        jogador.x = jogador.x - 3;
    }
    //DESAFIO2
    //mover p/ direita quando a seta direita for pressionada
    if(keyDown("RIGHT_ARROW")){
      jogador.x = jogador.x + 3;
    }

    //DESAFIO2
    //mover para cima quando a tecla espaço for pressionada
    if(keyDown("SPACE")){
      jogador.velocityY = -10;      
    }

    //Gravidade do jogador
    jogador.velocityY = jogador.velocityY + 0.8;
  
    //DESAFIO1
    //Condição para a torre de rolagem infinita
    if(fundo.y > 400 ){
      fundo.y = 300
  
    } 
  
    spawnCartaovermelho();

    //DESAFIO 4 nao entendi 
    //Fantasma deve ficar parado quando estiver no climber
    if(cartaovermelhoGroup.isTouching(jogador)){
      jogador.velocityY = 0;
    }

    //DESAFIO 4
    //Quando invisibleBlockGroup colidir com o jogador,
    //destruir o jogador e mudar o estado do jogo para end.
    if(invisibleBlockGroup.isTouching(jogador) || jogador.y > 600){
      jogador.destroy;
      gameState = "end";
    }

    drawSprites();
  }

  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnCartaovermelho()
 {
  //escreva o código aqui para gerar as nuvens
  if (frameCount % 240 === 0) {
    var cartaovermelho = createSprite(200, -50);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.height = 2;
    invisibleBlock.debug = true;

    //Posições aleatórias dos cartoes
    cartaovermelho.x = Math.round(random(120,400));
    invisibleBlock.x = cartaovermelho.x;

    cartaovermelho.addImage(cartaovermelhoImg);
    
    cartaovermelho.velocityY = 1;
    invisibleBlock.velocityY = 1;

    //DESAFIO 4
    //Aumente a profundidade do fantasma em 1
    jogador.depth = fundo.depth;
    jogador.depth += 1;
    
    //DESAFIO 3
    //atribuir tempo de vida para a porta, escalador e bloco invisível
    cartaovermelhoGroup.lifetime = 800;
    invisibleBlockGroup.lifetime = 800;

   
    //DESAFIO 3
    //adicione cada obstáculo ao grupo obstaclesGroup.add(obstacle); 
    //aqui os obstáculos são as portas, o escalador e o bloco invisível
    jogadorGroup.add(jogador);
    invisibleBlockGroup.add(invisibleBlock);
  }
}