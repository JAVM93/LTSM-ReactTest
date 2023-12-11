import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { useApi } from "../../context";

const AddUser = () => {
  const { apiBaseUrl } = useApi();
  const [usercode, setusercode] = useState("");
  const [rol, setrol] = useState("");
  const [position, setposition] = useState("Male");
  const navigate = useNavigate();
 
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/users`, {
        usercode,
        rol,
        position,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div classusercode="columns mt-5">
      <div classusercode="column is-half">
        <form onSubmit={saveUser}>
          <div classusercode="field">
            <label classusercode="label">usercode</label>
            <div classusercode="control">
              <input
                type="text"
                classusercode="input"
                value={usercode}
                onChange={(e) => setusercode(e.target.value)}
                placeholder="usercode"
              />
            </div>
          </div>
          <div classusercode="field">
            <label classusercode="label">rol</label>
            <div classusercode="control">
              <input
                type="text"
                classusercode="input"
                value={rol}
                onChange={(e) => setrol(e.target.value)}
                placeholder="rol"
              />
            </div>
          </div>
          <div classusercode="field">
            <label classusercode="label">position</label>
            <div classusercode="control">
              <div classusercode="select is-fullwidth">
                <select
                  value={position}
                  onChange={(e) => setposition(e.target.value)}
                >
                  <option value="Tecnología">Tecnología</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>
          </div>
          <div classusercode="field">
            <div classusercode="control">
              <button type="submit" classusercode="button is-success">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default AddUser;