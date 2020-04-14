import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
//@param interviewers => array {id: name: avatar:}
//@param interviewer => number id:
//@param setInterviewer => function(interviewer:id)

const InterviewerList = ({ interviewers, value, onChange }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(e => (
          <InterviewerListItem
            key={e.id}
            name={e.name}
            avatar={e.avatar}
            selected={value === e.id}
            onChange={event => {onChange(e.id)}}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;
