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
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (searchPlaces) {
      for (const place of searchPlaces) {
        $('section.places').append(`<article>
            <div class='title_box'>
              <h2>${place.name}</h2>
              <div class='price_by_night'>$${place.price_by_night}</div>
            </div>
            <div class='information'>
              <div class='max_guest'>${place.max_guest} Guest${
          place.max_guest !== 1 ? 's' : ''
        }</div>
                  <div class='number_rooms'>${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? 's' : ''
        }</div>
                  <div class='number_bathrooms'>${
                    place.number_bathrooms
                  } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
                <div class='description'>
              ${place.description}
                </div>
          </article>`);
      }
    }
  });
  $('#search').click(function () {
    $('article').remove();
    const jsonRequest = { amenities: Object.keys(dictChecked) };
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify(jsonRequest),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (searchPlaces) {
        for (const place of searchPlaces) {
          $('section.places').append(`<article>
              <div class='title_box'>
                <h2>${place.name}</h2>
                <div class='price_by_night'>$${place.price_by_night}</div>
              </div>
              <div class='information'>
                <div class='max_guest'>${place.max_guest} Guest${
            place.max_guest !== 1 ? 's' : ''
          }</div>
                    <div class='number_rooms'>${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? 's' : ''
          }</div>
                    <div class='number_bathrooms'>${
                      place.number_bathrooms
                    } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
                  <div class='description'>
                ${place.description}
                  </div>
            </article>`);
        }
      }
    });
  });
});
