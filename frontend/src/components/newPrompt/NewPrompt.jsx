import { useEffect, useRef } from 'react';
import './newPrompt.css'

const NewPrompt = () => {

    const endRef = useRef(null)

    useEffect(()=>{
      endRef.current.scrollIntoView({behavior:"smooth"});
    },[]);

  return (
    <div className="newPrompt">
        <div className="endChat" ref={endRef}></div>
        <form className='newForm'>
            <input type="text" placeholder='Ask a question' />
            <button>
                <img src="/arrow.png" alt="" />
            </button> 
        </form>
    </div>
  )
}

export default NewPrompt