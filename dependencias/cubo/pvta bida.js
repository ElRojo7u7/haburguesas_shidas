$.device = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    $.device = true;
} else if (window.matchMedia("(max-width: 1024px)").matches){
    $.device = true;
}


class Cubo{
    angX=-45; angY=45; Ypos; timer =0;
    current_mouseX; current_mouseY;
    before_mouseX; before_mouseY; motor;
    mouse_down; mouse_up; movido = false;
    rotado = false;
    constructor($shadow, contenedor){
        this.$shadow = $shadow;
        this.$shadow_weight = parseInt($(this.$shadow).css("width"));
        //not a jquery object
        this.contenedor = contenedor;
    }
    rotar_imagenes(cambio){
        //1 es cuando se rota, 0 es volver al original
        //advertencia, notar que aquí se usa la id tal cual sin this.contenedor
        var traslacionZ = parseInt($(`${this.contenedor} div div div:nth-child(1)`).css("transform").split(",")[14]);
        if(cambio){
            $(`${this.contenedor} div div div:nth-child(1)`).css(`transform`, `translateZ(${traslacionZ}px) rotateZ(180deg)`);
            $(`${this.contenedor} div div div:nth-child(2)`).css(`transform`, `rotateX(180deg) translateZ(${traslacionZ}px) rotateZ(0deg)`);
            for(let i = 3; i<=4; i++){
                $(`${this.contenedor} div div div:nth-child(${i})`).css(`transform`, `
                rotateY(${(i===3) ? -90:90}deg) translateZ(${traslacionZ}px) rotateZ(180deg)`);
            }
        } else{
            $(`${this.contenedor} div div div:nth-child(1)`).css(`transform`, `translateZ(${traslacionZ}px) rotateZ(0deg)`);
            $(`${this.contenedor} div div div:nth-child(2)`).css(`transform`, `rotateX(180deg) translateZ(${traslacionZ}px) rotateZ(180deg)`);
            for(let i = 3; i<=4; i++){
                $(`${this.contenedor} div div div:nth-child(${i})`).css(`transform`, `
                rotateY(${(i===3) ? -90:90}deg) translateZ(${traslacionZ}px) rotateZ(0deg)`);
            }
        }
    }
    movimiento(selector, event){
        this.angX += (this.before_mouseY - this.current_mouseY)*.5;
        this.angY += ((this.angX < 100 && this.angX >-100) || this.angX<-260 || this.angX>260)
            ? (this.current_mouseX - this.before_mouseX)*.5 : (this.before_mouseX - this.current_mouseX)*.5;
        this.angY += (this.angY>405) ? -360: (this.angY<-315) ? 360:0;
        this.angX += (this.angX>315) ? -360: (this.angX<-405) ? 360:0;
        $(selector).css("transform", "rotateX("+this.angX+"deg) rotateY("+this.angY+"deg) translateY("+this.Ypos+"px)");
        this.before_mouse = event;
        this.movido = false;
        if((this.angX<275 && this.angX > 95) || (this.angX>-275 && this.angX<-95)){
            this.rotar_imagenes(1);
        } else{this.rotar_imagenes(0);}
    }
    infinito(selector){
        this.Ypos = Math.sin(this.timer++/10)*30;
        //resetea timer para no almacenar numeros grandes
        this.timer -= (this.Ypos < 1 && this.Ypos !=0 && this.Ypos>0) ? (this.timer-1):0;
        this.angX = -45;
        //resetea angY para no almacenar numeros grandes
        this.angY -= (this.angY>405) ? 360:0;
        $(selector).css("transform", "rotateX(-45deg) rotateY("+this.angY+++"deg) translateY("+this.Ypos+"px)");
        //var ancho = (this.Ypos < 0) ? this.Ypos*-1 + 80:this.Ypos*1 + 80;
        $(this.$shadow).css("box-shadow", `0px -50px ${(this.Ypos < 0) ? this.Ypos*-0.2:this.Ypos*0.08}px rgba(0, 0, 0, ${0.8+this.Ypos*0.01})`);
        $(this.$shadow).css("width", `${this.$shadow_weight-this.Ypos}px`);
    }
    restore(selector){
        self = this;
        this.angY = 45; this.Ypos = Math.sin(this.timer/10)*30;
        $(selector).css("transition", "transform 1500ms");
        $(selector).css("transform", `rotateX(-45deg) rotateY(${this.angY}deg) translateY(${this.Ypos}px)`);
        //$(this.contenedor).css("transform", "translateX(0%)");
        window.setTimeout(function(){
            $(selector).css("transition", "transform 1ms");
        },1400)
        window.setTimeout(function(){
            self.rotar_imagenes(0);
        }, 490);
    }
    moverIzq(selector){
        if(window.matchMedia("(max-width: 480px)").matches){
            return;
        }
            window.setTimeout(function(){
                $(this.contenedor).css("transition", "transform 1300ms");
                $(this.contenedor).css("transform", "translateX(-35%)");
                window.setTimeout(function(){
                    $(selector).css("transition", "transform 1ms");
                }, 500);
            }, 500);
    }
    posiciones(selector){
        if(this.movido){return false;}
        var margen = 35;
        //rosa
        if((this.angX<-90+margen && this.angX>-90-margen) || (this.angX>270-margen && this.angX<270+margen)){
            var angulo = (this.angX<-80 && this.angX>-100) ? -90:270;
            $(selector).css("transition", "transform 500ms"); this.angX = angulo; this.angY = 0;
            $(selector).css("transform", `rotateX(${angulo}deg) rotateY(0deg) translateY(${this.Ypos}px)`);
            this.movido = true;
            //para mover el cubo
            //this.moverIzq(selector);
            return 1;
        //gris
        } else if((this.angX>90-margen && this.angX<90+margen) || (this.angX>-270-margen && this.angX<-270+margen)){
            $(selector).css("transition", "transform 500ms"); this.angX = 90; this.angY = 0;
            $(selector).css("transform", `rotateX(90deg) rotateY(0deg) translateY(${this.Ypos}px)`);
            this.movido = true;
            //para mover el cubo
            //this.moverIzq(selector);
            return 2;
        }
        //físicas en 4 laterales
        for(var i = 0;i<=4;i++){
            var anguloY = 90*i;
            for(var j = 0;j<=4;j++){
                var anguloX=90*j;
                if(((this.angX<anguloX+margen && this.angX>anguloX-margen) || (this.angX<-anguloX+margen && this.angX>-anguloX-margen))
                && ((this.angY>anguloY-margen && this.angY<anguloY+margen) || (this.angY>-anguloY-margen && this.angY<-anguloY+margen))){
                    var volteadoX = (this.angX<-anguloX+margen && this.angX>-anguloX-margen) ? -anguloX:anguloX;
                    var volteadoY = (this.angY>-anguloY-margen && this.angY<-anguloY+margen) ? -anguloY:anguloY;
                    $(selector).css("transition", "transform 500ms"); this.angX = volteadoX; this.angY = volteadoY;
                    $(selector).css("transform", `rotateX(${volteadoX}deg) rotateY(${volteadoY}deg) translateY(${this.Ypos}px)`);
                    //para mover el cubo
                    //this.moverIzq(selector);
                            //html
                    return ((this.angX == 0 && (this.angY == 90 || this.angY == -270)) || (this.angX == 180 && (this.angY == -90 || this.angY == 270))
                            || (this.angX == -180 && (this.angY == -90 || this.angY == 270)) || (this.angX == -360 && (this.angY == 90 || this.angY == -270))) ? 3
                            //css
                            :((this.angX == 0 && (this.angY == 0 || this.angY == 360)) || (this.angX == -180 && (this.angY == 180 || this.angY == -180))
                            || (this.angX == -360 && (this.angY == 0 || this.angY == 360)) || (this.angX == 180 && (this.angY == 180 || this.angY == -180))) ? 4
                            //js
                            :((this.angX == 0 && (this.angY == 180 || this.angY == -180)) || (this.angX == -180 && (this.angY == 0 || this.angY == 360))
                            || (this.angX == -360 && (this.angY == 180 || this.angY == -180)) || (this.angX == 180 && (this.angY == 0 || this.angY == 360))) ? 5
                            //sql
                            : 6;
                }
            }
        } return false;
    }
    set current_mouse(event){
        if($.device){
            this.current_mouseX = event.originalEvent.touches[0].pageX;
            this.current_mouseY = event.originalEvent.touches[0].pageY;
        } else{
            this.current_mouseX = event.pageX;
            this.current_mouseY = event.pageY;
        }
    }
    set before_mouse(event){
        if($.device){
            this.before_mouseX = event.originalEvent.touches[0].pageX;
            this.before_mouseY = event.originalEvent.touches[0].pageY;
        } else{
            this.before_mouseX = event.pageX;
            this.before_mouseY = event.pageY;
        }
    }
}
class Motor{
    constructor(config){
        this.selected = config.selector;
        this.$shadow = config.$shadow;
        this.trigger = config.trigger;
        this.$stars = config.$stars;
        //this.contenedor, not a jquery object
        this.contenedor = config.contenedor;
        console.log("ola k ase :u");
        this.main();
    }
    playSound(){
        document.getElementById("Coin").play();
    }
    main(){
        var cubo = new Cubo(this.$shadow, this.contenedor); var timeout = 0; var timep;
        var mouse_down = false; var mouse_up = true; var start = true;
        var selected = this.selected;
        var self = this;
        function onMouseUp(){
            mouse_down = false;
            mouse_up = true;
            timep = window.setTimeout(function(){
                var posicion = (timeout < 30) ? cubo.posiciones(selected):false;
                //if(posicion != false && timeout < 30)
                if(posicion != false && timeout < 30){
                    $(self.$stars).attr("src", "dependencias/cubo/images/stars.gif");
                    $(self.$stars).css("visibility", "visible");
                    //self.playSound();
                    timeout = -500;
                        window.setTimeout(function(){
                        self.trigger.onSelected();
                    }, 700); 
                }
            },150);
        }
        window.setInterval(function(){
            if(start){
                cubo.infinito(selected);
            }
            if(mouse_up && !start){
                timeout++; start = (timeout > 100) ? true:false;
                mouse_up = !start; timeout = (timeout > 100) ? 0:timeout;
                if(timeout == 30){
                    self.trigger.onRestart();
                }
                if(timeout > 69){
                    cubo.restore(selected);
                    $(self.$stars).css("visibility", "hidden");
                }
            }
        }, 50);
        $(this.selected).on("mousedown touchstart", function(e){
            if(self.touch){
                clearInterval(self.touch);
            }
            mouse_down = true;
            mouse_up = false;
            cubo.before_mouse = e;
            start = false; timep = false;
            //$("#aux").fadeOut(2000);
        });
        $(this.selected).on("mouseup mouseleave touchend", function(){
            mouse_down = false;
            mouse_up = true;
            if($.device){
                self.touch = setTimeout(function(){
                    if(mouse_up){
                        onMouseUp();
                    }
                }, 500);
            } else{
                onMouseUp();
            }
        });
        $(this.selected).on("dragstart", (e) => e.preventDefault());
        $(this.selected).on("mousemove touchmove", function(e){
            e.preventDefault();
            if(!start && !mouse_up && mouse_down && timep === false){
                timeout=0;
                cubo.current_mouse = e;
                cubo.movimiento(this, e);
                //var hover = cubo.posiciones(this);
                //if(hover){self.trigger.onHover(hover);}
            }
            if(timep != false && mouse_up){
                window.clearTimeout(timep);
                timep = false;
            }
        });
    }
}

