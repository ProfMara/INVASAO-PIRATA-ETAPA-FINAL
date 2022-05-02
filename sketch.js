const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, cenario, barco;
var canvas, angle, torreIMG, torre, solo, canhao;
var balas = [];
var barcos = [];

var barcoAnimacao = [];
var barcoDados;
var barcoFolhaImagem;

var barcoQuebradoAnimacao = [];
var barcoDadosQ;
var barcoFolhaImagemQ;

var aguaSplashAnimacao = []
var aguaSplashDados;
var aguaSplashFolhaImagem;

var jogoAcabou = false;

var musicaFundo;

var pontos = 0;

function preload() {
    cenario = loadImage("./assets/background.gif");
    torreIMG = loadImage("./assets/tower.png");

    barcoDados = loadJSON("./boat/boat.json");
    barcoFolhaImagem = loadImage("./boat/boat.png");

    barcoDadosQ = loadJSON("./boat/brokenBoat.json");
    barcoFolhaImagemQ = loadImage("./boat/brokenBoat.png");

    aguaSplashDados = loadJSON("./waterSplash/waterSplash.json");
    aguaSplashFolhaImagem = loadImage("./waterSplash/waterSplash.png");

    musicaFundo = loadSound("musicaFundo.mp3");

}

function setup() {
    canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;
    angleMode(DEGREES)
    angle = 15

    solo = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
    World.add(world, solo);

    torre = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
    World.add(world, torre);

    canhao = new Canhao(180, 110, 130, 100, angle);

    var barcoFrames = barcoDados.frames;
    for (var i = 0; i < barcoFrames.length; i++) {
        var pos = barcoFrames[i].position;
        var img = barcoFolhaImagem.get(pos.x, pos.y, pos.w, pos.h);
        barcoAnimacao.push(img);
    }

    var barcoFramesQ = barcoDados.frames;
    for (var i = 0; i < barcoFramesQ.length; i++) {
        var pos = barcoFramesQ[i].position;
        var img = barcoFolhaImagemQ.get(pos.x, pos.y, pos.w, pos.h);
        barcoQuebradoAnimacao.push(img);
    }


    var aguaSplashFrames = aguaSplashDados.frames;
    for (var i = 0; i < aguaSplashFrames.length; i++) {
        var pos = aguaSplashFrames[i].position;
        var img = aguaSplashFolhaImagem.get(pos.x, pos.y, pos.w, pos.h);
        aguaSplashAnimacao.push(img);
    }
}

function draw() {
    background(189);
    image(cenario, 0, 0, width, height);
    textSize(40)
    text(pontos, 1050,50);
   

    Engine.update(engine);
    rect(solo.position.x, solo.position.y, width * 2, 1);
    push();
    imageMode(CENTER);
    image(torreIMG, torre.position.x, torre.position.y, 160, 310);
    pop();

    for (var i = 0; i < balas.length; i++) {
        mostrarBalas(balas[i], i);
        colidiuComBarco(i)

    }

    canhao.display();
    mostrarBarco();
}

function keyPressed() {
    if (keyCode === 32) {
        var bala = new BalaCanhao(canhao.x, canhao.y);
        bala.trajectory = [];
        Matter.Body.setAngle(bala.body, canhao.angle);
        balas.push(bala);
        balas[balas.length - 1].atirar();
    }
}

function mostrarBalas(bala, i) {
    if (bala) {
        bala.animate();
        bala.display();
        if (balas[i].body.position.y >= height - 50 || balas[i].body.position.x >= width + 5) {
            balas[i].remove(i);
        }
    }
}


function mostrarBarco() {

    if (barcos.length > 0) {
        if (
            barcos[barcos.length - 1] === undefined ||
            barcos[barcos.length - 1].body.position.x < width - 300
        ) {

            var barco = new Barco(width, height - 100, 150, 150, barcoAnimacao);
            barcos.push(barco);
        }

        for (var i = 0; i < barcos.length; i++) {
            if (barcos[i]) {
                Matter.Body.setVelocity(barcos[i].body, {
                    x: -2,
                    y: 0
                });

                //detectar a colisão entre a torre e o barco


                //se ocorreu, então, fim de jogo

               


                barcos[i].animate();
                barcos[i].display();

            }
        }
    } else {
        var barco = new Barco(width, height - 60, 170, 170, barcoAnimacao);
        barcos.push(barco);
    }
}

function colidiuComBarco(b) {
    for (var n = 0; n < barcos.length; n++) {
        if (barcos[n] !== undefined && balas[b] !== undefined) {
            
            //detectar a colisão entre a bala e o barco

            //se a colisão ocorreu, então, remover a bala e o barco


        }
    }
}

function gameOver() {

    swal({
        title: `Fim de jogo!!!`,
        text: "Obrigado por jogar!",
        imageUrl: "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
        imageSize: "150x150",
        confirmButtonText: "Jogar Novamente"
    }, function(isConfirm) {
        if (isConfirm) {
            location.reload();
        }
    })

}