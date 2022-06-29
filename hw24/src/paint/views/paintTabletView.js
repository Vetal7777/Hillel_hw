export default class PaintTabletView{
    static CLASSES = {
        paintTablet: 'paint__tablet',
        paintTabletContainer: 'paint__tablet-container',
    }
    #canvas = null;
    #container = null;
    #context = null;
    #drawSettings = null;
    #isHoldOn = false;
    constructor() {
    }
    createComponent(){
        return `
            <div class="${PaintTabletView.CLASSES.paintTabletContainer}">
                  <canvas class="${PaintTabletView.CLASSES.paintTablet}"></canvas>
            </div>
        `;
    }
    getDrawSettings(drawSettings){
        this.#drawSettings = drawSettings;
    }
    endDraw = (event) =>{
        this.#context.closePath();
        this.#isHoldOn = false;
    }
    init(){
        this.#container = document
            .querySelector(`.${PaintTabletView.CLASSES.paintTabletContainer}`);
        this.#canvas = this.#container
            .querySelector(`.${PaintTabletView.CLASSES.paintTablet}`)
        this.#canvas.width = window.innerWidth * 0.96;
        this.#canvas.height = window.innerHeight * 0.8;
        this.setContext();
        this.#canvas
            .addEventListener('mousedown',(event) => this.#drawSettings.status === 'brush' ? this.onDraw(event) : this.#drawSettings.status === 'rubbish' ? this.onRubbish(event) : null);
        this.#canvas
            .addEventListener('mousemove',(event) => this.#isHoldOn && this.#drawSettings.status === 'brush' ? this.onDraw(event) : this.#isHoldOn && this.#drawSettings.status === 'rubbish' ? this.onRubbish(event) : null)
        this.#canvas
            .addEventListener('mouseup',(event) => this.endDraw(event));
    }
    onDraw = (event) => {
        this.#context.globalCompositeOperation = 'source-over';
        if(!this.#isHoldOn) this.startDraw(event);
        this.#context.lineTo(event.offsetX,event.offsetY);
        this.#context.stroke();
    }
    setContext(){
        this.#context = this.#canvas.getContext('2d');
    }
    setLineStyle(){
        this.#context.strokeStyle = this.#drawSettings.color;
        this.#context.lineWidth = this.#drawSettings.lineWidth;
        this.#context.lineCap = 'round';
    }
    setLineStart(event){
        this.#context.moveTo(event.offsetX,event.offsetY)
    }
    startDraw(event){
        this.#isHoldOn = true;
        this.#context.beginPath();
        this.setLineStyle();
        this.setLineStart(event);
    }
    startRubbish(){
        this.#isHoldOn = true;
        this.#context.beginPath();
    }
    onRubbish(event){
        this.#context.globalCompositeOperation = 'destination-out';
        if(!this.#isHoldOn) this.startRubbish(event);
        this.#context.arc(event.offsetX, event.offsetY, this.#drawSettings.lineWidth, 0, Math.PI*2, false);
        this.#context.fill();
        this.#context.closePath();
    }
}