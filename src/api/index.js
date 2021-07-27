import Axios from "axios";

export const fetchuser_group = () =>{
    Axios.get("http://localhost:4000/api/get/user_group").then((usergroup) => {
        // setusergroup(usergroup.data);
        // console.log("test_user_group", usergroup);
      });
}