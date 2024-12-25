import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useTheme } from "../contexts/themeContext";

const ConfirmationModal = ({
  isOpen,
  onOpenChange,
  message,
  onConfirm,
  onCancel,
}) => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="font-clashDisplay"
      >
        <ModalContent
          className={isDark ? "dark" : ""}
          style={isDark ? { color: "white" } : {}}
        >
          {(onClose) => (
            <div>
              <ModalHeader className="flex flex-col gap-1">
                Confirmation
              </ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onCancel || onClose}
                >
                  Cancel
                </Button>
                <Button color="primary" onPress={onConfirm}>
                  Confirm
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
