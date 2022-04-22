import React, { useEffect, useState } from "react";
import IntroPage from "./Components/IntroPage";
import * as thirdParty from "./modules/third-party";
import QuizPage from "./Components/QuizPage";

function App() {
   const [isQuizStarted, setIsQuizStarted] = useState(false);
   const [isQuizEnd, setIsQuizEnd] = useState(false);
   const [quizzes, setQuizzes] = useState([]);
   const [repeatQuizNum, setRepeatQuizNum] = useState(0);
   const [areQuizzesLoading, setAreQuizzesLoading] = useState(false)
   
   useEffect(() => {
      
      setAreQuizzesLoading(true);
      thirdParty.getData(thirdParty.API, (data) => {
         if (data.response_code === 1) throw new Error(" No Results");
         if (data.response_code === 2) throw new Error("Invalid Parameter");
         setAreQuizzesLoading(false)
         setQuizzes(
            data.results.map((dataItem, id) => {
               const answers = dataItem.incorrect_answers;
               // add the right answer
               answers.push(dataItem.correct_answer);
               return {
                  id: id,
                  question: dataItem.question,
                  answers: answers,
                  rightAnswer: answers.length - 1,
                  selectedAnswer: null,
               };
            })
         );
      });
   }, [repeatQuizNum]);

   function startQuiz() {
      setIsQuizStarted(true);
   }

   function selectAnswer(quizItem_id, answer_id) {
      setQuizzes((oldQuizzes) =>
         oldQuizzes.map((item) => (item.id === quizItem_id ? { ...item, selectedAnswer: answer_id } : item))
      );
   }

   function checkAnswers() {
      setIsQuizEnd(true);
   }

   function playAgain() {
      setIsQuizEnd(false);
      setRepeatQuizNum((o) => ++o);
   }

   return (
      <div>
         <img src="/assets/tobBlob.png" alt="blob" className="bolb topBlob" />
         <img src="/assets/bottomBlob.png" alt="blob" className="bolb bottomBlob" />
         <div className="container">
            {!isQuizStarted ? (
               <IntroPage startQuiz={startQuiz} />
            ) : (
               <QuizPage
                  quizzes={quizzes}
                  selectAnswer={selectAnswer}
                  isQuizEnd={isQuizEnd}
                  checkAnswers={checkAnswers}
                  playAgain={playAgain}
                  areQuizzesLoading={areQuizzesLoading}
               />
            )}
         </div>
      </div>
   );
}

export default App;
