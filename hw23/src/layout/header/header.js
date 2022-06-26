import './header.sass';
export default class MainHeaderView{
    static  CLASSES = {
        mainHeader: 'main__header',
        mainItemLink: 'main__item-link',
    }
    #LINKS = null;
    #options = null;
    #container = null;
    #selectedLink = 'chat';
    constructor(links,options) {
        this.#LINKS = links;
        this.#options = options;
    }
    createComponent(){
        return `
            <div class="${MainHeaderView.CLASSES.mainHeader}">
                ${this.createLinkItems()}
            </div>
        `;
    }
    createLinkItem(link){
        return `
            <div class="${MainHeaderView.CLASSES.mainItemLink}" id="${link}">${link.toUpperCase()}</div>
        `;
    }
    createLinkItems = () => {
        return this.#LINKS
            .map(this.createLinkItem)
            .join('');
    }
    init(){
        this.setContainer();
        this.#container.addEventListener('click',this.onClick);
    }
    onClick = (event) =>{
        const target = event.target.closest(`.${MainHeaderView.CLASSES.mainItemLink}`);
        if(target){
            this.#selectedLink = target.id;
            this.renderSelectedComponent();
        }
    }
    renderSelectedComponent(){
        this.#options.renderSelectedComponent(this.#selectedLink);
    }
    setContainer(){
        this.#container = document
            .querySelector(`.${MainHeaderView.CLASSES.mainHeader}`);
    }
}