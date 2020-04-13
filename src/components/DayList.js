import React from "react";
import DayListItem from "components/DayListItem";
//@param days => array {id: name: spots:}
//@param day => string
//@param setDay => function(nameOfday)

const DayList = ({ days, value, onChange }) => {
  return (
    <ul>
      {days.map(e => (
        <DayListItem
          key={e.id}
          value={e.name}
          spots={e.spots}
          onChange={event => onChange(e.name)}
          selected={e.name === value}
        />
      ))}
    </ul>
  );
};

export default DayList;