class Habilidades{
    ubuntu = "#ubuntu";
    constructor(terminal, window, extras, texto){
        //terminal
        this.$terminal = terminal;
        //window
        this.$window = window;
        //extras
        this.$extras = extras;
        //donde aparece el texto
        this.$texto = texto;
    }
    show_terminal(){
        var that = this;
        $(this.$window).css("width", `${parseInt($(this.$terminal).css("width"))}px`);
        $(this.$window).removeClass("invisible");
        window.setTimeout(function(){
            $(that.$window).css("visibility", "visible");
        }, 50);
        window.setTimeout(function(){
            $(`${that.$window} div`).css(`width`, `15px`);
            $(`${that.$window} div`).css(`height`, `15px`);
        }, 100);
        for(let i = 1; i <= 3; i++){
            //notar que aquí uso el id de window
            var distance = 35;
            if($.device){
                setTimeout(function(){
                var currentY = parseInt($(`${that.$window} div:nth-child(${i})`).css("transform").split(",")[5]);
                var currentX = parseInt($(`${that.$window} div:nth-child(${i})`).css("transform").split(",")[4]);
                $(`${that.$window} div:nth-child(${i})`).fadeOut();
                $(`${that.$window} div:nth-child(${i})`).css("visibility", "visible");
                $(`${that.$window} div:nth-child(${i})`).css("opacity", "1 !important");
                $(`${that.$window} div:nth-child(${i})`).css("transform", `translateY(${currentY-distance}px) translateX(${currentX}px)`);
                $(`${that.$window} div:nth-child(${i})`).fadeIn(300);
                $(`${that.$window} div:nth-child(${i})`).css("transform", `translateY(${currentY}px) translateX(${currentX}px)`);
                },300*i);
            }else{
                ScrollReveal().reveal(`${that.$window} div:nth-child(${i})`,{
                    duration: 1000,
                    origin: `bottom`,
                    distance: `${distance}px`,
                    delay: 300*i
                });
            }
        }
        window.setTimeout(function(){
            $(that.$terminal).css("visibility", "visible");
            $(that.$terminal).css("height", "400px");
        }, 600);
        $(".ter-text").fadeOut(1); $(".ter-text").fadeIn(1000);
        $(".ter-text").css("visibility", "visible");
        window.setTimeout(function(){
            $(that.$texto).removeClass("invisible");
            ScrollReveal().destroy();
        }, 1000);
    }
    hide_terminal(){
        var that = this;
        $(".ter-text").fadeOut(500);
        $(that.$terminal).css("height", "0px");
        window.setTimeout(function(){
            $(that.$terminal).css("visibility", "hidden"); 
        }, 400);
        window.setTimeout(function(){
            $(`${that.$window} span`).addClass("invisible");
        }, 100)
        window.setTimeout(function(){
            $(that.$window).css("width", `0px`);
            window.setTimeout(function(){
                for(let i = 3; i>=1;i--){
                    window.setTimeout(function(){
                        ScrollReveal().clean(`${that.$window} div:nth-child(${i}`);
                        $(`${that.$window} div:nth-child(${i}`).css("visibility", "hidden");
                    }, 150/i); // 50
                }
                window.setTimeout(function(){
                    $(that.$window).css("visibility", "hidden");
                    $(that.$window).addClass("invisible");
                }, 200)
            }, 400); //550
        }, 600);
    }
    show_extras(){

    }
    hide_extras(){

    }
    mucho_texto(caso){
        var self = this; if(self.typed){self.typed.destroy();}
        switch (caso){
            //php
            case 1:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("PHP");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' PHP es el <strong>lenguaje de programación que se usa del lado del back-end</strong>. Con él se establece toda la lógica en el servidor, principalmente se usa para especificar cuando y cuales consultas SQL se deben realizar y dependiendo del resultado las comunica al front-end';
            } break;
            //boostrap
            case 2:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("Boostrap");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' Boostrap <strong>es una framework</strong> basada en HTML, CSS y extenciones de JS que dispone de plantillas de tipografías, botones, formularios y en general, de diseños ya hechos de elementos comunes en cualquier página web. También dispone de clases con reglas ya definidas, con las cuales se puede personalizar cada plantilla según la necesidad';
            } break;
            //html
            case 3:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("HTML");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' HTML es el <strong>lenguaje de marcado de hipertexto</strong> con él que se escriben todas las páginas web. Con él se establece la estructura más básica y fundamental de toda página web en cuanto a su contenido se trata: imágenes, texto, contenedores, secciones, etc.';
            } break;
            //css
            case 4:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("CSS");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' CSS (hoja de estilo en cascada) es el <strong>lenguaje de diseño gráfico</strong> que se usa en toda página web. La función de este lenguaje es estilizar (color, forma, sombra, etc), acomodar (posición, pivote, margen, etc) o animar el contenido de la página web';
            } break;
            //js
            case 5:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("Java Script");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' Java Script es el <strong>lenguaje de programación que se usa del lado del front-end</strong> (en el navegador del usuario). Este lenguaje es capaz de actualizar el contenido del HTML o CSS de forma dinámica, respondiendo así a las interacciones del usuario. También hace que el cubo de la izquierda se mueva y muestre este texto';
            } break;
            //SQL
            case 6:{
                window.setTimeout(function(){
                    $(`${self.$window} span`).text("SQL");
                    $(`${self.$window} span`).removeClass("invisible");
                }, 500);
                var theText = ' SQL (lenguaje de consulta estructurada) es un <strong>lenguaje de dominio específico</strong> que se usa en el desarrollo web del lado del back-end para almacenar, consultar, manipular y gestionar datos almacenados en los servidores del dominio. Su función principal es actualizar, crear o consultar información del lado del servidor';
            } break;
        }
        this.typed = new Typed('#mucho-texto', {
            strings: [theText, ''],
            typeSpeed: 20,
            backSpeed: 7,
            cursorChar: '_<',
            backDelay: 9000,
            startDelay: 1500,
            contentType: 'html',
            onComplete: function(self) {
                window.setTimeout(function(){
                    self.destroy();
                }, 2000*2);
            }
        }); return;
    }
}
