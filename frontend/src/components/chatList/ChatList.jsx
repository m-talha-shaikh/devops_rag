import { Link } from 'react-router-dom'
import './chatList.css'
//<Link to="/">Upload Document</Link> 

const ChatList = () => {
  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <Link to="/dashboard">Create a new Chat</Link>

        <label htmlFor="file" className='fileupload'>
          <span>Upload Document</span> 
          <img src="attachment.png" alt="" className="attachment-icon" />
        </label>
        <input id="file" type="file" multiple={false} hidden/>

        <hr />
        <span className='title'>RECENT CHATS</span>
        <div className="list">
            <Link to="/">Employee Benefits Informatione</Link>
            <Link to="/">IT Support</Link>
            <Link to="/">Helpdesk Info</Link>
        </div>
        <hr />
        <div className="support">
            <img src="/support.png" alt="" />
            <div className="texts">
                <span>Support</span>
            </div>
        </div>
    </div>
  )
}

export default ChatList