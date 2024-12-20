var questionCount = 0;


$(document).ready(function() {
  
  $('#add-question').on("click", function() {
    questionCount ++;
    const newQuestion = `
      <div class="container mb-3 bg-body-tertiary p-4">
      <div class="mb-4">
        <label for="question-${questionCount}" class="form-label fw-bold">Question</label>
        <input type="text" class="form-control" id="question-${questionCount}" name="question-${questionCount}" required>
      </div>

      <div class="mb-3">
        <label for="answer-${questionCount}" class="form-label fw-semibold">Answer</label>
        <input type="text" class="form-control" id="answer-${questionCount}" name="answer-${questionCount}" required>
      </div>

      <div class="mb-2">
        <label for="option1-${questionCount}" class="form-label fw-medium">Option</label>
        <input type="text" class="form-control" id="option1-${questionCount}" name="option1-${questionCount}" required>
      </div>

      <div class="mb-2">
        <label for="option2-${questionCount}" class="form-label fw-medium">Option</label>
        <input type="text" class="form-control" id="option2-${questionCount}" name="option2-${questionCount}" required>
      </div>

      <div class="mb-2">
        <label for="option3-${questionCount}" class="form-label fw-medium">Option</label>
        <input type="text" class="form-control" id="option3-${questionCount}" name="option3-${questionCount}" required>
      </div>

      
    </div>
    `;
    const question = $(newQuestion);
    $(this).parent().before(question);
    
  });



});