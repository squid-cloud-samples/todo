import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

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

type FormValues = {
  task: string;
};

type PropTypes = {
  onCreateWithAI: (data: FormValues) => Promise<void>;
};

const CreateWithAI = ({ onCreateWithAI }: PropTypes) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { handleSubmit, register, reset } = useForm<FormValues>();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    reset();
  }

  const [creating, setCreating] = useState(false);

  const onSubmit = async (data: FormValues) => {
    closeModal();
    setCreating(true);
    await onCreateWithAI(data);
    setCreating(false);
  };

  return (
    <>
      <button onClick={openModal} disabled={creating}>
        {creating ? "Creating..." : "Create With AI"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <form
          className="create-modal__content"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            Task
            <input {...register("task")} />
          </label>
          <div className="create-modal__buttons">
            <button type="submit">Add</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateWithAI;
