setTimeout(window.scrollTo(0,0),100);
class Bubbles{
    escala;
    selector;
    constructor(selector){
        this.escala = 20;
        this.selector = selector;
        this.createBubbles();
    }
    setPosition(selector){
        this.x_pos = Math.floor(Math.random() * $(selector).width() - 120) + 15;
        this.y_pos = Math.floor(Math.random() * $(selector).height()*0.9 - 80) + 60;
    }
    createBubbles(){
        setInterval(() => {
            var burbuja = $(`<div class="burbuja"></div>`);
            $(this.selector).prepend(burbuja);
            this.setPosition(this.selector);
            burbuja.css("transform", `translateX(${this.x_pos}px) translateY(${this.y_pos}px)`);
            setTimeout(() => {
                burbuja.css("transition", "transform 1s");
                burbuja.css("transform", `scale(${this.escala})`+
                ` translateX(${this.x_pos/this.escala}px)`+
                `translateY(${this.y_pos/this.escala}px)`);
                $(burbuja).fadeOut(1000, function(){
                    this.remove();
                });
            }, 5);
            burbuja.on("dragstart", (e) => e.preventDefault());
        }, 150);
    }
}
class OnStart{
    constructor(time){
        this.time = time;
        $(".home-typed").hide();
        $(".home-typed").removeClass("invisible");
    }
    startAfLogo(){
        var swipe = new Swiper();
        setTimeout(function(){
            new Bubbles($("#seccion-1"));
            new Bubbles($("#seccion-1"));
            $(".home-typed").fadeIn(200);
            setTimeout(function(){
                var typed = new Typed(`#typed`, {
                    strings: ["arrachera", "camarón", "atún", "poio :u",
                    "nuggets", "champiñones"],
                    loop: true,
                    smartBackspace: false,
                    typeSpeed: 100,
                    backSpeed: 100,
                    preStringTyped: (arrayPos, self) =>{
                        console.log(self.strings[arrayPos] + `${self.typeSpeed*self.strings[arrayPos].length*2}`);
                        //typeSpeed * self.strings[arrayPos].length*2
                        swipe.swipe(arrayPos, self.typeSpeed*self.strings[arrayPos].length*4);
                    }
                });
                $("#logo").css("transform", "translateX(20em) translateY(6em)");
                $(".typed-container").toogleClass("typed-container-toogle");
            }, this.time/2);
        }, this.time);
    }
}
class Swiper{
    constructor(){
        this.started = false;
        this.intervals = new Array(12);
    }
    swipe(index, typeSpeed){
        var imgCreated = new Array(index+1);
        var rotate = new Array(index);
        var item = this.data[index];
        for (var i = 0; i<item.ammount; i++){
            rotate[i] = Math.floor(Math.random() * 360);
            var rotated = (item.ammount === 1) ? ``:`transform: translateX(${rotate[i]}deg);`;
            imgCreated[i] = $(`<img src="${item.src}" alt="${item.index}" style="width:${item.width};`
            + ` transition: ${typeSpeed/5}ms; ${rotated}">`);
            $(".swipe").append(imgCreated);
            if (item.ammount == 1){
                setTimeout(()=>{
                    imgCreated[i].remove();
                },typeSpeed-150);
                return;
            }
        }
        for(let i = 0; i<item.ammount; i++){
            this.intervals[i] = setInterval(()=>{
                var x_pos = Math.floor(Math.random() * 200) - 100;
                var y_pos = Math.floor(Math.random() * 70);
                imgCreated[i].css("transform", `translateX(${x_pos}%) translateY(${y_pos}%) rotateX(${rotate[i]}deg)`);
            }, typeSpeed/5);
            setTimeout(() => {
                clearInterval(this.intervals[i]);
                imgCreated[i].remove();
            }, typeSpeed- 150);
        }
        return;
    }
    data = [
        {
            "id": 0,
            "index": "arrachera",
            "ammount": 1,
            "width": "15%",
            "src": "dependencias/images/arrachera.png"
        }, {
            "id": 1,
            "index": "camaron",
            "ammount": 9,
            "width": "2%",
            "src": "dependencias/images/camaron.png"
        }, {
            "id": 2,
            "index": "atun",
            "ammount": 1,
            "width": "12%",
            "src": "dependencias/images/atun.png"
        }, {
            "id": 3,
            "index": "pollo",
            "ammount": 1,
            "width":"12%",
            "src": "dependencias/images/repoio.png"
        }, {
            "id": 4,
            "index": "nuggets",
            "ammount":5,
            "width":"4%",
            "src": "dependencias/images/nugget.png"
        }, {
            "id": 5,
            "index": "champiñones",
            "ammount":9,
            "width":"2%",
            "src": "dependencias/images/hongo.png"
        }
    ]
}

class Trigger{
    constructor(){
        this.cosa;
    }
    onHover(){

    }
    onTrigger(){

    }
    onReset(){

    }
}
var start = new OnStart(2200);
$(document).ready(function(){
    $("#logo").on("dragstart", (e) => e.preventDefault());
    $("#seccion-1").ripples({
        dropRadius: 20,
        perturbance: 0.01
    });
    $("#seccion-1").ripples();
    start.startAfLogo();
    var render = false;
    $(window).scroll(()=>{
        if ($(window).scrollTop() >= 220 && !render){
            new Motor({
                selector: `#cubo`,
                $shadow: $(`#shadow`),
                trigger: new Trigger(),
                $stars: $(`#estrellas`),
                contenedor: `#contenedor`
            });
            new Motor({
                selector: `#cubo2`,
                $shadow: $(`#shadow2`),
                trigger: new Trigger(),
                $stars: $(`#estrellas2`),
                contenedor: `#contenedor2`
            });
            render = true;
        }
    });
});