$(document).ready(function() {
    // Hide all modal content sections by default
    $('section[id^="info-"]').hide();
  
    // Event listener for modal open links
    $('.modal-open').on('click', function(e) {
      e.preventDefault();
      
      // Get the content ID from the data-content attribute
      var contentId = $(this).data('content');
      
      // Clone the content and append it to the body with a modal overlay
      var modalContent = $('#' + contentId).clone().show();
      
      // Create overlay and modal wrapper
      $('body').append('<div class="modal-overlay"></div>');
      $('body').append('<div class="modal-content"></div>');
      $('.modal-content').append('<span class="modal-close">&times;</span>');
      $('.modal-content').append(modalContent);
      
      // Show the modal and overlay
      $('.modal-overlay, .modal-content').fadeIn(300);
      
      // Close modal when overlay or close button is clicked
      $('.modal-overlay, .modal-close').on('click', function() {
        $('.modal-overlay, .modal-content').fadeOut(300, function() {
          $('.modal-overlay, .modal-content').remove();
        });
      });
    });
  });
  