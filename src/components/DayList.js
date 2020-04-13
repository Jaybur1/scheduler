import React from "react";
import DayListItem from "components/DayListItem";
//@param days => array {id: name: spots:}
//@param day => string
//@param setDay => function(nameOfday)

const DayList = ({ days, day, setDay }) => {
  return (
    <ul>
      {days.map(e => (
        <DayListItem
          key={e.id}
          name={e.name}
          spots={e.spots}
          setDay={setDay}
          selected={e.name === day}
        />
      ))}
    </ul>
  );
};

export default DayList;
