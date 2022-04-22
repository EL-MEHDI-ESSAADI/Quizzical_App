import React from "react";

function convertHTMLEntity(text) {
   const span = document.createElement("span");

   return text.replace(/&[#A-Za-z0-9]+;/gi, (entity) => {
      span.innerHTML = entity;
      return span.innerText;
   });
}

export default function QuizItem(props) {
   const asnwersElements = props.answers.map((text, answer_id) => {
      let buttonStateClass ;
      const isTheBtnSelected = props.selectedAnswer === answer_id;

      if (props.isQuizEnd) {
         buttonStateClass =
            props.rightAnswer === answer_id
               ? "quizItem__answer--correct"
               : isTheBtnSelected
               ? "quizItem__answer--wrong"
               : "quizItem__answer--unhighlighted";
      } else {
         buttonStateClass = isTheBtnSelected ? "quizItem__answer--selected" : "";
      }

      return (
         <button
            onClick={!props.isQuizEnd ? (o) => props.selectAnswer(props.id, answer_id) : null}
            key={answer_id}
            className={`quizItem__answer ${buttonStateClass}`}
         >
            {convertHTMLEntity(text)}
         </button>
      );
   });

   return (
      <div className="quizItem">
         <p className="quizItem__question">{convertHTMLEntity(props.question)}</p>
         <div className="quizItem__answers">{asnwersElements}</div>
      </div>
   );
}
