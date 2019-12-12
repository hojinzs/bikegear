class SpeedChart{

    constructor(_prop = {
        id : String,
        canvas : Object,
        width : Number,
        height : Number,
    }){
        if(_prop.id) this.canvas = document.getElementById(_prop.id);
        if(this.canvas == null || undefined) this.canvas = _prop.canvas;
        if(this.canvas == null) return Error('canvas is undefined!!')
    
    
        if(_prop.width == undefined) _prop.width = this.canvas.offsetWidth;
        if(_prop.height == undefined) _prop.height = this.canvas.offsetHeight;
    
        this.Width = _prop.width; // 캔버스 너비
        this.Height = _prop.height; // 캔버스 높이

        this.SettingNameWidth = 100; // 세팅 이름이 들어갈 영역 크기
    }
    

    // 캔버스 너비 설정
    set Width(_width){
        this.canvas.width = _width;
    }


    // 캔버스 높이 설정
    set Height(_height){
        this.canvas.height = _height;
        
        this.barHeight = this.canvas.height / 2
        this.topMargin = this.canvas.height / 4
    }

    // 데이터 세팅 및 검증
    setData(_data){

    }

    // 데이터의 크랭크 수를 비교해 Y 축 그리드를 구함
    setAxisY(){
        
    }

    // 최소 속도, 최대 속도를 받아 X 축 그리드 기준을 구함
    setAxisX(_min,_max){

        // 최대 / 최소 축 크기 세팅이 없을 경우 기본값 세팅. 최대 속도는 140을 넘어갈 수 없음
        if(_min < 1) _min = 0;
        if(_max > 150) _max = 140;
    
        // 5km씩 여유를 두도록 세팅
        this.MinSpeed = Math.ceil(_min)-5;
        this.MaxSpeed = Math.round(_max)+5;

        // 캔버스의 차트 영역에서 1km/h 당 픽셀 크기를 계산
        this.CanvasPixcel = (this.canvas.width - this.SettingNameWidth) / ( this.MaxSpeed - this.MinSpeed );
    
        console.log(this.MinSpeed,this.MaxSpeed,this.CanvasPixcel);

        // 계산된 축 크기로 그리드를 그림
        this.setRuller();
    }

    // KM 그리드 그리기
    setRuller(){
        let ScaleSize;

        // 기존 그리드 초기화
        let ruller = this.canvas.getContext('2d');    
        ruller.clearRect(0,0,this.canvas.width,this.canvas.height);

        // 최소 스피드 1부터 반복하며 그리드를 그림
        for (let i = this.MinSpeed; i < this.MaxSpeed; i++) {
            let pointer = i - this.MinSpeed;
    
            // 10단위로 검은색 강조
            let rullerColor = '#e6e6e6';
            if(i%10 == 0) rullerColor = '#666666';

            // X 좌표 확정
            let x = this.SettingNameWidth + this.CanvasPixcel * pointer;

            // 그리드 그리기
            ruller.beginPath();
            ruller.moveTo(x,0);
            ruller.lineTo(x,this.canvas.height);
            ruller.lineWidth = 1;
            ruller.strokeStyle = rullerColor;
            ruller.stroke();
        
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