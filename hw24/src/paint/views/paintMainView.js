import '../paint.sass';
import PaintTabletView from "./paintTabletView";
import PaintControlView from "./paintControlView";
export default class PaintMainView{
    static CLASSES = {
        paintContainer: 'paint__container',
    }
    #container = null;
    #controlView = null;
    #tabletView = null;
    constructor() {
        this.#tabletView = new PaintTabletView;
        this.#controlView = new PaintControlView({
            sendDrawSettings: this.sendDrawSettings.bind(this),
        });
    }
    createComponent(){
        return `
            <div class="${PaintMainView.CLASSES.paintContainer}">
                ${this.#controlView.createComponent()}
                ${this.#tabletView.createComponent()}
            </div>
        `;
    }
    init(){
        this.#container = document
            .querySelector(`.${PaintMainView.CLASSES.paintContainer}`);
        this.initInnerComponent([this.#controlView,this.#tabletView])
    }
    initInnerComponent(components){
        components
            .forEach(component => component.init());
    }
    sendDrawSettings(drawSettings){
        this.#tabletView.getDrawSettings(drawSettings);
    }
}