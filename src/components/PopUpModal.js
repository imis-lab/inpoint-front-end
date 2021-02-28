import React, { useEffect, useState } from "react";
import Modal from "react-modal";

// Accessibility when using Modal
// Warning: react-modal: App element is not defined.
// Please use`Modal.setAppElement(el)` or set`appElement={el}`.
// This is needed so screen readers don't see main content when modal is opened.
// It is not recommended, but you can opt - out by setting`ariaHideApp={false}`.
Modal.setAppElement(document.querySelector("#root"));

const PopUpModal = ({ modalInfo, closeModal, node }) => {

  const handleChange = (e) => {
    if (e.target.name == "text_edit") {
      node.text = e.target.value;
    } else {
      node.label = e.target.value;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal(node);
  };
  return (
    <Modal
      isOpen={modalInfo}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      contentLabel="Pop Up"
      closeTimeoutMS={200}
      className="modal"
    >
      <h3>Edit Solution</h3>
      <form onSubmit={handleSubmit}>
        <div>Author: {node.author}</div>
        <div>
          Label:
          <input
            type="text"
            placeholder={node.label}
            name="label_edit"
            size="30"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          Text:
          <input
            type="text"
            placeholder={node.text}
            name="text_edit"
            size="30"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" value="Save" />
      </form>
    </Modal>
  );
};

export default PopUpModal;
