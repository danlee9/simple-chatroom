$(document).ready(function() {
	var socket = io();
  var input = $('input');
  var messages = $('#messages');
  var $num = $('#num');
  var $single = $('#single');
  var $multiple = $('#multiple');
  $multiple.hide();

  var addMessage = function(message) {
    messages.append('<div>' + message + '</div>');
  };

  var updateNum = function(num) {
    $num.text(num);
    if (num > 1) {
      $single.hide();
      $multiple.show();
    } else {
      $multiple.hide();
      $single.show();
    }
  };

  input.on('keydown', function(event) {
    if (event.keyCode != 13) {
      return;
    }

    var message = input.val();
    // addMessage(message);
    socket.emit('message', message);
    input.val('');
  });

  socket.on('message', addMessage);
  socket.on('connect', function(data) {
    socket.emit('join', 'User connected');
  });
  socket.on('leave', function(msg) {
    socket.emit('leave', msg);
  });
  socket.on('change', updateNum);
});