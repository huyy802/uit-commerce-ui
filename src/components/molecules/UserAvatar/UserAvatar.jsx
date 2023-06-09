import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetLocal } from "../../../store/reducers/basketSlice";
import { useNavigate } from "react-router-dom";
import userAvatarDefault from "../../../assets/images/userAvatarDefault.jpg";
import { useAuth } from "../../../contexts/auth-context";
import { auth } from "../../../firebase/firebase-config";

const UserAvatar = ({ props }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const isLoading = useSelector((state) => state.users.loading);
  const profile_picture = useSelector((state) => state.users.profile_picture);
  const userFunctions = [
    {
      title: "Profile",
      onClick() {
        navigate("/user");
      },
    },
    {
      title: "Sign out",
      onClick() {
        handleSignOut();
      },
    },
  ];
  const handleSignOut = () => {
    dispatch({ type: "logout" });
    localStorage.removeItem("cartItem");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("totalQuantity");
    const removeLocal = {
      cartItem: [],
      totalAmount: 0,
      totalQuantity: 0,
    };
    dispatch(resetLocal(removeLocal));
  };
  return (
    <div className="user" style={{ position: "relative" }}>
      {!isLoggedIn && (
        <div
          className="authentication"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          Sign in
        </div>
      )}
      {isLoggedIn && (
        <>
          <img
            src={profile_picture || userAvatarDefault}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "100px",
              cursor: "pointer",
              objectFit: "cover",
            }}
            alt=""
          />
          <div className="user__popover">
            {userFunctions.map((item, index) => (
              <p key={index} className="user__function" onClick={item.onClick}>
                {item.title}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

UserAvatar.propTypes = {};

export default UserAvatar;
