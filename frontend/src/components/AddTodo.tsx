import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import "./AddTodo.scss";
import { Todo } from "../../../common/types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

type FormValues = Pick<Todo, "title" | "content">;

type PropTypes = {
  onCreate: (data: FormValues) => void;
};

const AddTodo = ({ onCreate }: PropTypes) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm<FormValues>();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    reset();
  }

  return (
    <div>
      <button onClick={openModal}>Add Todo</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form
          className="create-modal__content"
          onSubmit={handleSubmit(async (data) => {
            await onCreate(data);
            closeModal();
          })}
        >
          <label>
            Title
            <input {...register("title")} />
          </label>
          <label>
            Content
            <textarea rows={5} {...register("content")} />
          </label>
          <div className="create-modal__buttons">
            <button type="submit">Add</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;
