import React, { FC, useEffect, useState, memo } from "react";
import { Modal } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { ToggleButton } from "react-bootstrap";
type Props = {
  buttonText?: string;
  cancelText?: string;
  confirmText?: string;
  onConfirm: (e: string) => void;
  onClose: () => void;
  showCancelButton?: boolean;
  title: string;
  visible: boolean;
  isDanger?: boolean;
};

interface ISelect {
  value: string;
  label: string;
}
const radios: ISelect[] = [
  { value: "1", label: "Export trang hiện tại" },
  { value: "2", label: "Export toàn bộ kết quả" },
];

const ConfirmModal: React.FC<Props> = ({
  isDanger,
  visible,
  title,
  showCancelButton,
  onConfirm,
  onClose,
  confirmText,
  cancelText,
  buttonText,
}) => {
  const [isOpened, setIsOpened] = useState(visible);
  const [radioValue, setRadioValue] = useState("1");
  useEffect(() => {
    setIsOpened(visible);
  }, [visible]);

  const handleClose = () => {
    setIsOpened(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };
  const handleConfirm = (event: any) => {
    event.stopPropagation();
    setIsOpened(false);
    onConfirm(radioValue);
  };
  const cancelButton = showCancelButton ? (
    <button
      className="btn btn-icon btn-active-light-primary me-10 px-10"
      onClick={onClose}
    >
      {cancelText}
    </button>
  ) : null;
  const modal = (
    <Modal
      show={isOpened}
      onHide={handleClose}
      className="modal-sticky modal-sticky-lg modal-sticky-bottom-right"
      dialogClassName="modal-dialog modal-dialog-centered"
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="mb-5">
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-primary border me-3"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.label}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`btn ${
            isDanger ? "btn-danger" : " btn-primary "
          } me-4 px-6`}
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
        {cancelButton}
      </Modal.Footer>
    </Modal>
  );

  return <>{modal}</>;
};

ConfirmModal.defaultProps = {
  cancelText: "Cancel",
  confirmText: "Confirm",
  showCancelButton: true,
  isDanger: false,
};

export default memo(ConfirmModal);
