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
    
        // 캔버스 크기 세팅
        this.Width = _prop.width; // 캔버스 너비
        this.Height = _prop.height; // 캔버스 높이

        // 캔버스 내부 옵션
        this.LabelWidth = 100; // 세팅 이름이 들어갈 영역 크기
        this.SpeedLabelHeight = 20; // 속도 라벨이 들어갈 가로 하단 영역 크기

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
        console.log(_data);

        // 데이터를 검증한다
        try {
            
        } catch (error) {
            
        }

        // 검증 완료 후 스피드 차트 세팅
        this.SpeedChart = _data;

        // 최대 속도, 최소 속도 데이터가 있다면 세팅. 데이터와 무관하게 다시 세팅할 수 있다.
        this.setAxisX(this.SpeedChart.min_speed,this.SpeedChart.max_speed);
    }

    // 최소 속도, 최대 속도를 받아 X 축 그리드 기준을 구함
    setAxisX(_min,_max){

        // 최대 / 최소 축 크기 세팅이 없을 경우 기본값 세팅. 최대 속도는 140을 넘어갈 수 없음
        if(_min < 1) _min = 0;
        if(_max > 150) _max = 140;
    
        // 5km씩 여유를 두도록 세팅
        this.MinSpeed = Math.ceil(_min)-5;
        this.MaxSpeed = Math.round(_max)+5;
        console.log("Min Speed =>",this.MinSpeed,'\n','Max Speed =>',this.MaxSpeed);
    }

    // 캔버스의 차트 영역에서 주어진 km의 픽셀 위치를 계산
    getXbySpeed(_speed){

        // 최소, 최대축 세팅이 되어 있지 않다면 에러 처리
        if(this.MinSpeed == undefined || this.MaxSpeed == undefined) throw new Error("Set Minimun Speed and Maximun Speed first!");

        // 라벨이 들어갈 위치를 제외한 후, 1km당 픽셀 위치를 계산
        let SpeedPixcel = (this.canvas.width - this.LabelWidth) / ( this.MaxSpeed - this.MinSpeed );

        // X 좌표 확정 후 출력
        return SpeedPixcel * _speed;
    }

    // 크랭크 순서에 따라 차트에서의 Y값 위치를 가져옴
    getYbyCrankIndex(_index){

        // 0부터 시작하므로, +1
        let i = _index + 1;

        // 데이터가 세팅 되어 있지 않다면, 에러 처리
        if(this.SpeedChart == undefined) throw new Error("Set Speed Data first!!");

        // 크랭크 수를 가져온 후, Y축의 중간 위치를 반환함
        let length = this.SpeedChart.crank.length
        let Y = (this.canvas.height - this.SpeedLabelHeight) / length;
        let Y2 = Y / 2

        return (Y*i) - Y2;
    };

    /**
     * X 축 속도 그리드 그리기
     */
    drawRuller(){

        // 최소, 최대축 세팅이 되어 있지 않다면 에러 처리
        if(this.MinSpeed == undefined || this.MaxSpeed == undefined) throw new Error("Set Minimun Speed and Maximun Speed first!");

        // 최소 스피드부터 최대 스피드까지 반복하며 그리드를 그림
        let ruller = this.canvas.getContext('2d');
        let text = this.canvas.getContext('2d');
        for (let i = this.MinSpeed; i < this.MaxSpeed; i++) {
            // 픽셀 위치를 가져옴
            let x = this.getXbySpeed(i);
    
            // 10단위로 검은색 강조, 텍스트 쓰기
            let rullerColor = '#e6e6e6';
            if(i%10 == 0) {
                rullerColor = '#666666';
                text.font = (this.SpeedLabelHeight/1.4)+'px sanserif';
                text.strokeStyle = 'black';
                text.textAlign = 'center'
                text.strokeText(i + "km/h",x,this.canvas.height - (this.SpeedLabelHeight / 2) );
            } 

            // 그리드 그리기
            ruller.beginPath();
            ruller.moveTo(x,0);
            ruller.lineTo(x,this.canvas.height - this.SpeedLabelHeight);
            ruller.lineWidth = 1;
            ruller.strokeStyle = rullerColor;
            ruller.stroke();
        }
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

    /**
     * 최종 드로우
     */
    drawAll(){

        // 기존 드로우 초기화
        let clear = this.canvas.getContext('2d');
        clear.clearRect(0,0,this.canvas.width,this.canvas.height);

        // 드로우 시작
        this.drawRuller();

        // 테스트 Y 그리드 그리기
        let ruller = this.canvas.getContext('2d');
        this.SpeedChart.crank.forEach((element,index)=> {
            let y = this.getYbyCrankIndex(index);

            ruller.beginPath();
            ruller.moveTo(0,y);
            ruller.lineTo(this.canvas.width,y);
            ruller.lineWidth = 1;
            ruller.strokeStyle = "red";
            ruller.stroke();    
        });

    }
    
}