import './header.sass';
export default class MainHeaderView{
    static  CLASSES = {
        mainHeader: 'main__header',
        mainItemLink: 'main__item-link',
    }
    #LINKS = null;
    #mainContainer = null;
    #headerContainer = null;
    #options = null;
    constructor(mainContainer,links,options) {
        this.#mainContainer = mainContainer;
        this.#LINKS = links;
        this.#options = options;
        setTimeout(() => this.init(), 0);
    }
    createItemLink(title){
        return `
            <div class="${MainHeaderView.CLASSES.mainItemLink}" id="${title}">${title}</div>
        `;
    }
    createMainHeader(){
        return `
            <div class="${MainHeaderView.CLASSES.mainHeader}">
                ${Object.keys(this.#LINKS).map(this.createItemLink).join('')}
            </div>
        `;
    }
    init(){
        this.#headerContainer = this.#mainContainer
            .querySelector(`.${MainHeaderView.CLASSES.mainHeader}`);
        this.#headerContainer.addEventListener('click',this.onClick);
    }
    onClick = (event) =>{
        const target = event.target.closest(`.${MainHeaderView.CLASSES.mainItemLink}`);
        if (target) this.#options.switchContent(target.id);
    }
}