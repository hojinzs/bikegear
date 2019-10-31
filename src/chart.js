export default class SpeedChart{

    constructor(_prop = {
        id : String,
        width : Number,
        height : Number,
    }){
        this.canvas = document.getElementById(_prop.id);


        if(_prop.width == undefined) _prop.width = this.canvas.offsetWidth;
        if(_prop.height == undefined) _prop.height = 80;

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

    setAxisX(_max,_min){
        if(_min < 1) _min = 0;
        if(_max > 150) _max = 150;

        this.MinSpeed = _min;
        this.MaxSpeed = _max;
        this.CanvasPixcel = this.canvas.width / ( this.MaxSpeed - this.MinSpeed );

        this.setRuller();
    }


    setRuller(){
        let ScaleSize;
        let ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        for (let i = this.MinSpeed; i < this.MaxSpeed; i++) {
            let pointer = i - this.MinSpeed;

            if(i%10 == 0){
                ScaleSize = this.topMargin / 3
                ctx.fillStyle = 'black';
            } else {
                ScaleSize = this.topMargin / 4
                ctx.fillStyle = 'grey';
            }

            ctx.fillRect(this.CanvasPixcel * pointer,0,1,ScaleSize);
            ctx.fillRect(this.CanvasPixcel * pointer,this.canvas.height - ScaleSize,1,ScaleSize);
        }
    }

    drawBar(_min,_max,_color,_text){

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