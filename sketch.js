const PIXEL_TO_COORDINATE = 10;
const ANGLE = 90;
const SLIDER_TO_ANGLE = 10;
let angleSlider;

let point1, point2;
let segment1;
let ray1;


function setup() {
	createCanvas(window.innerWidth-100, window.innerHeight-100);
	background(230);
	angleSlider = document.getElementById('angle');
	console.log(angleSlider);
	point1 = new Point(0,0,'A');
	ray1 = new Ray(10, angleSlider.value, point1, 'B');

}

function draw() {
	push();
	background(230);
	scale(1,-1);
	translate(10,-height+30);

	point1.draw();
	ray1.update(angleSlider.value);
	ray1.draw();
	pop();
}

class Ray {
	
	constructor (length, angle, originPt, name) {
		this.angle = angle;
		this.length = length;
		this.point = new Point(length*Math.cos(angle),length*Math.sin(angle), 'hello1', name);
		this.segment = new Segment(originPt, this.point);
	}

	update(angle) {
		this.point.x = this.length*Math.cos(angle/SLIDER_TO_ANGLE);
		this.point.y = this.length*Math.sin(angle/SLIDER_TO_ANGLE);
	}

	draw() {
		push();
		this.point.draw();
		this.segment.draw();
		pop();
	}
}

class Point {

	constructor(x, y, s) {
		this.x = x;
		this.y = y;
		this.s = s;
	}

	draw() {
		push();
		fill(51);
		ellipse(pixel(this.x), pixel(this.y), 10);
		fill(0, 102, 153);
		if (this.s) {
			scale(1,-1);
			text(this.s, pixel(this.x), -pixel(this.y)-10);
		}
		pop();
	}
}

class Segment {

	constructor(point1, point2) {
		this.point1 = point1;
		this.point2 = point2;
		console.log(this.point1);
		console.log(this.point2);
	}
	getLength () {
		return math.distance([this.point1.x,this.point1.y],[this.point2.x,this.point2.y])
	}

	draw () {
		push();
	
		line(pixel(this.point1.x), pixel(this.point1.y), pixel(this.point2.x), pixel(this.point2.y));

		
		fill(0, 102, 153);
		scale(1,-1);
		let x = this.point1.x+this.point2.x/2;
		let y = this.point1.y+this.point2.y/2;
		text(this.getLength().toFixed(4), pixel(x)-20, -pixel(y)-20);
		pop();
	}

}

function pixel(pt) {
	return pt * PIXEL_TO_COORDINATE;
}