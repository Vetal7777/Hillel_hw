class Hamburger{
    #hamburgerContainer = [];
    static CLASSES = {
        icoContainer : 'hamburger-ico',
        //контейнер иконки
        icoLine : 'hamburger-ico__line',
        //иконка
        menuContainer : 'hamburger-menu',
        //контейнер меню
        menuLinks : 'hamburger-menu__link',
        //ссылки в меню
        menuActive : 'active',
        //раскрытое меню
        hoverLink : 'hover',
    };
    constructor(elem) {
        this.#hamburgerContainer = elem;
        //Контейнер всего меню
        const [hamburgerIco,hamburgerMenu] = this.#hamburgerContainer.children;
        //Массив из двух контейнеров
        // - иконка
        // - меню
        this.hamburgerMenu = hamburgerMenu;
        //Контейнер меню
        this.hamburgerIco = hamburgerIco;
        //Контейнер иконки
        this.setClasses();
        //добавляем классы всем элементам
        this.#hamburgerContainer.addEventListener('click',this.funcForClick)
        //при клике на бургер показываем меню
        this.hamburgerMenu.addEventListener('mouseover',this.toggleHoverClassForLink)
    };
    setClasses = () => {
        this.setClass(this.hamburgerIco,Hamburger.CLASSES.icoContainer,Hamburger.CLASSES.icoLine);
        //добавляем все классы контейнеру ico и его дочерним элементам
        this.setClass(this.hamburgerMenu,Hamburger.CLASSES.menuContainer,Hamburger.CLASSES.menuLinks);
        //добавляем все классы контейнеру menu и его дочерним элементам
    };
    setClass(container,containerClass,containerChildClass){
        container.classList.add(containerClass);
        //добавляем класс контейнеру
        [...container.children].forEach((elem) => {
            elem.classList.add(containerChildClass);
        });
        //добавляем класс всем дочкам элемента
    };
    toggleMenu = () =>{
        this.hamburgerMenu.classList.toggle(Hamburger.CLASSES.menuActive);
        //добавляет и убирает класс active
    }
    ifTrueClassName(event,className,func){
        if (event.target.closest('.'+className)){
            //Если user кликнул по контейнеру закрывающимся классом className
            func();
            //то запускается данная функция
        }
    }
    funcForClick = (event) =>{
        this.ifTrueClassName(event,Hamburger.CLASSES.menuLinks,this.toggleMenu);
        //Для клика по Hamburger link
        this.ifTrueClassName(event,Hamburger.CLASSES.icoContainer,this.toggleMenu);
        //Для клика по Hamburger ico
    }
    toggleHoverClassForLink = (event) => {
        [...this.hamburgerMenu.children].forEach((elem) => {
            elem.classList.remove(Hamburger.CLASSES.hoverLink);
        });
        event.target.classList.add(Hamburger.CLASSES.hoverLink);
    }
}