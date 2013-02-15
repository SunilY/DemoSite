;(function ($, window, undefined) {
  'use strict';

  $.fn.broadleafListgrid = function (options) {
    var $doc = $(document),
        config = $.extend({
          dropdownAsToggle:false,
          activeClass:'active'
        }, options),

    // close all dropdowns except for the dropdown passed
      closeDropdowns = function (dropdown) {
        // alert(dropdown.html());
        $('.listgrid-headerBtn.dropdown').find('ul').not(dropdown).removeClass('show-dropdown');
      },
    // reset all toggle states except for the button passed
      resetToggles = function (button) {
        // alert(button.html());
        var buttons = $('.listgrid-headerBtn.dropdown').not(button);
        buttons.add($('> span.' + config.activeClass, buttons)).removeClass(config.activeClass);
      };

    // Prevent event propagation on disabled buttons
    $doc.on('click.fndtn', '.button.disabled', function (e) {
      e.preventDefault();
    });
    

    $('.listgrid-headerBtn.dropdown > ul', this).addClass('no-hover');

    // Prevent event propagation on the dropdown form
    $('.listgrid-headerBtn.dropdown').find('form').click(function (e) {
        e.stopPropagation();
    });

    $('.listgrid-headerBtn.dropdown .add-filter').click(function (e) {
        e.preventDefault();
        var $el = $(this),
            $form = $el.closest('form'),
            criteria = $form.find('.listgrid-criteria');

        $('<input>').attr({
                type: 'text',
                name: 'criteria',
                placeholder: 'criteria'
        }).appendTo(criteria);

    });

    $('.listgrid-headerBtn.dropdown .clear-filter').click(function (e) {
        e.preventDefault();
        var $el = $(this),
            $form = $el.closest('form'),
            criteria = $form.find('.listgrid-criteria');

        $(criteria).empty();

        $('<input>').attr({
                type: 'text',
                name: 'criteria',
                placeholder: 'criteria'
        }).appendTo(criteria);
    });
		
    // reset other active states
    $doc.on('click.fndtn', '.listgrid-headerBtn.dropdown:not(.split), .listgrid-headerBtn.dropdown.split span', function (e) {
      var $el = $(this),
          button = $el.closest('.listgrid-headerBtn.dropdown'),
          dropdown = $('> ul', button);
          
        // If the click is registered on an actual link or on button element then do not preventDefault which stops the browser from following the link
        if ($.inArray(e.target.nodeName, ['A', 'BUTTON'])){
          e.preventDefault();
        }

      // close other dropdowns
      setTimeout(function () {
        closeDropdowns(config.dropdownAsToggle ? '' : dropdown);
        dropdown.toggleClass('show-dropdown');

        if (config.dropdownAsToggle) {
          resetToggles(button);
          $el.toggleClass(config.activeClass);
        }
      }, 0);
    });

    // close all dropdowns and deactivate all buttons
    $doc.on('click.fndtn', 'body, html', function (e) {
      if (undefined == e.originalEvent) { return; }
      // check original target instead of stopping event propagation to play nice with other events
      if (!$(e.originalEvent.target).is('.listgrid-headerBtn.dropdown:not(.split), .listgrid-headerBtn.dropdown.split span')) {
        closeDropdowns();
        if (config.dropdownAsToggle) {
          resetToggles();
        }
      }
    });

    // Positioning the Flyout List
    var normalButtonHeight  = $('.listgrid-headerBtn.dropdown:not(.large):not(.small):not(.tiny):visible', this).outerHeight() - 1,
        largeButtonHeight   = $('.listgrid-headerBtn.large.dropdown:visible', this).outerHeight() - 1,
        smallButtonHeight   = $('.listgrid-headerBtn.small.dropdown:visible', this).outerHeight() - 1,
        tinyButtonHeight    = $('.listgrid-headerBtn.tiny.dropdown:visible', this).outerHeight() - 1;

    $('.listgrid-headerBtn.dropdown:not(.large):not(.small):not(.tiny) > ul', this).css('top', normalButtonHeight);
    $('.listgrid-headerBtn.dropdown.large > ul', this).css('top', largeButtonHeight);
    $('.listgrid-headerBtn.dropdown.small > ul', this).css('top', smallButtonHeight);
    $('.listgrid-headerBtn.dropdown.tiny > ul', this).css('top', tinyButtonHeight);

    $('.listgrid-headerBtn.dropdown.up:not(.large):not(.small):not(.tiny) > ul', this).css('top', 'auto').css('bottom', normalButtonHeight - 2);
    $('.listgrid-headerBtn.dropdown.up.large > ul', this).css('top', 'auto').css('bottom', largeButtonHeight - 2);
    $('.listgrid-headerBtn.dropdown.up.small > ul', this).css('top', 'auto').css('bottom', smallButtonHeight - 2);
    $('.listgrid-headerBtn.dropdown.up.tiny > ul', this).css('top', 'auto').css('bottom', tinyButtonHeight - 2);

  };

})( jQuery, this );
