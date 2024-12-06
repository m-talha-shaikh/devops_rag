import { useState } from 'react';
import './chatList.css';

const ChatList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);  // State to control modal visibility
  const [loading, setLoading] = useState(false);  // State to control the loading screen visibility

  const handleFileUpload = () => {
    // Simulate document upload process
    setLoading(true);  // Set loading to true during file upload
    setTimeout(() => {
      setLoading(false);  // Set loading to false once the upload is complete
      setIsModalVisible(true);  // Show success modal
    }, 2000);  // Simulate a 2-second upload time
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);  // Close the modal when the cross button is clicked
  };

  return (
    <div className='chatList'>
        <span className='title'>DASHBOARD</span>
        <div className="create-chat">
          <button className="new-chat-button">Create a new Chat</button>
        </div>

        <label htmlFor="file" className='fileupload'>
          <span>Upload Document</span> 
          <img src="attachment.png" alt="attachment" className="attachment-icon" />
        </label>
        <input id="file" type="file" multiple={false} hidden onChange={handleFileUpload} />

        <hr />
        <span className='title'>RECENT CHATS</span>
        <div className="list">
            <div className="chat-item">Employee Benefits Information</div>
            <div className="chat-item">IT Support</div>
            <div className="chat-item">Helpdesk Info</div>
        </div>
        <hr />
        <div className="support">
            <img src="/support.png" alt="support" />
            <div className="texts">
                <span>Support</span>
            </div>
        </div>

        {/* Loading Screen */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <p>Uploading...</p>
          </div>
        )}

        {/* Modal */}
        {isModalVisible && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-modal" onClick={handleCloseModal}>&#x2715;</button> {/* Cross button */}
              <h3>Document Uploaded</h3>
              <p>Document uploaded to the knowledge base successfully!</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default ChatList;
