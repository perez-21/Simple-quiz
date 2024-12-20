
var score = 0;
var questionCount = 0;

$(document).ready(function() {
  
  $('.form-check-input').on("change", function() {
    
    $('.form-check-input').prop('disabled', true);
    
    if (this.value === 'no'){
      $(this).parent().toggleClass('incorrect');
      score = localStorage.getItem('score');
      score = score? parseInt(score): 0;

      localStorage.setItem('score', score - 1);
      
    }

    $('.form-check-input[value="yes"]').parent().toggleClass('correct');
    
    questionCount = localStorage.getItem('questionCount') ;
    questionCount = questionCount? parseInt(questionCount): 0;
    localStorage.setItem('questionCount', questionCount + 1);
    

    
  });

  $('#finish-btn').on('click', function(){
    score = parseInt(localStorage.getItem('score'));
    score = score? parseInt(score): 0;
    questionCount = parseInt(localStorage.getItem('questionCount'));
    score = questionCount + score;

    const formContainer = $('#form-container');

    formContainer.empty();
    const scoreMessage = $('<h2></h2>')
    scoreMessage.text(`You scored ${score}/${questionCount}!`);
    // scoreMessage.addClass('byebye');

    const goBackBtn = $('<a></a>');
    goBackBtn.text('Back to home');
    goBackBtn.addClass('btn btn-dark')
    goBackBtn.attr('href', '/');
    formContainer.append(scoreMessage);
    formContainer.append(goBackBtn);

    localStorage.clear();

  });


});