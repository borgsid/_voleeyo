import NavMenu from "./NavMenu"
import UserCards from './UserCards';
import './UserCards.css';
const Home = () => {

  return (
    <div className="page">
     <NavMenu/>
      <div className="content">
        <h2>Hi Demo User!</h2>
        <h3>See where your frieds are volunteering</h3>

        <UserCards/>
      </div>
    </div>
  );
};

export default Home;
