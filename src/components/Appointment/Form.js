import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

//@prop interviewers => Array of objects
//@prop interviewer => Number
//@prop onSave => function
//@prop onCancel => funciton

const Form = props => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer | null);
  const [error, setError] = useState("");

  const handleOnChangeName = e => {
    // let copy = name;
    setName(e.target.value);
  };

  const handleOnChangeInterviewer = id => {
    // let copy = interviewer;
    setInterviewer(id);
  };

  const reset = () => {
    setName("");
    setInterviewer(null);
    setError("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!name) {
      setError("Student name cannot be blank");
      return;
    }

    if (!interviewer || interviewer === 0) {
      setError("Please pick an interviewer");
      return;
    }
    reset();
    props.onSave(name, interviewer);
  };

  const handleKeyPress = e => {
    if (e.which === 13 /*Enter */) {
      e.preventDefault();
    }
    setError("");
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={handleOnChangeName}
            data-testid="student-name-input"
            onKeyPress={handleKeyPress}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={handleOnChangeInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={onSubmit}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
