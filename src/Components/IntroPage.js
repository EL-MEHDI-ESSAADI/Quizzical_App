import React from "react";

export default function IntroPage({startQuiz}) {
   return (
      <div className="introPage-container">
         <h1 className="introPage-container__title">Quizzical</h1>
         <p className="introPage-container__pr"> Test your knowledge on computer science </p>
         <button onClick={startQuiz} className="introPage-container__btn mainPage-btn">Start quiz</button>
      </div>
   )
}