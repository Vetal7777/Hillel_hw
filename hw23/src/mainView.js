import MainHeaderView from "./layout/header/header";
import MainContentView from "./layout/content/content";
import MainFooterView from "./layout/footer/footer";

export default class MainView{
    #LINKS = {
        'todos': null,
        'users': null,
        'chat': null,
    }
    #contentContainer = null;
    #mainContainer = null;
    #mainHeaderView = null;
    #mainContentView = null;
    #mainFooterView = null;
    constructor(mainContainer) {
        this.#mainContainer = mainContainer;
        this.init();
    }
    createComponent(){
        return `
            <div class="main__container">
                ${this.#mainHeaderView.createMainHeader()}
                ${this.#mainContentView.createMainContent()}
                ${this.#mainFooterView.createMainFooter()}
            </div>
        `;
    }
    init(){
        this.#mainHeaderView = new MainHeaderView(this.#mainContainer,this.#LINKS,
            {
                switchContent: this.switchContent,
            });
        this.#mainContentView = new MainContentView(this.#mainContainer,this.#LINKS);
        this.#mainFooterView = new MainFooterView(this.#mainContainer);
        this.renderComponent();
    }
    renderComponent = () => this.#mainContainer.innerHTML = this.createComponent();
    switchContent = (link) => {
        this.#mainContentView.switchContent(link);
    }
}