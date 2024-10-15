//? UI components imports
import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";
import { Avatar, Spin } from "antd";

//? Firebase  SDK imports
import { signOut } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

//? React imports
import { useEffect, useState } from "react";

export default function ProfileInfo({ setUser, successPopup, errorPopup }) {
  //? Loading state to display spinner for better UX
  const [loading, setLoading] = useState(false);

  //? Uid state to keep user's uid updated
  const [uid, setUid] = useState();

  //? Schema for user's basic data
  const [userObj, setUserObj] = useState({
    email: "",
    username: "",
    profilePicUrl: "",
    savedCities: 0,
  });

  //? Listener function to constantly check whether user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //? User's data fetching and display logic
  useEffect(() => {
    //* Only fetch user data if uid is available
    const fetchUserData = async () => {
      if (uid) {
        try {
          setLoading(true);
          //* Create refrence to user's docin db and fetch user data
          const userDocRef = doc(db, "weatherApp", uid);
          const userDocSnapshot = await getDoc(userDocRef);
          const userDoc = userDocSnapshot.data();

          //* Set user obj to display user-profile info only if userDoc is not undefined
          if (userDoc) {
            setUserObj({
              email: userDoc.email,
              username: userDoc.username,
              savedCities: userDoc.savedCities,
              profilePicUrl: userDoc.profilePicUrl,
            });
            //* Show success message for better ux
            setLoading(false);
            successPopup("Logged In");
          } else {
            errorPopup("User document not found.");
            setLoading(false);
          }
        } catch (err) {
          console.log("Error retrieving userDoc", err);
          errorPopup("An error occurred while retrieving user data.");
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [uid]);

  //? Logic to log user out
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setLoading(false);
      setUser(false);
      successPopup("Logged out");
    } catch (err) {
      setLoading(false);
      errorPopup("Error logging out");
      console.log("Error logging out =>", err);
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
            src={userObj.profilePicUrl}
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
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD opacity-95`}
            >
              Username
            </p>
            <p
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD`}
            >
              {userObj.username}
            </p>
          </div>
          <div className={`w-full flex border-2 border-thirdD p-2 rounded-lg`}>
            <p
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD opacity-95`}
            >
              Email
            </p>
            <p
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD`}
            >
              {userObj.email}
            </p>
          </div>
          <div className={`w-full flex border-2 border-thirdD p-2 rounded-lg`}>
            <p
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD opacity-95`}
            >
              Saved-Cities
            </p>
            <p
              className={`w-1/2 text-center text-2xl font-customFont text-fourthD`}
            >
              {userObj.savedCities}
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
