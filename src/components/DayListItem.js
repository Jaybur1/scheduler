import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

const DayListItem = ({ name, spots, selected, setDay }) => {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const handleClick = () => {
     setDay(name);
  };

  const formatSpots = () => spots > 0 ? (spots === 1 ? `${spots} spot remaining` : `${spots} spots remaining`) : "no spots remaining";
  return (
    <li onClick={handleClick} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
