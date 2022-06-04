window.addEventListener("DOMContentLoaded", () => {

//Slider
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
});

document.querySelector('.prev').addEventListener("click", () =>  slider.goTo("prev"));
document.querySelector('.next').addEventListener("click", () => slider.goTo("next"));


//Tabs
const tabs = document.querySelectorAll(".catalog__tab"),
      catalogs = document.querySelectorAll(".catalog__content"),
      catalogFront = document.querySelectorAll(".catalog-item__content"),
      catalogBack = document.querySelectorAll(".catalog-item__list"),
      frontLink = document.querySelectorAll(".catalog-item__link"),
      backLink = document.querySelectorAll(".catalog-item__back");

function activeClass() {
    tabs.forEach((e, i) => {
        e.addEventListener("click", () => {
            tabs.forEach((e, i) => e.classList.remove("catalog__tab_active"));
            e.classList.add("catalog__tab_active");
            catalogs.forEach((e) => e.classList.remove("catalog__content_active"));
            catalogs[i].classList.add("catalog__content_active");
        });
    });
}
function changeSide () {
    frontLink.forEach((elem, i) => {
        elem.addEventListener("click", (e) => {
            e.preventDefault();
            catalogFront[i].classList.remove("catalog-item__content_active"); // Remove front content
            catalogBack.forEach((elem, i) => {
                if(elem.classList == "catalog-item__list catalog-item__list_active") {
                    elem.classList.remove("catalog-item__list_active");
                    catalogFront[i].classList.add("catalog-item__content_active");
                }
            }); //Remove back content on remain items when click
            catalogBack[i].classList.add("catalog-item__list_active");
        });
    });
    
    backLink.forEach((elem, i) => {
        elem.addEventListener("click", (e) => {
            e.preventDefault();
            catalogBack[i].classList.remove("catalog-item__list_active");
            catalogFront[i].classList.add("catalog-item__content_active");
        });
    });
}

activeClass();
changeSide();

}); //---> DOMContentLoaded
