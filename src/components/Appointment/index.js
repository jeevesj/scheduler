import React from "react";

import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    });
  }

  function deleteInterview() {
    transition(CONFIRM);
  }

  function confirmDelete() {
    transition(DELETING);
  
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  }
  
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterview}
        />
      )}
      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          onSave={save} 
          onCancel={back}
        />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
        <Confirm
        message="Are you sure you would like to delete this appointment?"
        onConfirm={confirmDelete}
        onCancel={back}
        />
      )}
    </article>
  );
}
