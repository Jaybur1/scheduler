import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


//@prop interviewers => Array of objects
//@prop interviewer => Number
//@prop onSave => function
//@prop onCancel => funciton

const Form = (props) => {
  const [name , setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer | null);

  const handleOnChangeName = (e) => {
    let copy = name;
    copy = e.target.value;
    setName(copy)
  }

  const handleOnChangeInterviewer = (id) => {
    let copy = interviewer;
    copy = id;
    setInterviewer(copy)
  }

  const reset = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    reset();
    props.onSave();
  }

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
          />
        </form>
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
