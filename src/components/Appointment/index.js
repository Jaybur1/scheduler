import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import { EMPTY, SHOW, CREATE, SAVING} from "helpers/constants";
import Form from "./Form";
import Status from "./Status";
const Appointment = ({time, interview, interviewers, onCreate, id}) => {

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY); 

  const handleOnAdd = () => {
    transition(CREATE);
  }

  const handleOnCancel = () => {
    back();
  }

  const handleOnSave = (name, interviewer) => {
    const interview = {
      student:name,
      interviewer
    };
    
    transition(SAVING);
    onCreate(id, interview).then((res) => {
      transition(SHOW)
    })

  }

  return (
  <article className="appointment">
    <Header time={time}/>
    {mode === EMPTY && <Empty onAdd={handleOnAdd}/>}
    {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/>}
    {mode === SAVING && <Status message="Saving ..."/>}
    {mode === CREATE && <Form interviewers={interviewers} onSave={handleOnSave} onCancel={handleOnCancel}/>}
  </article>
  );
};

export default Appointment;

