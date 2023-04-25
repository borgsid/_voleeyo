import React from 'react';
import './UserCards.css';

const UserCards = () => {
  const users = [
    {
      name: 'John',
      surname: 'Doe',
      age: 25,
      event: 'Charity Run',
      city: 'New York',
      year: 2022,
      role: 'Volunteer'
    },
    {
      name: 'Jane',
      surname: 'Smith',
      age: 35,
      event: 'Food Drive',
      city: 'Los Angeles',
      year: 2022,
      role: 'Organizer'
    },
    {
      name: 'Mark',
      surname: 'Johnson',
      age: 30,
      event: 'Blood Drive',
      city: 'Chicago',
      year: 2022,
      role: 'Volunteer'
    },
    {
      name: 'Samantha',
      surname: 'Lee',
      age: 28,
      event: 'Toy Drive',
      city: 'Houston',
      year: 2022,
      role: 'Organizer'
    },
    {
      name: 'David',
      surname: 'Kim',
      age: 27,
      event: 'Beach Cleanup',
      city: 'Miami',
      year: 2022,
      role: 'Volunteer'
    },
    {
      name: 'Karen',
      surname: 'Davis',
      age: 40,
      event: 'Charity Auction',
      city: 'San Francisco',
      year: 2022,
      role: 'Organizer'
    }
  ];

  const renderCards = () => {
    return users.map((user, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{user.name} {user.surname}</h5>
            <p className="card-text">Age: {user.age}</p>
            <p className="card-text">Event: {user.event}</p>
            <p className="card-text">City: {user.city}</p>
            <p className="card-text">Year: {user.year}</p>
            <p className="card-text">Role: {user.role}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        {renderCards()}
      </div>
    </div>
  );
};

export default UserCards;
