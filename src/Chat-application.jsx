import React, { useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVNa-mkmTLz7SOajs1DDD-Y0RvX7AaOK0",
  authDomain: "chat-application-f375e.firebaseapp.com",
  databaseURL: "https://chat-application-f375e-default-rtdb.firebaseio.com",
  projectId: "chat-application-f375e",
  storageBucket: "chat-application-f375e.appspot.com",
  messagingSenderId: "1021840173685",
  appId: "1:1021840173685:web:ca51fabb7d961ddf3ca63c",
  measurementId: "G-W25R05VRW9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const ChatApplication = () => {

  // State variables for user authentication
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changestate, setChangeState] = useState("signup");
  const [useroption, setUserOption] = useState("");
  const [focus, setFocus] = useState(null);
  
  // State variables for chat data
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const msgRef = useRef(null);

  const usertoken = localStorage.getItem("usertokenid");
  const userlocalid = localStorage.getItem("userlocalid");
  const username = localStorage.getItem("username");

  // Function to handle user signup
  const handleSignUp = async () => {
    try {
      if (usertoken) return alert("User already signed up");
      const res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("usertokenid", res.user.stsTokenManager.accessToken);
      localStorage.setItem("userlocalid", res.user.uid);
      localStorage.setItem("username", res.user.email);
      alert("Signup successful");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  // Function to handle user signin
  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("usertokenid", res.user.stsTokenManager.accessToken);
      localStorage.setItem("userlocalid", res.user.uid);
      localStorage.setItem("username", res.user.email);
      alert("Signin successful");
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert(error.message);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout successful");
  };

  // Function to handle message submission
  const handleMessageSubmit = () => {
    const message = msgRef.current.value;
    if (message.trim() !== "") {
      writeUserData(message);
      msgRef.current.value = "";
    }
  };

  // Function to write user data to Firebase database
  const writeUserData = (message) => {
    if (useroption === "") return;
    const postListRef = ref(database, 'messages' + useroption);
    push(postListRef, {
      message,
      timestamp: new Date().toISOString(),
    });
  };

  // useEffect to read messages for user 1
  useEffect(() => {
    if (useroption === "") return;
    const messagesRef = ref(database, 'messages1');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.values(data);
        setData1(messagesArray);
      }
    });
  }, [useroption]);

  // useEffect to read messages for user 2
  useEffect(() => {
    if (useroption === "") return;
    const messagesRef = ref(database, 'messages2');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.values(data);
        setData2(messagesArray);
      }
    });
  }, [useroption]);

  return (
    <div style={{ height: "800px", width: "800px", background: "#ffff66", display: "flex", flexDirection: "column" }}>
      <h1>Chat Application</h1>
      <select onChange={(e) => setUserOption(e.target.value)}>
        <option value="">Select User</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
      </select>
      <h1 onClick={() => setChangeState("signin")} style={changestate === "signin" ? { background: "gray", cursor: "pointer" } : { cursor: "pointer" }}>Sign In</h1>
      <h1 onClick={() => setChangeState("signup")} style={changestate === "signup" ? { background: "gray", cursor: "pointer" } : { cursor: "pointer" }}>Sign Up</h1>
      <h1>Username: {userlocalid || usertoken ? username : "Please login or signup"}</h1>
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={changestate === "signin" ? handleSignIn : handleSignUp}>Submit</button>
      <button style={{ background: "red" }} onClick={handleLogout}>Logout</button>

      <div style={{ overflow: "scroll", background: "#ffff99", width: "90%", height: "600px", margin: "30px", display: "flex" }}>
        <div style={{ width: "45%", padding: "10px", display: "flex", flexDirection: "column", height: "100%" }}>
          {data1.map((item, index) => (
            <p key={index} style={{ width: "80%", background: "#80ffcc" }}>{item.message}</p>
          ))}
        </div>
        <div style={{ width: "45%", display: "flex", flexDirection: "column", height: "100%" }}>
          {data2.map((item, index) => (
            <p key={index} style={{ width: "80%", background: "#80ffcc" }}>{item.message}</p>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", alignSelf: "center" }}>
        <input ref={msgRef} type="text" style={{ width: "300px", height: "80px" }} placeholder={!username && "Please login"} disabled={!username} />
        <button style={{ width: "150px", height: "50px" }} onClick={handleMessageSubmit} disabled={!username}>Chat</button>
      </div>
    </div>
  );
};

export default ChatApplication;
