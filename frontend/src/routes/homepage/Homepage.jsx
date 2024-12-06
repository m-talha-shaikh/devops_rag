import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Welcome to TradeMate </h1>
        <h2>Your Trusted Binance Assistant</h2>
        <h3>
          TradeMate is here to simplify your Binance trading experience. Whether
          you're a beginner or an expert, our smart chatbot integrates
          seamlessly with Binance to provide personalized insights, instant
          trade execution, and real-time market updates.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Hi, can you help me understand the loan approval workflow in our system?",
                1000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Certainly! The loan approval process in our application consists of the following key stages: ...",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: How does credit scoring work?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot:  It fetches credit history from bureaus, evaluates repayment patterns, and calculates a score (300–850).",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
