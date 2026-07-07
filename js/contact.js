$(document).ready(function(){
    (function($) {
        "use strict";

        // STUB: simulates emailjs.sendForm for testing
        // const emailjs = {
        //     sendForm: function(serviceId, templateId, form) {
        //         console.log('📧 [STUB] emailjs.sendForm called', { serviceId, templateId, form });
        //         return Promise.resolve();
        //         // return Promise.reject(new Error('stub error'));
        //     }
        // };

        jQuery.validator.addMethod('phoneintl', function(value, element) {
            return this.optional(element) || /^[+]?[0-9\s\-\(\)]{7,15}$/.test(value);
        }, "Please enter a valid phone number.");

        $('#contactForm').validate({
            rules: {
                name:    { required: true, minlength: 2 },
                subject: { required: true, minlength: 4 },
                number:  { required: true, phoneintl: true },
                email:   { required: true, email: true },
                message: { required: true, minlength: 20 },
                org:     { required: true, minlength: 1 }
            },
            messages: {
                name:    { required: "Please enter your name.",                     minlength: "Please enter a valid name." },
                subject: { required: "Please enter the subject of your message.",   minlength: "Please give more details about the subject." },
                number:  { required: "Please enter your phone number.",             phoneintl: "Please enter a valid phone number." },
                email:   { required: "Please enter your email address." },
                message: { required: "Please enter your message.",                  minlength: "Please add more details to the message." },
                org:     { required: "Please enter the name of your organization.", minlength: "Please enter a valid organization name." }
            },
            submitHandler: function(form) {
                // 1. Honeypot check — bots fill hidden fields, humans don't
                if ($('[name="honeypot"]').val()) {
                    console.warn('🍯 Honeypot triggered — submission blocked.');
                    return;
                }

                // 2. Cooldown check — 30s between submissions
                const lastSent = localStorage.getItem('formLastSent');
                if (lastSent && Date.now() - Number(lastSent) < 30000) {
                    alert('Please wait a moment before sending another message.');
                    return;
                }

                // 3. Disable button to prevent double submission
                const $btn = $('#submitBtn');
                $btn.prop('disabled', true);

                emailjs.sendForm('service_j0f0sb9', 'template_1usshfm', form) // gmail service
                // emailjs.sendForm('service_b1r6as9', 'template_1usshfm', form) // yahoo service
                    .then(function() {
                        localStorage.setItem('formLastSent', Date.now());

                        $('#contactForm').fadeOut(600, function() {
                            $('#formSuccess').css('display', 'flex');
                        });
                    }, function(error) {
                        console.error('EmailJS error:', error);
                        localStorage.setItem('formLastSent', Date.now()); // throttle retries after failure too
                        $('#formError').css('display', 'flex').fadeIn('slow');
                        setTimeout(function() { $btn.prop('disabled', false); }, 10000); // 10s cooldown before retry
                    });
            }
        });
    })(jQuery);
});