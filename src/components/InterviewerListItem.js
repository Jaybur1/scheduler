import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";
//@param id => number
//@param name => string
//@param avatar => url
//@param selected => boolean
//@param setInterviewer => function()

const InterviewerListItem = ({
  name,
  avatar,
  selected,
  onChange
}) => {

  const interviewerClass = classnames("interviewers__item",{"interviewers__item--selected":selected})


  return (
  <li className={interviewerClass} onClick={onChange}>
    <img className={`${interviewerClass}-image`} src={avatar} alt={name}/>
    {selected && name}
  </li>
  );
};

export default InterviewerListItem;
