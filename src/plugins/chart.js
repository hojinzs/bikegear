export default class SpeedChart{

    constructor(_prop = {
        id : String,
        canvas : Object,
        width : Number,
        height : Number,
    }){
        if(_prop.id) this.canvas = document.getElementById(_prop.id);
        if(this.canvas == null || undefined) this.canvas = _prop.canvas;
        if(this.canvas == null) throw Error('canvas is undefined!!')
    
    
        if(_prop.width == undefined) _prop.width = this.canvas.offsetWidth;
        if(_prop.height == undefined) _prop.height = this.canvas.offsetHeight;
    
        // 캔버스 크기 & 비율 세팅
        this.Scale = window.devicePixelRatio || 1 // 기기 픽셀 비율 세팅
        this.Width = _prop.width; // 캔버스 너비
        this.Height = _prop.height; // 캔버스 높이

        // 캔버스 내부 옵션
        this.SpeedLabelHeight = 20 * this.Scale; // 속도 라벨이 들어갈 가로 하단 영역 크기
        this.rullerColor = '#e6e6e6'
        this.BarStyle = {
            color : '#00E679',
        }
        this.VertivalLabel = {
            width : 100,
        }

        // 기본 세팅
        this.setAxisX(0,140);
    }

    // 캔버스 너비 설정
    set Width(_width){
        this.canvas.style.width = _width;
        this.canvas.width = _width * this.Scale;
    }

    // 캔버스 높이 설정
    set Height(_height){
        this.canvas.style.height = _height;
        this.canvas.height = _height * this.Scale;
    }

    set LabelWidth(_val){
        this.VertivalLabel.width = _val;
    }
    get LabelWidth(){
        return this.VertivalLabel.width * this.Scale;
    }

    // 데이터 세팅 및 검증
    setData(_data){
        // 데이터를 검증한다
        try {
            if(!_data.hasOwnProperty('max_speed')) Error('Property max_speed invaild');
            if(!_data.hasOwnProperty('min_speed')) Error('Property min_speed invaild');
            if(!_data.hasOwnProperty('crank')) Error('Property crank invaild');
            
        } catch (error) {
            console.log("Invalid data => ", _data);
            throw new Error("Invalid data")
        }

        // 검증 완료 후 스피드 차트 세팅
        this.SpeedChart = _data;

        // 기본 속성 세팅. 추가로 재설정 가능
        this.setAxisX(this.SpeedChart.min_speed,this.SpeedChart.max_speed) // 최대, 최소 속도
        this.setSpeedBar(); // 속도바를 세팅한다.

    }

    /**
     * 최소 속도, 최대 속도를 받아 X 축 그리드 기준을 구함
     * @param {Number} _min 최소 속도
     * @param {Number} _max 최대 속도
     */
    setAxisX(_min,_max){

        // 최대 / 최소 축 크기 세팅이 없을 경우 기본값 세팅. 최대 속도는 140을 넘어갈 수 없음
        if(_min < 5) _min = 5;
        if(_max > 135) _max = 135;
    
        // 5km씩 여유를 두도록 세팅
        this.MinSpeed = Math.ceil(_min)-5;
        this.MaxSpeed = Math.round(_max)+5;
    }

    /**
     * 속도 영역대 바에 대한 옵션 설정
     * @param {Object} _prop {mode, height, color, font_size} 옵션 설정
     */
    setSpeedBar(_prop = {
        mode : 'full',
        height : null,
        color : null,
        label_show : true,
        font_size : null,
    }){
        let height = _prop.height || Math.ceil(this.CrankAreaHeight * 0.60);
        let color = _prop.color || '#00E679'
        let font_size = _prop.font_size || Math.ceil(height * 0.50);
        let label_show = _prop.label_show;
        let bar_style;

        switch (_prop.mode) {
            case 'full':
                bar_style = 'full';
                break;

            case 'single':
                bar_style = 'single';
                break;

            default:
                bar_style = 'full';
                break;
        }

        this.BarStyle = {
            height : height,
            color : color,
            font_size : font_size,
            mode : bar_style,
            label_show : label_show,
        }
    }

    /**
     * 캔버스의 차트 영역에서 주어진 km의 픽셀 위치를 계산
     * @param {Number} _speed 속도
     */
    getXbySpeed(_speed){

        // 최소, 최대축 세팅이 되어 있지 않다면 에러 처리
        if(this.MinSpeed == undefined || this.MaxSpeed == undefined) throw new Error("Set Minimun Speed and Maximun Speed first!");

        // 라벨이 들어갈 위치를 제외한 후, 1km당 픽셀 위치를 계산
        let SpeedPixcel = (this.canvas.width - this.LabelWidth) / (this.MaxSpeed - this.MinSpeed);

        // X 좌표 확정 후 출력
        return this.LabelWidth + (SpeedPixcel * (_speed - this.MinSpeed));
    }

    /**
     * 크랭크 스피드 영역의 높이값
     */
    get CrankAreaHeight(){
        // 크랭크 수를 가져온 후, Y축의 중간 위치를 반환함
        let length = this.SpeedChart.crank.length
        return (this.canvas.height - this.SpeedLabelHeight) / length;
    }

    /**
     * 크랭크 순서에 따라 차트에서의 Y값 위치를 가져옴
     * @param {Number} _index 크랭크 배열 인덱스
     */
    getYbyCrankIndex(_index){
        // 데이터가 세팅 되어 있지 않다면, 에러 처리
        if(this.SpeedChart == undefined) throw new Error("Set Speed Data first!!");

        // 0부터 시작하므로, +1
        let i = _index + 1;

        // 크랭크 수를 가져온 후, Y축의 중간 위치를 반환함
        return (this.CrankAreaHeight *i) - (this.CrankAreaHeight / 2);
    }

    /**
     * X 축 속도 그리드 그리기
     */
    drawRuller(){

        // 최소, 최대축 세팅이 되어 있지 않다면 에러 처리
        if(this.MinSpeed == undefined || this.MaxSpeed == undefined) throw new Error("Set Minimun Speed and Maximun Speed first!");

        // 최소 스피드부터 최대 스피드까지 반복하며 그리드를 그림
        for (let i = this.MinSpeed; i < this.MaxSpeed; i++) {
            
            let rullerColor = this.rullerColor; // 그리드 색상 재설정

            let x = this.getXbySpeed(i); // 픽셀 위치를 가져옴
    
            // 10단위로 검은색 강조, 텍스트 쓰기
            if(i%10 == 0) {
                let text = this.canvas.getContext('2d');
                text.font = (this.SpeedLabelHeight * 0.65)+'px sanserif';
                text.strokeStyle = 'black';
                text.textBaseline = 'middle';
                text.textAlign = 'center';
                text.fillText(i + "km/h",x,this.canvas.height - (this.SpeedLabelHeight / 2) );
                rullerColor = '#666666';
            } 

            // 그리드 그리기
            let ruller = this.canvas.getContext('2d');
            ruller.beginPath();
            ruller.moveTo(x,0);
            ruller.lineTo(x,this.canvas.height - this.SpeedLabelHeight);
            ruller.lineWidth = 1;
            ruller.strokeStyle = rullerColor;
            ruller.stroke();
        }

        return this;
    }

    /**
     * Y축 그리드 그리기
     */
    drawVerticalRuller(){
        
        let _length = this.SpeedChart.crank.length;

        for (let index = 0; index < _length+1; index++) {

            let rullerColor = this.rullerColor; // 그리드 색상 재설정

            let y = this.CrankAreaHeight * index
            //     let y = this.getYbyCrankIndex(index); // 중앙에 그리고 싶다면 해당 주석을 제거

            let ruller = this.canvas.getContext('2d');
            ruller.beginPath();
            ruller.moveTo(0,y);
            ruller.lineTo(this.canvas.width,y);
            ruller.lineWidth = 1;
            ruller.strokeStyle = rullerColor;
            ruller.stroke();
        }

        return this;
    }

    /**
     * Y축 라벨 그리기
     */
    drawVertivalLabel(){

        let _length = this.SpeedChart.crank.length;

        for (let index = 0; index < _length; index++) {

            let y = this.getYbyCrankIndex(index);
            let txt = "";
            if(this.SpeedChart.crank[index].chainring != 'null' || null){
                txt = this.SpeedChart.crank[index].chainring+"T"
            }

            let ctx = this.canvas.getContext('2d');
            ctx.font = this.BarStyle.font_size+'px serif';
            ctx.fillStyle = 'black';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(txt,(this.LabelWidth / 2),y);
        }

        return this;
    }

    /**
     * 차트 바를 그린다.
     * @param {Number} _index 크랭크 인덱스 번호
     * @param {Number} _min 최소 속도
     * @param {Number} _max 최대 속도
     * @param {String} _color 컬러 코드
     * @param {String} _text 바 중앙에 쓸 텍스트
     */
    drawBar(_prop = {
        crank_index : Number,
        min_speed : Number,
        max_speed : Number,
        text : String,
    }){
        
        // 필수 값 검사
        if(!_prop.hasOwnProperty('crank_index')) throw new Error("property crank_index was undefined!");
        if(!_prop.hasOwnProperty('min_speed')) throw new Error("property min_speed was undefined!");
        if(!_prop.hasOwnProperty('max_speed')) throw new Error("property max_speed was undefined!");

        // 좌표 계산
        let x_start;
        let x_end;
        let bar_width;

        switch (this.BarStyle.mode) {
            case 'full':
                x_start = this.getXbySpeed(_prop.min_speed);
                x_end = this.getXbySpeed(_prop.max_speed);
                bar_width = x_end - x_start;
                break;

            case 'single':
                x_start = this.getXbySpeed(_prop.max_speed) - 5 * this.Scale;
                x_end = this.getXbySpeed(_prop.max_speed);
                bar_width = x_end - x_start;
                break;

            default:
                x_start = this.getXbySpeed(_prop.min_speed);
                x_end = this.getXbySpeed(_prop.max_speed);
                bar_width = x_end - x_start;
                break;
        }

        let y_start = this.getYbyCrankIndex(_prop.crank_index) - ( this.BarStyle.height / 2 )
    
        // 속도 영역 막대를 그림
        let ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(x_start, y_start, bar_width, this.BarStyle.height);
        ctx.fillStyle = this.BarStyle.color;
        ctx.fill();
        ctx.closePath();
    
        // 텍스트가 있고, 라벨 표시 조건이라면 텍스트를 표시
        if(_prop.hasOwnProperty('text') && this.BarStyle.label_show){
            ctx.font = this.BarStyle.font_size+'px serif';
            ctx.fillStyle = 'black';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillText(_prop.text,x_start + (bar_width/2),this.getYbyCrankIndex(_prop.crank_index));    
        }
    
    }

    /**
     * 최종 드로우
     */
    drawAll(){

        // 기존 드로우 초기화
        let clear = this.canvas.getContext('2d');
        clear.clearRect(0,0,this.canvas.width,this.canvas.height);

        // 드로우 시작

        // X 축 그리드 그리기
        this.drawRuller();

        // Y 축 그리드 그리기
        this.drawVerticalRuller();

        // Y 축 라벨 그리기
        this.drawVertivalLabel();

        // 세팅된 데이터를 가져와 차트를 그린다
        this.SpeedChart.crank.forEach((crank,crank_index) => {

            crank.sprocket.forEach((sprocket) => {

                // 속도 데이터가 없을 경우 무시
                if(sprocket.min_speed == 0 && sprocket.max_speed == 0) return;

                this.drawBar({
                    crank_index : crank_index,
                    min_speed : sprocket.min_speed,
                    max_speed : sprocket.max_speed,
                    text : sprocket.cog+"T",
                });
            });
            
        });

    }
    
}