import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(data => setQuestions(data))
  }, [])
  
  function submitForm(formData) {
    const postObj = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4
      ],
      correctIndex: parseInt(formData.correctIndex)
    }

    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postObj)
    })
      .then(r => r.json())
      .then(data => setQuestions([...questions, data]))
  }

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(setQuestions((questions) => questions.filter((question) => question.id !== id)))
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm 
                            submitForm={submitForm} /> : 
                          <QuestionList 
                            questions={questions} 
                            deleteQuestion={deleteQuestion}/>}
    </main>
  );
}

export default App;
