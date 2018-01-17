var Controller = (function () { // Конструктор пульта
    function Controller () {
        var dragZone = $('<div />').attr('class', 'dragZone');
        var controller = $('<div />').attr('class', 'controller');
        var inputText = $('<input />', {
            type: 'text',
            placeholder: 'Номер светофора',
            name: 'numberLighter',
        });
        var inputButOne = $('<button />', {
            text: 'создать светофор',
            name: 'create',
            click: function () { new TrafficLight();}
        });
        var inputButTwo = $('<button />', {
            text: 'включить светофор',
            name: 'on',
            click: function () { 
                TrafficLight.prototype.pults[$('.controller')[0].children[1].value - 1].timer = true;
                var thisTL = TrafficLight.prototype.pults[$('.controller')[0].children[1].value - 1];  //Для того чтобы сохранить зачение инпута и применять таймер и стоптаймер имеено к нему
                var time = setTimeout(function tick() {
                        if(thisTL.timer){
                            thisTL.turnOn()
                            time = setTimeout(tick, 2000);
                        } else {
                            console.log('stopped');
                        }
                       }, 2000);   
            }
        });
        var inputButThree = $('<button />', {
            text: 'выключить светофор',
            name: 'off',
            click: function () { 
                TrafficLight.prototype.pults[$('.controller')[0].children[1].value - 1].timer = false;
                clearInterval(TrafficLight.prototype.pults[$('.controller')[0].children[1].value - 1].turnOn)
                var thisLighter = ($('.trafficLight')[$('[name=numberLighter]')[0].value - 1]);
                thisLighter.children[0].classList.remove('redOn');
                thisLighter.children[1].classList.remove('yellowOn');
                thisLighter.children[2].classList.remove('greenOn');
            }
        });
        var inputButFour = $('<button />', {
            text: 'удалить светофор',
            name: 'remove',
            click: function () { 
                ($('.trafficLight')[$('[name=numberLighter]')[0].value - 1]).remove();;
            }
        });
        $('.wrapper').append(dragZone.append(controller.
            append('<p>Пульт "Березка"</p>', inputText, inputButOne, 
            inputButTwo, inputButThree, inputButFour)));
    
        
        $('.dragZone').on('mousedown', function () { //DRAG AND DROP SIDE START
          if(!($( event.target ).is('button')) && !($( event.target ).is('input'))) {
            $('.dragZone').mousemove(function( event ) {
                $('.dragZone').css('top', event.pageY - 75);
                $('.dragZone').css('left', event.pageX - 80);
           });
           $('.dragZone').on('mouseup', function () {
                $('.dragZone').unbind('mousemove');
              });
            }
        });  //DRAG AND DROP SIDE OVER
      

        setInterval(function() {    //Animation backround start
            if($('.controller').css('background-color') == "rgb(173, 255, 47)") {
                $('.controller').css('background-color', "darkgreen");
            } else {
                $('.controller').css('background-color', "greenyellow");
            }
           
        },1000);  //Animation backround end
    }
    return Controller;
})();


var TrafficLight = (function () { // Конуструктор светофора
    function TrafficLight () {
        pult = this;
        this.timer = false;
        TrafficLight.prototype.pults.push(pult);
        TrafficLight.prototype.counter++;
        this.lights = 0;
        this.number = TrafficLight.prototype.counter;
        this.turnOn = () => {
                var array = [[1,0,0],[0,1,0],[0,0,1]];
                var activeLight = array[this.lights];
                var red = activeLight[0];
                if(red == 1) {
                    $('.red.'+this.number).addClass('redOn');
                } else {
                    $('.red.'+this.number).removeClass('redOn');
                }
                var yellow = activeLight[1];
                if(yellow == 1) {
                    $('.yellow.'+this.number).addClass('yellowOn');
                } else {
                    $('.yellow.'+this.number).removeClass('yellowOn');
                }
                var green = activeLight[2];
                if(green == 1) {
                    $('.green.'+this.number).addClass('greenOn');
                } else {
                    $('.green.'+this.number).removeClass('greenOn');
                }
                
                if(this.lights < 2) {
                    this.lights++;
                } else {
                    this.lights = 0;
                }
            };

            this.turnOff = function () {
                
            };
        
        var trafficLight = $('<div />', {
        }).attr('class','trafficLight');
        var red = $('<div />').attr('class','red');
        red.text(TrafficLight.prototype.counter);
        red.addClass('' + TrafficLight.prototype.counter);
        var yellow = $('<div />').attr('class','yellow');
        yellow.addClass('' + TrafficLight.prototype.counter);
        var green = $('<div />').attr('class','green');
        green.addClass('' + TrafficLight.prototype.counter);
        trafficLight.append(red, yellow, green);
        $('.wrapper').append(trafficLight);  
    }
        TrafficLight.prototype = {
            constructor: TrafficLight,
            counter: 0,
            pults: []
        }
    return TrafficLight;
})();


var ball = document.getElementById('ball');

