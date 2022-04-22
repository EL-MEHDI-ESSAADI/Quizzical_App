import React from "react";
import QuizItem from "./QuizItem";

export default function QuizPage(props) {
   const quizElements = props.quizzes.map((item, key) => {
      return <QuizItem key={key} {...item} selectAnswer={props.selectAnswer} isQuizEnd={props.isQuizEnd} />;
   });

   if (props.areQuizzesLoading) {
      return (
         <div className="quizPage">
            <img src="/assets/Winter.gif" alt="loading.." />
         </div>
      );
   } else {

      let score;
      let checkAnswerBtn;
      let playAgainBtn;

      if (!props.isQuizEnd) {
         checkAnswerBtn = (
            <button onClick={props.checkAnswers} className="quizPage__check-btn mainPage-btn">
               Check answers
            </button>
         );
      } else {
         score = props.quizzes.reduce(
            (score, item) => (item.selectedAnswer === item.rightAnswer ? ++score : score),
            0
         );
         playAgainBtn = (
            <button onClick={props.playAgain} className="quizPage__playAgain-btn mainPage-btn">
               Play again
            </button>
         );
      }

      return (
         <div className="quizPage">
            {quizElements}
            {!props.isQuizEnd ? (
               checkAnswerBtn
            ) : (
               <div>
                  <span className="quizPage__score">
                     You scored &nbsp;
                     {score}
                     /5 correct answers
                  </span>
                  {playAgainBtn}
               </div>
            )}
         </div>
      );
   }
}
