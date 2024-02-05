import React, { useEffect, useRef, useState, Suspense } from 'react';
// const Content = React.lazy(() => import("./Content"));
import './App.css'
import { Link, Outlet } from 'react-router-dom';
import Content from './Content';
import { Route, Routes } from 'react-router-dom';
import New from './read-more-content/New'
import Specified from './inner-components/Specified';
import Different_theme_Data from './Articles_JSON/Different_Theme.json'
import featured from '../src/Articles_JSON/Featured_JSON.json'
import Different from './read-more-content/Different'
import { auth, provider } from './firebase/Firebase'
import { signInWithPopup } from 'firebase/auth';
import { MdLogout } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs, { sendForm } from '@emailjs/browser';

function App() {

  const form = useRef();
  const [userData, setUserData] = useState({});
  const [seeUser, setSeeUser] = useState(false);
  const notify_logIn = () => toast("LogIn Completed");
  const notify_Submission = () => toast("Submission Successfull");
  const notify_Empty_Submission = () => toast("please fill all the fields");
  const notify_do_login = () => toast("please do login first");

  const signWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      // console.log(user);
      setUserData({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      });
      setSeeUser(!seeUser);
      notify_logIn();
    })
      .catch((error) => {
        console.log(error);
      });
  };

  // Initialize Firebase authentication observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        });
        setSeeUser(true);
      } else {
        setUserData({});
        setSeeUser(false);
      }
    });
    return () => unsubscribe(); // Cleanup the observer on component unmount
  }, []);

  const LogOut = () => {
    if (userData.uid) {
      setUserData({});
    }
    auth.signOut().then(() => {
      localStorage.clear();
      window.location.reload();
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  }

  useEffect(() => {
    // console.log(userData);
    localStorage.setItem("Name", userData.displayName);
    localStorage.setItem("Email", userData.email);
    localStorage.setItem("photoURL", userData.photoURL);
    // localStorage.setItem("uid", userData.uid);
  }, [userData]);

  // console.log(auth, provider);

  const submit = (event) => {
    event.preventDefault();
    if (document.getElementById("email").value === '' || document.getElementById("message").value === '') {
      notify_Empty_Submission();
      return;
    } else {
      if (seeUser) {
        emailjs.sendForm(import.meta.env.VITE_serviceId, import.meta.env.VITE_templateId, form.current, import.meta.env.VITE_publicKey)
          .then((result) => {
            notify_Submission();
            // window.location.reload();
          }, (error) => {
            alert(error.text);
          });
      } else {
        notify_do_login();
        // window.location.reload();
      }
    }
  }

  // const What_share = () => {
  //   let curr_url = window.location.href;
  //   const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(curr_url)}`;
  //   window.open(whatsappUrl, '_blank');
  // };

  const open_menu = () => {
    document.getElementById("menu").style.display = "none";
    document.getElementById("menu-close").style.display = "flex";
    document.getElementById("display-mobile-options").style.display = "flex";
  }

  const close_menu = () => {
    document.getElementById("menu").style.display = "flex";
    document.getElementById("menu-close").style.display = "none";
    document.getElementById("display-mobile-options").style.display = "none";
  }

  return (
    <div className='rel'>
      <nav>
        <div className='nav-bar'>
          <div className='logo-img'>
            <Link to='/'><img src="/logo.png" alt="logo.png" /></Link>
            <ul id='options'>
              <Link to='/'><li id='list home'>Home</li></Link>
              <Link to={'/specified/Mobile Phones'}><li id='list'>Mobile Phones</li></Link>
              <Link to={'/specified/GPUs'}><li id='list'>GPUs</li></Link>
              <Link to={'/specified/Artifficial-Intelligence'}><li id='list'>Artifficial Intelligence</li></Link>
            </ul>
          </div>
          <div className='mobile-options'>
            <img src="./nav-menu-icon.png" alt="" id='menu' onClick={() => { open_menu() }} />
            <img src="./delete.png" alt="" id='menu-close' onClick={() => { close_menu() }} />
          </div>
          <div className='login-box'>
            {
              seeUser ?
                <button id='logout-btn' onClick={(e) => {
                  e.preventDefault();
                  LogOut();
                }}>Log Out <MdLogout /></button>
                : false
            }
            {
              seeUser ?
                <img src={userData.photoURL} alt="" id='avatar-img' title={userData.displayName} onClick={() => { signWithGoogle() }} onError={(e) => {
                  e.target.src = "./default-avatar.png"; // Provide a default image source
                }} />
                :
                <img src="./login-avatar.png" alt="" id='avatar-img' onClick={() => { signWithGoogle() }} title='LogIn' />
            }
          </div>
        </div>
      </nav>

      <div id='display-mobile-options'>
        <ul id='options'>
          <Link to='/'><li id='list home'>Home</li></Link>
          <div id='hr-line'></div>
          <Link to={'/specified/Mobile Phones'}><li id='list'>Mobile Phones</li></Link>
          <div id='hr-line'></div>
          <Link to={'/specified/GPUs'}><li id='list'>GPUs</li></Link>
          <div id='hr-line'></div>
          <Link to={'/specified/Artifficial-Intelligence'}><li id='list'>Artifficial Intelligence</li></Link>
        </ul>
      </div>

      <ToastContainer />

      <div className='render'>
        {/*routes and route*/}
        <Routes>
          <Route
            path="/"
            element={<Content />}
          />
          <Route
            path='/specified/:title'
            element={<Specified data={Different_theme_Data} />}
          />
          <Route
            path='/New/:Heading/:id'
            element={<New data={featured} login={seeUser} userid={userData.uid} />}
          />
          <Route
            path='/Different/:Heading/:id'
            element={<Different data={Different_theme_Data} login={seeUser} userid={userData.uid} />}
          />
        </Routes>

        <Outlet />
      </div>

      {/*footer div*/}
      <div id='footer'>
        <div className='div1'>
          <Link to='/'><img src="/logo.png" alt="logo.png" /></Link>
          <div className='hr'>
            <div className='line'></div>
          </div>
          <div className='footer-about'>
            <h4 style={{ 'color': 'white' }}>About Us</h4>
            <p className='footer-about-desc' style={{ 'color': 'white' }}>
              "Stay ahead of the curve with our tech news website, where innovation meets information. Uncover the latest breakthroughs, trends, and analyses in the ever-evolving world of technology, curated for enthusiasts and professionals alike."
            </p>
          </div>
        </div>
        <div className='div2'>
          <h3 style={{ 'color': 'white', 'width': 'fit-content', 'margin': 'auto' }}>Quick Links</h3>
          <ul>
            <Link to='/'><li id='list home'>Home</li></Link>
            <Link to={'/specified/Mobile Phones'}><li id='list'>Mobile Phones</li></Link>
            <Link to={'/specified/GPUs'}><li id='list'>GPUs</li></Link>
            <Link to={'/specified/Artifficial-Intelligence'}><li id='list'>Artifficial Intelligence</li></Link>
          </ul>
        </div>
        <div className='div3'>
          <h3 style={{ 'color': 'white', 'width': 'fit-content', 'margin': 'auto' }}>Contact Us</h3>
          <form ref={form} onSubmit={submit}>
            <input type="email" name="email" id="email" placeholder='enter your email' value={userData.email} />
            <textarea name="message" id="message" cols="30" rows="5" placeholder='enter your message' />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default App