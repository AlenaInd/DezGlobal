$(document).ready(function(){
        $('.topmenu a').click(function(){
            /*задали какой мы хотим отступ от верха страницы*/
            var otstupTop=100;
            $('body,html').animate({
            /*получили положение элемента вычли отступ и прокрутили*/
               scrollTop: $($(this).attr('href')).offset().top-otstupTop
            }, 500);
        });

        
 
        $(window).scroll(function() {            
            if($(this).scrollTop() != 0) {            
            $('#toTop').fadeIn();       
            } else {    
            $('#toTop').fadeOut();
            }
            });
            $('#toTop').click(function() {
            $('body,html').animate({scrollTop:0},300);
        });

        //modal

        $('[data-modal=consultation]').on('click', function() {
            $('.overlay, #consultation').fadeIn('slow');
        });
        $('.modal__close').on('click', function() {
            $('.overlay, #consultation, #thanks').fadeOut('slow');
        });

        //validate


        function valideForms(form){
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
                    phone: "Пожалуйста, введите свой телефон",
                    email: {
                        required: "Пожалуйста, введите свою почту",
                        email: "Your email address must be in the format of name@domain.com"
                    }
                }
            });
        };

        valideForms('#consultation-form');
        valideForms('#consultation form');


        // $('#consultation-form1').validate({
        //     rules: {
        //         phone: "required",
        //         email: {
        //             required: true,
        //             email: true
        //         }
        //     },
        //     messages: {
        //         name: "Пожалуйста, введите свое имя",
        //         phone: "Пожалуйста, введите свой номер телефона",
        //         email: {
        //             required: "Пожалуйста, введите свой e-mail",
        //             email: "Неправильно введен e-mail"
        //         }
        //     }
        // });
        // $('#consultation-form').validate();
        

       //mask phone
        $('input[name=phone]').mask("+7 (999) 999-99-99");

         //mailer
        $('form').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('#consultation').fadeOut();
                $('.overlay, #thanks').fadeIn('slow');
    
                $('form').trigger('reset');
            });
            return false;
        });

    });