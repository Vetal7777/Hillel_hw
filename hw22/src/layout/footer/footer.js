import './footer.sass';
export default class MainFooterView{
    static  CLASSES = {
        mainFooter: 'main__footer',
    }
    #mainContainer = null;
    #footerContainer = null;
    constructor(mainContainer) {
        this.#mainContainer = mainContainer;
        setTimeout(() => this.init(), 0);
    }
    createMainFooter(){
        return `
            <div class="${MainFooterView.CLASSES.mainFooter}">Footer</div>
        `;
    }
    init(){
        this.#footerContainer = this.#mainContainer
            .querySelector(`.${MainFooterView.CLASSES.mainFooter}`)
    }
}