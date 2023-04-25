import { useNavigate} from "react-router-dom";

const NavMenu=()=>{

    var navigate= useNavigate();
    return (
        <div className="sidebar">
        <center>
          <h2>Voleeyo</h2>
          <div className="user-picture"></div>
          {/* <div className="logo">Current Event</div> */}
        </center>
        <div className="menu">
          <div onClick={() => navigate("/dashboard")}>
            <i className="fas fa-tachometer-alt"></i>
            <span className="nav-menu-side">Volunteerboard</span>
          </div>
          <div onClick={() => navigate("/notifications")}>
            <i className="fas fa-bell"></i>
            <span className="nav-menu-side">
              Notifications
            </span>
          </div>
          {/* <div onClick={() => navigate("/")}>
            <i className="fas fa-user"></i>
            <span className="nav-menu-side">Personal Profile</span>
          </div> */}
          <div onClick={() => navigate("/worldevents")}>
            <i className="fas fa-globe"></i> 
            <span className="nav-menu-side">World Events</span>
          </div>
          <div onClick={() => location.href="/"}>
            <i className="fas fa-sign-out-alt"></i>
             <span className="nav-menu-side">Logout</span>
          </div>
        </div>
      </div>
    );
}
export default NavMenu;