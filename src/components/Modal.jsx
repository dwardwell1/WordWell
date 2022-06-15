import React from 'react'

export default function Modal({isCorrect, turn, solution}) {
  return (
    <div className="modal">
        {isCorrect && (
            <div> 
                <h1>I guess you won apparently</h1>
                <p className="solution">{solution}</p>
                <p >It took you {turn} turns? Be better</p>
            </div>
        )}
         {!isCorrect && (
            <div> 
                <h1>Should have never tried to be honest</h1>
                <p className="solution">The word was "{solution}"</p>
                <p >Try reading a dictionary</p>
            </div>
        )}
    </div>
  )
}
