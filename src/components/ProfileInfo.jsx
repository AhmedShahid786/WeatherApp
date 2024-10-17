//? UI components imports
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Spin } from "antd";

//? Firebase  SDK imports
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
//? React imports
import { useState } from "react";

export default function ProfileInfo({ userObj, successPopup, errorPopup, setUser }) {
  //? Loading state to display spinner for better UX
  const [loading, setLoading] = useState(false);
  

  //? Logic to log user out
  const logout = async () => {
    try {
      await signOut(auth);
      setLoading(true);
      successPopup("Logged out");
    } catch (err) {
      errorPopup("Error logging out");
      console.error("Error logging out =>", err);
    } finally {
      setLoading(false);
      setUser(false)
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 48,
              }}
              spin
            />
          }
          size="small"
        />
      ) : (
        <div className="w-2/4 flex flex-col justify-center items-center gap-8">
          <Avatar
            src={userObj?.profilePicUrl}
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            className="border-2 border-thirdD"
          />
          <div className={`w-full flex border-2 border-thirdD p-2 rounded-lg`}>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD opacity-95`}
            >
              Username
            </p>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD`}
            >
              {userObj?.username}
            </p>
          </div>
          <div className={`w-full flex border-2 border-thirdD p-2 rounded-lg`}>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD opacity-95`}
            >
              Email
            </p>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD`}
            >
              {userObj?.email}
            </p>
          </div>
          <div className={`w-full flex border-2 border-thirdD p-2 rounded-lg`}>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD opacity-95`}
            >
              Saved-Cities
            </p>
            <p
              className={`w-1/2 text-center text-xl font-customFont text-fourthD`}
            >
              {userObj?.savedCities.total}
            </p>
          </div>

          <button
            onClick={logout}
            className={`w-60 text-base font-customFont border-2 p-2 rounded-lg hover:rounded-full text-fourthD border-fourthD`}
          >
            <p>
              Logout <ArrowRightOutlined />
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
