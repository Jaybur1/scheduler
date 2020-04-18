import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

const DayListItem = ({ value, spots, selected, onChange }) => {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = () =>
    spots > 0
      ? spots === 1
        ? `${spots} spot remaining`
        : `${spots} spots remaining`
      : "no spots remaining";

  return (
    <li onClick={onChange} className={dayClass}>
      <h2 className="text--regular">{value}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
