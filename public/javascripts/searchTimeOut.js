$('#loadingModal').on('show.bs.modal', function(){
  var myModal = $(this);
  clearTimeout(myModal.data('hideInterval'));
  myModal.data('hideInterval', setTimeout(function(){
      myModal.addClass('results--error');
  }, 25000));
});

$('.modal__error').on('click', function(){
  window.location.href = document.referrer;
});

