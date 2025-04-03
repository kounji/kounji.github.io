
/**
 * 상호금융 NH콕마이데이터 4.0 추진 개발 canvas 그리기 추가
 * drawlineChart 라인그리기
 * * 
 * import {drawlineChart}  from '@/utils/canvas' //Import 선언
 * 
 * canvas element에 ref 추가
 * <canvas id="staple_spend" ref="staple_spend"></canvas>
 * 
 * const spend = this.$refs.staple_spend; //CANVA ELEMENT REF로 가져오기
 * const lineChart = spend.getContext("2d"); //CANVAS context가자오김
 * let drawline = new drawlineChart(lineChart); //canvas 인스턴스생성
 * drawline.set(spend, 184, 92, 16, 0, 60) ; //cavas 위치지정
 * const linedata = [100, 0, 60]; //이번달 1위, 2위, 3위 항목순 비율
 * drawline.draw(linedata);  //그리기
 * 
 * SAMPLE LCTA4001
 */
/*데이타 라인 그리기*/
export class drawlineChart {
    constructor(chart) {
        this.chart = chart,
        this.canvas,
        this.dpr,
        this.width,
        this.height, 
        this.name, 
        this.last_x = null
    }

    set(canvas, width, height, x, y, x_gap){
        this.canvas =  canvas;
		this.dpr = 2;
		this.width = width;
		this.height = height - 28;
		this.x = x;
		this.gap = x_gap;
		this.y = y;
    }

    draw(data) {
        this.chart.beginPath();
		this.chart.lineWidth = 2;
		this.chart.setLineDash([3, 5]);
		this.chart.lineJoin = "bevel";
		this.chart.lineCap = "round";
		this.chart.strokeStyle = "#FFB301";

        if($(this.canvas).attr("id") == 'staple_spend'){
			this.chart.moveTo(this.x * this.dpr, (this.height + 2 - (this.height * data[data.length - 1]) / 100) * this.dpr);
			this.last_x = this.x; 

			for(var i=0; i < data.length-1; i++){
				this.chart.lineTo((this.last_x + this.gap) * this.dpr, (this.height + 2 - (this.height * data[i]) / 100)*this.dpr);
				this.last_x = this.last_x + this.gap;
			}
		}else{
			this.chart.moveTo(this.x, (this.height - (this.height * data[0]) / 100) * 0.75);
			this.last_x = this.x;
			for(var i=1; i < data.length; i++){
				this.chart.lineTo(this.last_x + this.gap, (this.height - (this.height * data[i]) / 100)* 0.75);
				this.last_x = this.last_x + this.gap;
			}
		}

		this.chart.stroke();

		if($(this.canvas).attr("id") == 'staple_spend'){
			this.chart.beginPath();
			this.chart.setLineDash([3, 0]);
			this.chart.lineWidth = 2;

			if($(".up", $(this.canvas).prev()).index() == (data.length - 1)){
				this.chart.strokeStyle = "#35CDA8";
			}else{
				this.chart.strokeStyle = "#BCC2CA";
			}

			this.chart.fillStyle = "#fff";
			this.chart.arc(this.x * this.dpr, (this.height + 2.5 - (this.height * data[data.length - 1]) / 100) * this.dpr, 4, 0, Math.PI*2);
			this.chart.stroke();
			this.chart.fill();
			this.chart.closePath();

			this.last_x = this.x + this.gap;

			for(var i=0; i < data.length-1; i++){
				this.chart.beginPath();
				this.chart.setLineDash([3, 0]);
				this.chart.lineWidth = 2;
				if($(".up", $(this.canvas).prev()).index() == i){
					this.chart.strokeStyle = "#35CDA8";
				}else{
					this.chart.strokeStyle = "#BCC2CA";
				}
				this.chart.fillStyle = "#fff";
				this.chart.arc(this.last_x * this.dpr , (this.height + 2.5 - (this.height * data[i]) / 100)* this.dpr, 4, 0, Math.PI*2);
				this.chart.stroke();
				this.chart.fill();
				this.chart.closePath();

				this.last_x = this.last_x + this.gap;
			}
		}
    }
}

/**
 * 상호금융 NH콕마이데이터 4.0 추진 개발 canvas 그리기 추가
 * drawdountChart 도넷그리기
 * import {drawdountChart}  from '@/utils/canvas' //Import 선언
 * 
 * let drawdount = new drawdountChart(canvas); //canvas 인스턴스생성
 * drawdount.set(184, 92, 16, 0, 60) ; //cavas 위치지정
 * const docutdata = [100, 0, 60]; //데이터
 * drawdount.draw(linedata);  //그리기
 * 
 */
/*데이타 라인 그리기*/
/*데이타 원 그리기*/
export class drawdountChart {
    constructor(canvas) {
        this.canvas = canvas,
        this.x ,
        this.y ,
        this.radius ,
        this.lineWidth ,
        this.strockStyle ,
        this.from ,
        this.to,
        this.circle,
        this.bgdraw,
        this.dir,
		this.lineCap = null;
    }

    set(x, y, radius, counterclockwise, from, to, lineWidth, strockStyle, circle, dir, lineCap){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.counterclockwise = counterclockwise;
		this.from=from;
		this.to= to;
		this.lineWidth = lineWidth;
		this.strockStyle = strockStyle; 
		this.circle = circle;   /*1 - HALF; 2 - fULL*/
		if(dir == null){
			this.dir = 1;
		}else{
			this.dir = dir;
		}
		if(lineCap == null){
			this.lineCap = "round";
		}else{
			this.lineCap = lineCap;
		}
    }

    /*bg 원 그리기*/
	bgdraw(){
		this.canvas.beginPath();
		this.canvas.lineWidth = this.lineWidth;
		this.canvas.strokeStyle = this.strockStyle;
		this.canvas.lineJoin = "miter";
		this.canvas.lineCap = this.lineCap;

		this.canvas.arc(this.x , this.y , this.radius , this.from , this.to, this.counterclockwise);
		this.canvas.stroke();
	}

    draw(data) {
        this.bgdraw();
		
		let parts = data.parts.pt;
		let df = Math.PI * this.dir;

		for(let i = 0; i<parts.length; i++)
		{
			this.canvas.beginPath();
			let colors = data.colors.cs[i];
			let gradient = null;

			gradient = this.canvas.createLinearGradient(this.x, this.y, df, df + (Math.PI * this.circle) * (parts[i] / 100));
			
			for(let j=0; j<colors.length; j++){
			   gradient.addColorStop(colors[j][0], colors[j][1]);
			   //console.log(colors[j][0], colors[j][1]);
			}
			
			this.canvas.strokeStyle = gradient;

			this.canvas.arc(this.x, this.y, this.radius, df, df + (Math.PI * this.circle) * (parts[i] / 100), this.counterclockwise);
			this.canvas.stroke();

			df += (Math.PI * this.circle) * (parts[i] / 100) ;
		}
    }
}