import PaintMainView from "./paint/views/paintMainView";
import './index.sass';
export default class MainView{
    #container = null;
    #paintView = null;
    constructor(elem) {
        this.#container = elem;
        this.init();
    }
    createInnerComponent(){
        return `
            ${this.#paintView.createComponent()}
        `;
    }
    init(){
        this.#paintView = new PaintMainView;
        this.renderInnerComponent();
        this.initInnerComponent([this.#paintView])
    }
    initInnerComponent(components){
        components
            .forEach(component => component.init());
    }
    renderInnerComponent(){
        this.#container.innerHTML = this.createInnerComponent();
    }
}