//? UI components imports
import { Field, Input, Label } from '@headlessui/react'
import { CheckCircleFilled, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

//? Firebase  SDK imports
import { auth, storage, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

//? React imports
import { useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';



function Profile () {
  //? State to manage switching from signup-form to signin-form
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [user, setUser] = useState(false)

  //? Initialize states for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  //? Loading state to display spinner for better UX
  const [loading, setLoading] = useState(false);
  //? State to display popover message componenet by antDesign
  const [messageApi, contextHolder] = message.useMessage();

  //? Initialize uid for refrencing to each user's data in fire-storage and firestore-database
  let uid;

  //? Schema for user's basic data
    const userObj = {
    email: "",
    username: "",
    profilePicUrl: "",
    savedCities: 0,
    }

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

  //? Listener function to constantly check whether user is logged in or not
  onAuthStateChanged(auth, async (user) => {
    if(user){
      setUser(true)
      uid = user.uid;
      console.log("user already logged in");
    }
    
  });

  //? User's account creation and data uploading logic
  const createAccount = async () => {
    //* Show error if any input field is empty
    if (!email || !password || username === "" || profilePic === null) {
      errorPopup("All fields are required");
    } else {
      //* Show loading icon untill all data is uploaded successfuly
      setLoading(true);
      try {
        //* Creata new user account with email and password and assign user's unique uid to uid variable
        //* for making refrences to user's data in fire-storage and firestore-database
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            uid = userCredential.user.uid;
            console.log("uid=>", uid);
          })
          .catch((error) => {
            const errorCode = error.code.slice(5);
            setLoading(false);
            errorPopup(errorCode);
            return;
          });

        //* Upload user's profile pic to weatherApp folder and set uid as filename
        let profilePicRef = ref(storage, `weatherApp/${uid}`);
        await uploadBytes(profilePicRef, profilePic);
        console.log("profile pic uploaded to db");

        //* Get download url from fire-storage's weatherApp folder using user's uid
        const url = await getDownloadURL(profilePicRef);
        console.log("URL retreived from db"),
          //* Update userObj keys to make it ready to be uploaded to db
              userObj.email = email,
              userObj.username = username,
              userObj.savedCities = 0,
              userObj.profilePicUrl = url

        //* Create a new doc in weatherApp collection in firestore-db and set uid as doc's
        //* path, then show success message popup
        const userObjRef = doc(db, "weatherApp", uid);
        await setDoc(userObjRef, userObj);
        console.log("UserObj added to db");
        setLoading(false);
        successPopup("Account Created");
        setUsername("")
        setEmail("")
        setPassword("")
        setProfilePic("")
      } catch (error) {
        console.log("error in creating account =>", error);
        setLoading(false);
        errorPopup("Error in creating account");
      }
    }
  };

  //? User's account signin logic
  const signIn = async () => {
    //* Show error if any input field is empty
    if (!email || !password) {
      errorPopup("All fields are required");
    } else {
      //* Show loading icon untill all data is uploaded successfuly
      setLoading(true);
      try {
        //* Signin user with email and password
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setLoading(false);
            setEmail("")
            setPassword("")
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

      {/* If user is logged in then show his profile info */}
      {user ? (
        <ProfileInfo
          setUser={setUser}
          successPopup={successPopup}
          errorPopup={errorPopup}
        />
      ) : (
        // If user is not logged in then show login/signup form
        <>
          {/* Div to switch from signup to signin */}
          <div className="w-3/6 border-b-2 border-thirdD flex items-center justify-center gap-2">
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className={`w-2/6 p-2 font-customFont text-base border-2 border-thirdD rounded-t-lg border-b-0 text-white
          ${isLoginOpen ? "bg-thirdD" : ""}
          `}
            >
              Signup
            </button>
            <button
              onClick={() => setIsLoginOpen(!isLoginOpen)}
              className={`w-2/6 p-2 font-customFont text-base border-2 border-thirdD rounded-t-lg border-b-0 text-white
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
                      required={true}
                      type="file"
                      onChange={(e) => setProfilePic(e.target.files[0])}
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
                    onChange={(e) => setPassword(e.target.value)}
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