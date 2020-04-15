import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import { EMPTY, SHOW, CREATE } from "helpers/constants";
import Form from "./Form";

const Appointment = ({time, interview, interviewers}) => {

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); 

  const handleOnAdd = () => {
    transition(CREATE);
  }

  const handleOnCancel = () => {
    back();
  }

  return (
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={handleOnAdd}/>}
    {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/>}
    {mode === CREATE && <Form interviewers={interviewers} onSave={""} onCancel={handleOnCancel}/>}
  </article>
  );
};

export default Appointment;

