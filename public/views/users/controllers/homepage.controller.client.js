(function() {

    angular
        .module("WebAppHomePage")
        .controller("HomePageController",HomePageController);


    function HomePageController($location) {
        var vm = this;

        function init() {

            $(window).scroll(collapseNavbar);
            $(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
            $(function() {
                $('a.page-scroll').bind('click', function(event) {
                    var $anchor = $(this);
                    $('html, body').stop().animate({
                        scrollTop: $($anchor.attr('href')).offset().top
                    }, 1500, 'easeInOutExpo');
                    event.preventDefault();
                });
            });

// Closes the Responsive Menu on Menu Item Click
            $('.navbar-collapse ul li a').click(function() {
                $(".navbar-collapse").collapse('hide');
            });





        }
        init();

        function collapseNavbar() {
            if ($(".navbar").offset().top > 50) {
                $(".navbar-fixed-top").addClass("top-nav-collapse");
            } else {
                $(".navbar-fixed-top").removeClass("top-nav-collapse");
            }
        }

    }
})();