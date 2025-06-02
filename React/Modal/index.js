import { useState } from "react";
import { Modal } from "./Modal";
import "./styles.css";

export default function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <button onClick={handleOpen}>Open</button>
      <Modal open={open} onClose={handleOpen}>
        <div
          style={{
            minWidth: "400px",
            maxWidth: "90%",
            padding: "10px",
            background: "#fefefe",
            borderRadius: "10px",
          }}
        >
          <h4>Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, fugit
            adipisci blanditiis saepe eius quod quos illum consequuntur quo,
            assumenda est perspiciatis tenetur distinctio esse cum doloremque
            natus hic repellendus.
          </p>
        </div>
      </Modal>
    </div>
  );
}
