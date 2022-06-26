import './footer.sass';
export default class MainFooterView{
    static  CLASSES = {
        mainFooter: 'main__footer',
    }
    #container = null;
    constructor() {}
    createComponent(){
        return `
            <div class="${MainFooterView.CLASSES.mainFooter}">Footer</div>
        `;
    }
    init(){
        this.setContainer();
    }
    setContainer(){
        this.#container = document
            .querySelector(`.${MainFooterView.CLASSES.mainFooter}`);
    }
}