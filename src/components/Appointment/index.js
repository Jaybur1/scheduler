import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import {
  EMPTY,
  SHOW,
  CREATE,
  SAVING,
  DELETING,
  CONFIRM
} from "helpers/constants";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
const Appointment = ({
  time,
  interview,
  interviewers,
  onCreate,
  onDelete,
  id
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const handleOnAdd = () => {
    transition(CREATE);
  };

  const handleOnCancel = () => {
    back();
  };

  const handleOnSave = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    onCreate(id, interview).then(res => transition(SHOW));
  };

  const handleOnDelete = () => {
    transition(CONFIRM);
  };

  const handleConfirm = () => {
    transition(DELETING);
    onDelete(id).then(res => transition(EMPTY));
  };
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={handleOnAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={handleOnDelete}
        />
      )}
      {mode === SAVING && <Status message="Saving ..." />}
      {mode === DELETING && <Status message="Deleting ..." />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to remove the appointment?"
          onConfirm={handleConfirm}
          onCancel={handleOnCancel}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={handleOnSave}
          onCancel={handleOnCancel}
        />
      )}
    </article>
  );
};

export default Appointment;
