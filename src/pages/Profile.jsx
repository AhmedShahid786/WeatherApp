//? UI components imports
import { Field, Input, Label } from '@headlessui/react'
import { CheckCircleFilled, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

//? Firebase  SDK imports
import { auth, storage, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';

//? React imports
import { useState, useRef, useEffect } from 'react';
import ProfileInfo from '../components/ProfileInfo';



function Profile () {
  //? State to manage switching from signup-form to signin-form
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [isDataUploading, setIsDataUploading] = useState(false);
  const [isDataUploaded, setIsDataUploaded] = useState(false);
  const [userDoc, setUserDoc] = useState({});

  //? Initialize states for form inputs
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const fileInputRef = useRef(null);
  //? Loading state to display spinner for better UX
  const [loading, setLoading] = useState(false);
  //? State to display popover message componenet by antDesign
  const [messageApi, contextHolder] = message.useMessage();
  //? Initialize uid for refrencing to each user's data in fire-storage and firestore-database
  let uid
  //? Schema for user's basic data
  const userObj = {
    email: "",
    username: "",
    profilePicUrl: null,
    savedCities: {
      total : 0,
      cities : []
    },
  };

  //? Function to show error message popup
  const errorPopup = (errorCode) => {
    messageApi.open({
      type: "error",
      content: errorCode,
    });
  };
  //? Function to show success message popup
  const successPopup = (successCode) => {
    messageApi.open({
      type: "success",
      content: successCode,
    });
  };

  //? Function to validate email with regex
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  //? Function for profile pic validation
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      errorPopup("Only image files are allowed");
      fileInputRef.current.value = null; // Reset the file input
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      errorPopup("File size exceeds the 2MB limit");
      fileInputRef.current.value = null; // Reset the file input
      return;
    }

    //* Set the file for upload if it's valid
    setProfilePic(file);
  };

  //? Listener function to constantly check whether user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
      if (!isDataUploading) {
          setIsUser(true);
          uid = user.uid
          fetchUserData(uid)
        }
      }
    });

    return () => unsubscribe(); //* Unsubscribe when component unmounts
  }, [isDataUploading, isDataUploaded]); //* Add isDataUploaded to dependencies

  //* User's data fetching logic
  const fetchUserData = async(uid) => {
  const userDocRef = doc(db, "weatherApp", uid);
  const userRawDoc = await getDoc(userDocRef)
  setUserDoc(userRawDoc.data())
  setIsDataUploaded(true);
  }

  //* User's account creation and data uploading logic
  const createAccount = async () => {
    //* Input fields validation logic
    if (!email || !password || username === "" || profilePic === null) {
      errorPopup("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      errorPopup("Invalid email format");
      return;
    }
    if (password.length < 6) {
      errorPopup("Password must be at least 6 characters long");
      return;
    }

    //* Main account creation logic
    setLoading(true);
    setIsDataUploading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          uid = userCredential.user.uid
          console.log("uid =>", uid);
        })
        .catch((error) => {
          const errorCode = error.code.slice(5);
          setLoading(false);
          setIsDataUploading(false);
          errorPopup(errorCode);
          return;
        });

      //* Upload profile pic and user data
      const profilePicRef = ref(storage, `weatherApp/${uid}`);
      await uploadBytes(profilePicRef, profilePic);
      console.log("profilePic=>", profilePic);
      fileInputRef.current.value = null;

      const url = await getDownloadURL(profilePicRef);
      console.log("url retreived from db =>", url);

      userObj.email = email;
      userObj.username = username;
      userObj.savedCities = { total: 0, cities: [] };
      userObj.profilePicUrl = url;

      const userObjRef = doc(db, "weatherApp", uid);
      await setDoc(userObjRef, userObj);
      console.log("UserObj uploaded to db");
      fetchUserObj(uid)

      setLoading(false);
      successPopup("Account Created");
      //* Set data upload flag to true once everything is uploaded
      setIsDataUploaded(true);
    } catch (error) {
      errorPopup("Error in creating account");
    } finally {
      setIsDataUploading(false); 
      setLoading(false);
    }
  };

  //? User's account signin logic
  const signIn = async () => {
    //* Show error if any input field is empty
    if (!loginEmail || !loginPassword) {
      errorPopup("All fields are required");
    } else {
      //* Show loading icon untill all data is uploaded successfuly
      setLoading(true);
      try {
        //* Signin user with email and password
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
          .then((userCredential) => {
            setLoading(false);
            setLoginEmail("");
            setLoginPassword("");
            uid = userCredential.user.uid;
            console.log("user logged in =>", uid);
          })
          .catch((error) => {
            const errorCode = error.code.slice(5);
            setLoading(false);
            errorPopup(errorCode);
            return;
          });
      } catch (error) {
        console.log("error in user login =>", error);
        setLoading(false);
        errorPopup("Error in user login");
      }
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Necessary to include it in order to show popup messages */}
      {contextHolder}

      {/* Only show ProfileInfo once user is logged in AND data is uploaded */}
      {isUser && isDataUploaded && !isDataUploading ? (
        <ProfileInfo
          userObj={userDoc}
          successPopup={successPopup}
          errorPopup={errorPopup}
          setUser={setIsUser}
        />
      ) : (
        // If user is not logged in then show login/signup form
        <>
          {/* Div to switch from signup to signin */}
          <div className="w-3/6 border-b-2 border-thirdD flex items-center justify-center gap-2">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className={`sm:w-2/6 w-3/6 p-2 font-customFont text-base border-2 border-thirdD rounded-t-lg border-b-0 text-white
          ${isLoginOpen ? "bg-thirdD" : ""}
          `}
            >
              Signup
            </button>
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className={`sm:w-2/6 w-3/6 p-2 font-customFont text-base border-2 border-thirdD rounded-t-lg border-b-0 text-white
          ${!isLoginOpen ? "bg-thirdD" : ""}`}
            >
              Login
            </button>
          </div>

          {/* Form for data input */}
          {isLoginOpen ? (
            <>
              <Field
                className={`flex flex-col justify-center items-start gap-1`}
              >
                <div className="flex flex-col gap-1">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Email
                  </Label>
                  <Input
                    required={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Password
                  </Label>
                  <Input
                    required={true}
                    value={password}
                    maxLength={20}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Username
                  </Label>
                  <Input
                    required={true}
                    value={username}
                    maxLength={15}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
                  />
                </div>

                <div className="w-full mt-2 flex items-center justify-between">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Profile Picture
                  </Label>

                  <div
                    className={`flex gap-1 rounded-lg bg-thirdD px-2 py-1 text-white font-customFont text-sm cursor-pointer`}
                  >
                    <Input
                      ref={fileInputRef}
                      required={true}
                      type="file"
                      onChange={handleProfilePicChange}
                      accept="image/*"
                      className={`w-20 absolute opacity-0 cursor-pointer`}
                    />
                    {profilePic != null ? (
                      <p>
                        Selected <CheckCircleFilled className="text-base" />
                      </p>
                    ) : (
                      <p>
                        Select <UploadOutlined className="text-base" />
                      </p>
                    )}
                  </div>
                </div>
              </Field>

              {/* Trigger account creation logic */}
              <div className={`flex justify-start items-center gap-1`}>
                <button
                  onClick={createAccount}
                  className={`w-60 text-base font-customFont border-2 p-2 rounded-lg hover:rounded-full text-fourthD border-fourthD`}
                >
                  {loading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <Field
                className={`flex flex-col justify-center items-start gap-1`}
              >
                <div className="flex flex-col gap-1">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Email
                  </Label>
                  <Input
                    required={true}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    type="text"
                    className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label className={`text-fourthD font-customFont text-xl`}>
                    Password
                  </Label>
                  <Input
                    required={true}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type="password"
                    className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
                  />
                </div>
              </Field>

              {/* Trigger account signin logic */}
              <div className={`flex justify-start items-center gap-1`}>
                <button
                  onClick={signIn}
                  className={`w-60 text-base font-customFont border-2 p-2 rounded-lg hover:rounded-full text-fourthD border-fourthD`}
                >
                  {loading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="small" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Profile