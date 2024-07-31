(function ($) {
	    var $container = $('.portfolio'),
	        colWidth = function () {
	            var w = $container.width(), 
	                columnNum = 1,
	                columnWidth = 50;
	            if (w > 1200) {
	                columnNum  = 5;

            } 
            else if (w > 900) {
	                columnNum  = 3;

            } 
            else if (w > 600) {
	                columnNum  = 2;

            } 
            else if (w > 300) {
	                columnNum  = 1;

            }
            columnWidth = Math.floor(w/columnNum);
            $container.find('.pitem').each(function() {
	                var $item = $(this),
	                    multiplier_w = $item.attr('class').match(/item-w(\d)/),
	                    multiplier_h = $item.attr('class').match(/item-h(\d)/),
	                    width = multiplier_w ? columnWidth*multiplier_w[1]-0 : columnWidth-5,
	                    height = multiplier_h ? columnWidth*multiplier_h[1]*1-5 : columnWidth*0.5-5;
	                $item.css({
	                    width: width,
	                    height: height

                });
            });
            return columnWidth;
        }
        function refreshWaypoints() {
	            setTimeout(function() {

            }, 3000);   
        }
        $('nav.portfolio-filter ul a').on('click', function() {
	            var selector = $(this).attr('data-filter');
	            $container.isotope({ filter: selector }, refreshWaypoints());
            $('nav.portfolio-filter ul a').removeClass('active');
            $(this).addClass('active');
            return false;
        });
        function setPortfolio() { 
	            setColumns();
	            $container.isotope('reLayout');

        }
		$container.imagesLoaded( function() {
				$container.isotope();

		});
        isotope = function () {
	            $container.isotope({
	                resizable: true,
	                itemSelector: '.pitem',
					layoutMode : 'masonry',
					gutter: 10,
	                masonry: {
	                    columnWidth: colWidth(),
	                    gutterWidth: 0

                }
            });
        };
    isotope();
    $(window).smartresize(isotope);
}(jQuery));

// script.js
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.clickable-image');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const close = document.querySelector('.close');
    const thumbnailsContainer = document.querySelector('.lightbox-thumbnails');

    const galleryImages = {
        gallery1: [
            'uploads/LuisPintoDecor1.PNG',
            'uploads/LuisPintoDecor2.PNG',
            'uploads/LuisPintoDecor3.PNG',
			'uploads/LuisPintoDecor4.PNG',
            'uploads/LuisPintoDecor5.PNG'

        ],
        gallery2: [
            'uploads/RatherApp1.PNG',
            'uploads/RatherApp2.PNG',
            'uploads/RatherApp3.PNG',
            'uploads/RatherApp4.PNG',

        ],
        gallery3: [
            'uploads/gallery_img-03.jpg',
            'uploads/websiteZ_img-02.jpg',
            'uploads/websiteZ_img-03.jpg'
        ]
    };

    function openLightbox(src, gallery) {
        lightboxImage.src = src;
        lightbox.style.display = 'block';
        document.body.classList.add('no-scroll'); // Adiciona a classe para desativar o rolar da página principal
        thumbnailsContainer.innerHTML = '';
        
        galleryImages[gallery].forEach(imgSrc => {
            const thumb = document.createElement('img');
            thumb.src = imgSrc;
            thumb.addEventListener('click', () => {
                lightboxImage.src = imgSrc;
            });
            thumbnailsContainer.appendChild(thumb);
        });
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Remove a classe para reabilitar o rolar da página principal
    }

    images.forEach(image => {
        image.addEventListener('click', () => {
            const gallery = image.getAttribute('data-gallery');
            openLightbox(image.src, gallery);
        });
    });

    close.addEventListener('click', closeLightbox);

    // Fechar o lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
});

