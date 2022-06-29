export default class PaintControlView{
    static CLASSES = {
        paintControl: 'paint__control',
        paintBrushWidth: 'paint__brush-width',
        paintRubbish: 'paint__rubbish',
        paintBrushColor: 'paint__brush-color',
        paintBrushColorItem: 'paint__brush-color-item',
        paintBrushWidthItem: 'paint__brush-width-item',
        paintBrushCycle: 'paint__brush-cycle',
        selected: 'selected',
    }
    #container = null;
    #drawSettings = {
        status: 'brush',
        color : 'black',
        lineWidth: 10,
    }
    #statuses = {
        brush: 'brush',
        rubbish: 'rubbish',
    }
    #options = null;
    constructor(options) {
        this.#options = options;
        this.#options.sendDrawSettings(this.#drawSettings);
    }
    changeLineColor(event){
        const target = event.target.closest(`.${PaintControlView.CLASSES.paintBrushColorItem}`);
        if (target){
            this.#drawSettings.color = target.id;
            this.#options.sendDrawSettings(this.#drawSettings);
            this.removeSelectedClasses(this.#container.querySelectorAll(`.${PaintControlView.CLASSES.paintBrushColorItem}`))
            target.classList.add(PaintControlView.CLASSES.selected);
        }
    }
    changeLineWidth(event){
        const target = event.target.closest(`.${PaintControlView.CLASSES.paintBrushWidthItem}`);
        if (target){
            this.#drawSettings.lineWidth = target.id;
            this.#options.sendDrawSettings(this.#drawSettings);
            this.removeSelectedClasses(this.#container.querySelectorAll(`.${PaintControlView.CLASSES.paintBrushWidthItem}`))
            target.classList.add(PaintControlView.CLASSES.selected);
        }
    }
    changeStatus(event){
        const target = event.target.closest(`.${PaintControlView.CLASSES.paintRubbish}`);
        if(target){
            target.id = Object.values(this.#statuses)
                .find(className => className !== target.id);
            target.innerText = target.id;
            this.#drawSettings.status = target.id;
            this.#options.sendDrawSettings(this.#drawSettings);
        }
    }
    createComponent(){
        return `
            <div class="${PaintControlView.CLASSES.paintControl}">
                <div class="${PaintControlView.CLASSES.paintBrushWidth}">
                    <span class="${PaintControlView.CLASSES.paintBrushWidthItem} big" id="20">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span>     
                    <span class="${PaintControlView.CLASSES.paintBrushWidthItem} middle" id="15">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span>     
                    <span class="${PaintControlView.CLASSES.paintBrushWidthItem} small ${PaintControlView.CLASSES.selected}" id="10">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span>     
                </div>
                <div class="${PaintControlView.CLASSES.paintRubbish}"></div>
                <div class="${PaintControlView.CLASSES.paintBrushColor}">
                    <span class="${PaintControlView.CLASSES.paintBrushColorItem} black ${PaintControlView.CLASSES.selected}" id="black">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span>
                    <span class="${PaintControlView.CLASSES.paintBrushColorItem} green" id="green">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span> 
                    <span class="${PaintControlView.CLASSES.paintBrushColorItem} blue" id="blue">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span> 
                    <span class="${PaintControlView.CLASSES.paintBrushColorItem} red" id="red">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span> 
                    <span class="${PaintControlView.CLASSES.paintBrushColorItem} yellow" id="yellow">
                        <span class="${PaintControlView.CLASSES.paintBrushCycle}"></span>
                    </span>      
                </div>
            </div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${PaintControlView.CLASSES.paintControl}`);
        this.setEventListeners();
        this.setRubbish();
    }
    setEventListeners(){
        this.#container.addEventListener('click',this.onClick)
    }
    setRubbish = () =>{
        const rubbish = this.#container.querySelector(`.${PaintControlView.CLASSES.paintRubbish}`);
        rubbish.id = this.#statuses.brush;
        rubbish.innerText = Object.values(this.#statuses)
            .find(className => className !== rubbish.id);
    }
    onClick = (event) =>{
        this.changeLineWidth(event);
        this.changeLineColor(event);
        this.changeStatus(event);
    }
    removeSelectedClasses(elements){
        elements
            .forEach(element => element.classList.remove(PaintControlView.CLASSES.selected));
    }
}