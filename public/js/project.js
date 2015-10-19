var ref = new Firebase(FIREBASE_URL);
var fb_games = ref.child('games');
var template = Handlebars.compile($('#game-template').html());

$.fn.random = function() {
  return this.eq(Math.floor(Math.random() * this.length));
};

fb_games.on('child_added', function (snapshot) {
    var data = snapshot.val();
    data.id = snapshot.key();
    $('#games').append($(template(data)));
});

fb_games.on('child_removed', function (snapshot) {
    var data = snapshot.val();
});

function handle_gbomb_json(json) {
  console.log(json.results, json.results[0].name);
  $('#id_gbomb').typeahead(json.results);
}

$(function () {
    $(document).on('click', '.done', function(e) {
        e.preventDefault();
        fb_games.child($(this).parents('tr').attr('id')).update({
            done: true,
        });
    });
    $('#id_gbomb').change(function (e) {
      // var items = new Bloodhound({
      //   datumTokenizer: Bloodhound.tokenizers.whitespace,
      //   queryTokenizer: Bloodhound.tokenizers.whitespace,
      //   remote: {
      //     url: 'http://www.giantbomb.com/api/search/',
      //     ajax: {
      //       data: {
      //         api_key: GIANTBOMB_KEY,
      //         resources: 'game',
      //         query: $(this).val(),
      //       },
      //       jsonp: 'json_callback',
      //       dataType: 'jsonp',
      //     },
      // }});
      // items.initialize();
      console.log('changed')

      // $.ajax({
      //   url: 'http://www.giantbomb.com/api/search/',
      //   type: 'get',
      //   dataType: 'jsonp',
      //   data: {
      //     api_key: GIANTBOMB_KEY,
      //     resources: 'game',
      //     query: $(this).val(),
      //     format: 'jsonp',
      //     json_callback: 'handle_gbomb_json',
      //   }
      // });
    });
    $('#pick-game').on('click', function(e) {
        e.preventDefault();
        $game = $('.game').not('.mark').random();
        $('.mark').removeClass('mark');
        $game.addClass('mark');
    });
    $('#submit').on('click', function(e) {
        e.preventDefault();
        data = {'name': $('#id_name').val()}
        fb_games.push(data)
    });
});
