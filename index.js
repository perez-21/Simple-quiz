// Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const port = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);


// Mock Data (in-memory storage for simplicity)
let quizzes = [
  {
    id: 1,
    title: 'Sample Quiz',
    questions: [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: 1 // Index of correct answer
      },
      {
        question: 'Which is a programming language?',
        options: ['HTML', 'CSS', 'JavaScript', 'Photoshop'],
        answer: 2
      }
    ]
  }
];

// Routes

// Home route
app.get('/', (req, res) => {
  res.render('index', { quizzes });
});

// View quiz
app.get('/quiz/:id/question/:number', (req, res) => {
  
  const quiz = quizzes.find(q => q.id == req.params.id);
  const questionNumber = parseInt(req.params.number);
  if (quiz && questionNumber) {
    
    if (quiz.questions.length > questionNumber){
      res.render('quiz', { title: quiz.title, id: quiz.id, question: quiz.questions[questionNumber - 1], next: questionNumber + 1 });

    }
    else if(quiz.questions.length === questionNumber){
      res.render('quiz', { title: quiz.title, id: quiz.id, question: quiz.questions[questionNumber - 1], next: -1 });
    }
  } else {
    res.status(404).send('Quiz not found');
  }
});



// Create quiz 
app.get('/create', (req, res) => {
  res.render('create');
});

app.post('/create', (req, res) => {
  const newQuiz = {
    id: quizzes.length + 1,
    title: '',
    questions: []
  }
  newQuiz.title = req.body.quizTitle;
  let questionCount = 1;
  while (true) {
    
    if (! req.body['question-'+ questionCount]){
      break;
      
    }

    let question = req.body['question-'+ questionCount];
    let answer = req.body['answer-'+ questionCount];
    let option1 = req.body['option1-'+ questionCount];
    let option2 = req.body['option2-'+ questionCount];
    let option3 = req.body['option3-'+ questionCount];

    let options = [answer, option1, option2, option3];
    // swap
    const randomIndex = Math.floor(Math.random() * options.length);
    let tmp = options[0];
    options[0] = options[randomIndex];
    options[randomIndex] = tmp; 

    const questionObj = {
      question: question,
      options: options,
      answer: options.indexOf(answer)
    };
    newQuiz.questions.push(questionObj);

    questionCount++;
  }

  quizzes.push(newQuiz);
  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});

/* Views: index.ejs, quiz.ejs, create.ejs, result.ejs should be created in the 'views' folder.
   Static assets (CSS/JS) should be placed in the 'public' folder. */
