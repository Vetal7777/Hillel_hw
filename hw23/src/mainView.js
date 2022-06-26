import MainHeaderView from "./layout/header/header";
import MainContentView from "./layout/content/content";
import MainFooterView from "./layout/footer/footer";

export default class MainView{
    static CLASSES = {
        mainContainer: 'main__container',
    }
    #LINKS = {
        'todos': null,
        'users': null,
        'chat': null,
    };
    #options = {
        renderSelectedComponent: this.renderSelectedComponent.bind(this),
    };
    #container = null;
    #contentView = null;
    #footerView = null;
    #headerView = null;
    #pageContainer = null;
    constructor(container) {
        this.#pageContainer = container;
        this.init();
    }
    createComponent(){
        return `
            <div class="${MainView.CLASSES.mainContainer}">
                ${this.createComponents([this.#headerView,this.#contentView,this.#footerView])}
            </div>
        `;
    }
    createComponents(views){
        return views.map(view => view.createComponent()).join('');
    }
    initInner(views){
        views.forEach(view => view.init());
    }
    init(){
        this.setViews();
        this.renderComponent();
        this.initInner([this.#headerView,this.#contentView,this.#footerView]);
        this.setContainer();
        this.#headerView.renderSelectedComponent();
    }
    renderComponent(){
        this.#pageContainer.innerHTML = this.createComponent();
    }
    renderSelectedComponent(selectedComponentName){
        this.#contentView.renderSelectedComponent(selectedComponentName);
    }
    setContainer(){
        this.#container = this.#pageContainer
            .querySelector(`.${MainView.CLASSES.mainContainer}`);
    }
    setViews(){
        this.#headerView = new MainHeaderView(Object.keys(this.#LINKS),this.#options);
        this.#contentView = new MainContentView(this.#LINKS);
        this.#footerView = new MainFooterView();
    }
}