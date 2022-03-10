import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const HomeScreen = () => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch]);

  return (
    <>
      <div className="hero">
        <li>
          <div className="container">
            <div className="hero-content">
              <small className="slide-subtitle">True Church</small>
              <h2 className="slide-title">Place with a real love</h2>
              {userInfo ? (
                <h4>
                  welcome{" "}
                  <span
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      color: "red",
                    }}
                  >
                    {" "}
                    {userInfo.name}{" "}
                  </span>{" "}
                  God loves you
                </h4>
              ) : (
                <h4>
                  welcome{" "}
                  <span
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                      color: "red",
                    }}
                  >
                    {" "}
                    Beloved
                  </span>{" "}
                  God loves you
                </h4>
              )}
              {!userInfo && (
                <h2>
                  Please register <Link to="/register">here</Link>
                </h2>
              )}
              {userInfo && userInfo.isAdmin && (
                <h2>admin please scroll down to view registered users</h2>
              )}
            </div>
          </div>
        </li>
      </div>
      {userInfo && userInfo.isAdmin && (
        <div className="userList">
          <h1> Registered Users</h1>

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>

                  <th>IS ADMIN</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default HomeScreen;
