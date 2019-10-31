export default class SpeedChart{

    constructor(_prop = {
        id : String,
        canvas : Object,
        width : Number,
        height : Number,
    }){
        if(_prop.id) this.canvas = document.getElementById(_prop.id);
        if(this.canvas == null || undefined) this.canvas = _prop.canvas;

        if(this.canvas == null) return Error('canvas is undefined!!')

        // if(_prop.id && _prop.canvas == undefined)
        // this.canvas = document.getElementById(_prop.id);

        if(_prop.width == undefined) _prop.width = this.canvas.offsetWidth;
        if(_prop.height == undefined) _prop.height = this.canvas.offsetHeight;

        this.Width = _prop.width;
        this.Height = _prop.height;
    }

    set Width(_width){
        this.canvas.width = _width;
    }

    set Height(_height){
        this.canvas.height = _height;
        
        this.barHeight = this.canvas.height / 2
        this.topMargin = this.canvas.height / 4
    }

    setAxisX(_min,_max){
        if(_min < 1) _min = 0;
        if(_max > 150) _max = 150;

        this.MinSpeed = _min-5;
        this.MaxSpeed = _max+10;
        this.CanvasPixcel = this.canvas.width / ( this.MaxSpeed - this.MinSpeed );

        console.log(this.MinSpeed,this.MaxSpeed,this.CanvasPixcel);

        this.setRuller();
    }

    setRuller(){
        let ScaleSize;
        let ruller = this.canvas.getContext('2d');

        ruller.clearRect(0,0,this.canvas.width,this.canvas.height);

        ruller.beginPath();
        for (let i = this.MinSpeed; i < this.MaxSpeed; i++) {
            let pointer = i - this.MinSpeed;

            if(i%10 == 0){
                ScaleSize = this.topMargin / 3
                ruller.fillStyle = 'black';
            } else {
                ScaleSize = this.topMargin / 4
                ruller.fillStyle = 'grey';
            }

            ruller.fillRect(this.CanvasPixcel * pointer,0,1,ScaleSize);
            ruller.fillRect(this.CanvasPixcel * pointer,this.canvas.height - ScaleSize,1,ScaleSize);
        
        }

        return ruller;
    }

    drawBar(_min,_max,_color,_text){

        console.log(_min,_max);

        //calcutating
        let start = this.CanvasPixcel * _min
        let end = this.CanvasPixcel * _max
        let width = end - start;

        //draw Bar
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(start, this.topMargin, width, this.barHeight);
        ctx.fillStyle = _color;
        ctx.fill();
        ctx.closePath();

        //draw Text
        ctx.font = '12px serif';
        ctx.fillStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(_text,start + (width/2), this.barHeight);

        return ctx;
    }

}