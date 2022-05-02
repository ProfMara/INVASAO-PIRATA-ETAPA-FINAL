class Barco {
    constructor(x, y, width, height, barcoAnimacao) {
        this.animacao = barcoAnimacao;
        this.speed = 0;
        this.quebrado = false;
        this.body = Bodies.rectangle(x, y, width, height);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }

    animate() {
        this.speed += 0.05;
    }

    remove(index) {

        this.quebrado = true;
        this.speed = 0.05;
        this.width = 300;
        this.height = 300;
        //definir a animação para quebrado

        //acrescentar um intervalo de tempo para remover o barco do mundo

        
    }

    display() {
        var angle = this.body.angle;
        var pos = this.body.position;
        var indice = floor(this.speed % this.animacao.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animacao[indice], 0, 0, this.width, this.height);
        pop();
    }
}