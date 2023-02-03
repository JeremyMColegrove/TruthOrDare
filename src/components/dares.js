import React from 'react'

function Dares(props) {
    const {title,type, open, remove, questions} = props;
  return (
      <div>
    <div className="container">
        <div className="dare-container">
            <h1>
                {title}
            </h1>
            <div onClick={()=>open(type)} className="dare-button smaller-button">
                +
            </div>
            
        </div>
        
        <div>

        </div>
        
    </div>
    <div className="container wrap padding">
        {questions && questions.map((item, index) => {
            
            return <div onClick={()=>remove(index, type)} key={index} className="item">{item}</div>
        })}
        {questions && questions.length === 0 && <div>click + to add a {type===0?"dare":"truth"}</div>}
    </div>

    </div>
  )
}

export default Dares