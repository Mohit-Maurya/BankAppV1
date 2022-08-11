import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  IoCloseCircleOutline,
  IoCallSharp,
  IoMail,
  IoHome,
} from "react-icons/io5";
import axios from "axios";

function Profile() {
  const { state } = useLocation();
  const { userid } = state;
  const [data, setData] = useState({
    name: "",
    pan: "",
    email: "",
    temporaryAddress: "",
    aadhaarNumber: "",
    mobileNumber: "",
    permanentAddress: "",
  });

  const [update, setUpdate] = useState(false);

  const getUser = async () => {
    await axios
      .get("http://localhost:8080/user/" + userid)
      .then((res) => {
        setData({
          name: res.data.name,
          pan: res.data.pan,
          email: res.data.email,
          temporaryAddress: res.data.temporaryAddress,
          aadhaarNumber: res.data.aadhaarNumber,
          mobileNumber: res.data.mobileNumber,
          permanentAddress: res.data.permanentAddress,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    console.log(data);
    await axios
      .put(`http://localhost:8080/user/${userid}`, data)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelUpdate = async (event) => {
    if (window.confirm("Changes will not be saved") === true) {
      window.location.reload(false);
    }
    event.preventDefault();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {/* <ToastContainer hideProgressBar={true} autoClose={3000} closeOnClick={true} pauseOnHover={true}/> */}
      <div className="card mx-auto mt-5" style={{ width: "50vw" }}>
        <div className="card-header">
          <h5 className="float-start">Profile</h5>
          {update ? (
            <button
              onClick={cancelUpdate}
              className="float-end"
              style={{
                borderColor: "transparent",
                backgroundColor: "transparent",
              }}
            >
              <IoCloseCircleOutline size="2rem" color="red" />
            </button>
          ) : (
            <button
              className="btn btn-primary float-end"
              onClick={() => {
                setUpdate(true);
              }}
            >
              Update
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="col-6 form-group mb-3">
            <label>
              <b>Name </b>
            </label>
            {update ? (
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue={data.name}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                disabled={!update}
              />
            ) : (
              <p className="ms-3"> {data.name}</p>
            )}
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label>
                <b>PanCard Number </b>
              </label>
              {update ? (
                <input
                  type="text"
                  className="form-control"
                  id="pancard"
                  defaultValue={data.pan}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      pan: e.target.value,
                    }))
                  }
                  disabled={!update}
                />
              ) : (
                <p className="ms-3"> {data.pan}</p>
              )}
            </div>
            <div className="col-6 form-group mb-3">
              <label>
                <b>Aadhaar Number</b>
              </label>
              {update ? (
                <input
                  type="text"
                  className="form-control"
                  id="aadhaar"
                  defaultValue={data.aadhaarNumber}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      aadhaarNumber: e.target.value,
                    }))
                  }
                  disabled={!update}
                />
              ) : (
                <p className="ms-3"> {data.aadhaarNumber}</p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-6 form-group mb-3">
              <label>
                <IoCallSharp className="mb-1" /> <b>Mobile Number </b>
              </label>
              {update ? (
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  defaultValue={data.mobileNumber}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      mobileNumber: e.target.value,
                    }))
                  }
                  disabled={!update}
                />
              ) : (
                <p className="ms-3"> {data.mobileNumber}</p>
              )}
            </div>
            <div className="col-6 form-group mb-3">
              <label>
                <IoMail className="mb-1" /> <b> Email </b>
              </label>
              {update ? (
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  defaultValue={data.email}
                  onChange={(e) =>
                    setData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                  disabled={!update}
                />
              ) : (
                <p className="ms-3"> {data.email}</p>
              )}
            </div>
          </div>
          <div className="col-11 form-group mb-3">
            <label>
              <IoHome className="mb-1" /> <b> Permanent Address </b>{" "}
            </label>
            {update ? (
              <input
                type="text"
                className="form-control"
                id="permanentAddress"
                defaultValue={data.permanentAddress}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    permanentAddress: e.target.value,
                  }))
                }
                disabled={!update}
              />
            ) : (
              <p className="ms-3"> {data.permanentAddress}</p>
            )}
          </div>
          <div className="col-11 form-group mb-3">
            <label>
              <IoHome className="mb-1" /> <b> Temporary Address </b>{" "}
            </label>
            {update ? (
              <input
                type="text"
                className="form-control"
                id="temporaryAddress"
                defaultValue={data.temporaryAddress}
                onChange={(e) =>
                  setData((prevState) => ({
                    ...prevState,
                    temporaryAddress: e.target.value,
                  }))
                }
                disabled={!update}
              />
            ) : (
              <p className="ms-3"> {data.temporaryAddress}</p>
            )}
          </div>
          <br />
          {/* <p><span style={{ color: 'red' }}>{login.error}</span></p> */}
          {update && (
            <button
              className="btn btn-primary float-end"
              onClick={updateProfile}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
