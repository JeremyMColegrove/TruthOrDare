import Dares from "./components/dares";
import {useState, useEffect} from 'react'
const TRUTH = 1;
const DARE = 0;
function App() {
  const [questions, setQuestions] = useState({truth:[], dares:[]});
  const [question, setQuestion] = useState("Your truth/dare will appear here!");
  const [popup, openPopup] = useState(false);
  const [type, setType] = useState(TRUTH);
  const [textarea, setTextarea] = useState("Insert truth/dare here");
  
  useEffect(()=>{
    var questions = JSON.parse(localStorage.getItem("questions"));
    if (!questions || !Array.isArray(questions.truth) || !Array.isArray(questions.dares)) {
      questions = {truth:[], dares:[]};
    }
    setQuestions(questions);
  }, [])
  
  function saveDare() {
    let updated = JSON.parse(JSON.stringify(questions));
    updated.dares.push(textarea);
    saveQuestions(updated);
  }

  function saveTruth() {
    let updated = JSON.parse(JSON.stringify(questions));
    updated.truth.push(textarea);
    saveQuestions(updated);
  }

  function saveQuestions(questions) {
    localStorage.setItem("questions", JSON.stringify(questions));
    setQuestions(questions);
    openPopup(false);
  }

  function togglePopup(type) {
    if (popup) {
      openPopup(false);
    } else {
      openPopup(true);
      setType(type);
    }
  }
  function remove(index, type) {
    let updated = JSON.parse(JSON.stringify(questions));
    if (type === TRUTH) {
      updated.truth.splice(index, 1);
    } else {
      updated.dares.splice(index, 1);
    }
    saveQuestions(updated);
  }

  function choose(choice) {
    if (choice === TRUTH) {
      setQuestion(questions.truth[Math.floor(Math.random() * questions.truth.length)]);
    } else {
      setQuestion(questions.dares[Math.floor(Math.random() * questions.dares.length)]);

    }
  }
  return (
    <section>
      {popup && 
      <div className="popup">
        <div className="popup-container">
          <h1>
            {type === TRUTH && "Enter Truth:"}
            {type === DARE && "Enter Dare:"}

          </h1>
          <textarea value={textarea} onChange={e=>setTextarea(e.target.value)}></textarea>
          <div className="container">
            <div onClick={()=>{openPopup(false)}} className="dare-button cancel">Cancel</div>
            <div onClick={()=>{type===TRUTH?saveTruth():saveDare()}} className="dare-button save">Save</div>
          </div>
        </div>
      </div>}
      <div className="header">
        Truth or Dare by Jeremy Colegrove
      </div>
      <div className="container buttons">
        <div className="truth-button" onClick={()=>choose(TRUTH)}>
          Pick Truth
        </div>
        <div className="dare-button" onClick={()=>choose(DARE)}>
          Pick Dare
        </div>
      </div>
      <div className="container">
        <div className="result">
        {question}
        </div>
      </div>
      
      <Dares remove={remove} questions={questions.dares} open={()=>togglePopup(DARE)} type={DARE} title="Dares"></Dares>
      <Dares remove={remove} questions={questions.truth} open={()=>togglePopup(TRUTH)} type={TRUTH} title="Truths"></Dares>
    </section>
  );
}

export default App;
