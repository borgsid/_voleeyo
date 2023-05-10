import React from "react";

function WorldEvents() {
  return (
    <div className="page">
          <div className="content">
        <button tyep="submit" onClick={()=>{location.href="/api/auth/login"}}>login</button>
      </div>
          </div>
  );
}

export default WorldEvents;