// import MyCards from "../components/MyCards";
import { useEffect } from "react";
import NavMenu from "../components/NavMenu";
// import UserCards from "../components/UserCards";
const Dashboard = () => {
    useEffect(() => {
        const loginCode = localStorage.getItem("voleeyo_login");
        if (!loginCode) {
          location.href="/";
        }
      });
    return (
        <div className="page">
            <NavMenu />
            <div className="content events">
                <h1>Dashboard</h1>
                <h3>Your events</h3>
                {/* <MyCards /> */}
            </div>
            <div className="content friends">
                <h1>Your friends</h1>
                {/* <UserCards /> */}
            </div>
        </div>
    );
}
export default Dashboard;