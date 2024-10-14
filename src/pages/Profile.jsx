//? UI components imports
import { Field, Input, Label } from '@headlessui/react'
import { CheckCircleFilled, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

//? Firebase  SDK imports
import { auth, storage, db } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

//? React imports
import { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';



function Profile () {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profilePic, setProfilePic] = useState(null)
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  
  let uid
  const userObj = {
  email : "",
  username : "",
  profilePicUrl : ""
  }

    const errorPopup = (errorCode) => {
      messageApi.open({
        type: "error",
        content: errorCode,
      });
    };

    const successPopup = () => {
    messageApi.open({
      type: 'success',
      content: 'Account Created',
    });
    };

const createAccount = async () => {
  if(!email || !password || username === "" || profilePic === null){
    errorPopup("All fields are required")
  }else{
    setLoading(true)
    try{
      await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        uid = userCredential.user.uid
        console.log("uid=>", uid);
      }).catch((error) => {
        const errorCode = error.code.slice(5);
        setLoading(false)
        errorPopup(errorCode)
        return
      })

      let profilePicRef = ref(storage, `weatherApp/${uid}`);
      await uploadBytes(profilePicRef, profilePic)
      console.log("profile pic uploaded to db");

      const url = await getDownloadURL(profilePicRef)
      console.log("URL retreived from db"),

      userObj.email = email;
      userObj.username = username;
      userObj.profilePicUrl = url

      const userObjRef = doc(db, "weatherApp", uid);
      await setDoc(userObjRef, userObj)
      console.log("UserObj added to db");
      setLoading(false);
      successPopup();
    }catch(error){
        console.log("error in creating account =>",error);
        setLoading(false)
        errorPopup("Error in creating account")
      }
  }
};

  return (
    <section className="w-full h-full flex flex-col items-center justify-center gap-4">
      {contextHolder}
      <Field className={`flex flex-col justify-center items-start gap-1`}>

        <div className='flex flex-col gap-1'>
        <Label className={`text-fourthD font-customFont text-xl`}>Email</Label>
        <Input
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className={`w-60 bg-transparent border-2 border-thirdD focus:border-thirdD focus:border-2 focus:outline-none rounded-md text-base text-fourthD font-customFont p-1 overflow-scroll`}
        />
        </div>

        <div className='flex flex-col gap-1'>
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

        <div className='flex flex-col gap-1'>
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
    </section>
  );
}

export default Profile