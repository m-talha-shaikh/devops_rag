import './dashboardPage.css'

const DashboardPage = () => {
  return (
    <div className='dashboardPage'>
      <div className="texts">
      <div className="logo">
        <img src="/logo.png" alt="" />
        <h1>KNOWLEDGE AI</h1>
      </div>
      <div className="options">
        <div className="option">
          <img src="/chat.png" alt="" />
          <span>Create a New Chat</span>
        </div>
        <div className="option">
          <img src="/image.png" alt="" />
          <span>What are the latest compliance guidelines for international transfers?</span>
        </div>
        <div className="option">
          <img src="/code.png" alt="" />
          <span>What is the procedure for applying for annual leave?</span>
        </div>
        </div>
      </div>
      <div className="formContainer">
        <form>
          <input type="text" placeholder='Ask a question' />
          <button>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default DashboardPage