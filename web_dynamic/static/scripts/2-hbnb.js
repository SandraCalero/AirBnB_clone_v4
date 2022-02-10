$(document).ready(function () {
  const dictChecked = {};
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      const key = $(this).attr('data-id');
      const value = $(this).attr('data-name');
      dictChecked[key] = value;
    } else {
      const key = $(this).attr('data-id');
      delete dictChecked[key];
    }
    const values = Object.keys(dictChecked).map(function (key) {
      return dictChecked[key];
    });
    $('div.amenities h4').text(values.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
