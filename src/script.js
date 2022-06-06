window.addEventListener("DOMContentLoaded", () => {


    //Slider. This slider inserted via using "tiny-slider".

    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false,
    });

    document.querySelector('.prev').addEventListener("click", () => slider.goTo("prev"));
    document.querySelector('.next').addEventListener("click", () => slider.goTo("next"));


    //Tabs

    const tabs = document.querySelectorAll(".catalog__tab"),
        catalogs = document.querySelectorAll(".catalog__content"),
        catalogFront = document.querySelectorAll(".catalog-item__content"),
        catalogBack = document.querySelectorAll(".catalog-item__list"),
        frontLink = document.querySelectorAll(".catalog-item__link"),
        backLink = document.querySelectorAll(".catalog-item__back"),
        closeBtns = document.querySelectorAll(".modal__close");

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

    function changeSide() {
        frontLink.forEach((elem, i) => {
            elem.addEventListener("click", (e) => {
                e.preventDefault();
                catalogFront[i].classList.remove("catalog-item__content_active"); // Remove front content
                catalogBack.forEach((elem, i) => {
                    if (elem.classList == "catalog-item__list catalog-item__list_active") {
                        elem.classList.remove("catalog-item__list_active");
                        catalogFront[i].classList.add("catalog-item__content_active");
                    }
                }); //Remove back content on remain items on click
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

    //Modal form
    const btnConsultation = document.querySelectorAll("[data-modal='consultation']"),
        consultationModal = document.getElementById("consultation"),
        orderModal = document.getElementById("order"),
        overlay = document.querySelector(".overlay"),
        btnMini = document.querySelectorAll(".button_mini"),
        orderModalDescr = orderModal.querySelector(".modal__descr");

    //Open modal form on btn click
    function openModal(btn, form) {
        btn.forEach((elem) => {
            elem.addEventListener("click", () => {
                overlay.style.display = "block";
                form.style.display = "block";
            });
        });
    }
    openModal(btnConsultation, consultationModal);

    function closeModal(btn) {
        btn.forEach((elem) => {
            elem.addEventListener("click", () => {
                overlay.style.display = "none";
                consultationModal.style.display = "none";
                orderModal.style.display = "none";
            });
        });
    }
    closeModal(closeBtns);

    //Click on btn buy in section catalog, open modal with item name.
    function openModalCatalog(btn) {
        btn.forEach((elem) => {
            elem.addEventListener("click", (e) => {
                overlay.style.display = "block";
                orderModal.style.display = "block";
                if (e.path[2].classList == "catalog-item") {
                    const subtitle = e.path[2].querySelector(".catalog-item__subtitle").textContent;
                    orderModalDescr.textContent = subtitle;
                }
            });
        });
    }
    openModalCatalog(btnMini);


    //Form validation. Made with "jquery.validate.min"
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');


}); //---> DOMContentLoaded
