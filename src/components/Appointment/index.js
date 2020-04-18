import React, { useEffect } from "react";
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
  CONFIRM,
  EDIT,
  SAVING_ERROR,
  DELETING_ERROR
} from "helpers/constants";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
const Appointment = ({
  time,
  interview,
  interviewers,
  onCreate,
  onDelete,
  id
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  useEffect(() => {
    if (interview && mode === EMPTY) transition(SHOW);

    if (interview === null && mode === SHOW) transition(EMPTY);
  }, [interview, transition, mode]);

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

    transition(SAVING, true);
    onCreate(id, interview).then(res => transition(res));
  };

  const handleOnDelete = () => {
    transition(CONFIRM);
  };

  const handleConfirm = () => {
    transition(DELETING, true);
    onDelete(id).then(res => transition(res));
  };

  const handleOnEdit = () => {
    transition(EDIT);
  };
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={handleOnAdd} />}
      {mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={handleOnDelete}
          onEdit={handleOnEdit}
        />
      )}
      {mode === SAVING_ERROR && (
        <Error
          message="Something went wrong while saving..."
          onClose={handleOnCancel}
        />
      )}
      {mode === DELETING_ERROR && (
        <Error
          message="Something went wrong while deleting..."
          onClose={handleOnCancel}
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
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onSave={handleOnSave}
          onCancel={handleOnCancel}
        />
      )}
    </article>
  );
};
export default Appointment;
