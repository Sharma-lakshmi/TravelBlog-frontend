import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

/* Create a component for Internal use which will be used by the Modal*/
const ModalOverlay = (props) => {
  const content = (
    /* className use Modal class name and also inject other classname where the modal is used and not restricting to the class setup*/
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        {/* for the inputs of the form */}
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        {/* for the buttons of the form */}
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  /* react frangment to use for sibling pop level */
  return (
    <React.Fragment>
      {/* if the props is show then call the onclick for cancel or close */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        {/* forward all the props that we get from outside to the Modaloverlay. It takes the props to modal and forwards to modaloverlay */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
