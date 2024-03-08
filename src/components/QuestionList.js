// import { useEffect } from 'react';
import React, {useEffect, useState} from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, deleteQuestion}) {


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return <QuestionItem 
                  key ={question.id} 
                  question={question} 
                  deleteQuestion={deleteQuestion} />
      })}</ul>
    </section>
  );
}

export default QuestionList;
