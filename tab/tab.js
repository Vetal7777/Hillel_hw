class Tab {
    static CLASSES = {
        titleContainer: 'title-container',
        //Title container
        bodyContainer: 'body-container',
        //Body container
        titleItem: 'item-title',
        //title
        bodyItem: 'item-body',
        //body
        active: 'active',
        //Body active
    };
    //Обьект нужных нам классов
    constructor(tabContainer) {
        this.tabContainer = tabContainer;
        //tab - container
        const [titleContainer,bodyContainer] = this.tabContainer.children;
        this.titleChildren = [...titleContainer.children];
        this.bodyChildren = [...bodyContainer.children];
        console.log(this.titleChildren);
        this.setChildrenClass();
        this.tabContainer.addEventListener('click',this.onTitleClick);
    }
    setChildrenClass(){
        const [titleContainer,bodyContainer] = this.tabContainer.children;
        titleContainer.classList.toggle(Tab.CLASSES.titleContainer);
        bodyContainer.classList.toggle(Tab.CLASSES.bodyContainer);
        this.titleChildren.forEach((elem)=>{
            elem.classList.toggle(Tab.CLASSES.titleItem);
        });
        this.bodyChildren.forEach((elem)=>{
            elem.classList.toggle(Tab.CLASSES.bodyItem);
        });
        this.bodyChildren[0].classList.toggle(Tab.CLASSES.active);
    }
    //Функция
    // - Добавляет классы аккорду
    // - Стилизует класс
    onTitleClick = (event) => {
        const target = event.target;
        //Target - константа на которую мы кликнули
        this.titleChildren.forEach((elem,index)=>{
            if(target === elem){
                this.bodyChildren.forEach((elem)=>{
                    elem.classList.remove(Tab.CLASSES.active);
                });
                this.bodyChildren[index].classList.add(Tab.CLASSES.active)
            }
        });
    }
}