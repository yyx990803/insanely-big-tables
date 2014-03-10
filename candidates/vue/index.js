(function (global) {
    
    function Item () {
        this.key = Math.random();
        this.value = Math.random();
    }

    function add () {
        if (App.content.length % 100 === 0) {
            global.IBT.markHundred(App.content.length / 100);
        }
        if (App.amount === 0) {
            App.stop();
        }
        else {
            App.unshift();
            App.amount -= 1;
        }
    }

    var App = new Vue({
        el: 'body',
        data: {
            rate: null,
            amount: null,
            time: null,
            content: [new Item(), new Item()]
        },
        methods: {
            unshift: function () {
                this.content.unshift(new Item());
            },
            push: function () {
                this.content.push(new Item());
            },
            clear: function () {
                this.content = [];
            },
            remove: function () {
                
            },
            start: function () {
                if (!this.amount || !this.rate) {
                    console.log('amount and rate should be specified');
                    return;
                }

                // start mark
                global.IBT.startMeasuring();

                // add the first
                this.unshift();

                // set interval for further adds
                this.intervalId = setInterval(add, global.IBT.calculateInterval(this.rate));
            },
            stop: function () {
                global.IBT.stopMeasuring();
                clearInterval(this.intervalId);
                this.time = global.IBT.calculateMeasure();
                global.IBT.calculateHundreds().forEach(function (item) {
                    console.log(item);
                });
            }
        }
    });

})(window);