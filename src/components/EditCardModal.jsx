import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { useTheme } from "../contexts/themeContext";
import { CloseCircle } from "iconsax-react";
import { toast, Toaster } from "react-hot-toast";
import cardService from "../api/cardService";

const EditCardModal = ({
  isOpen,
  onOpenChange,
  initialCardDetails,
  onEdit,
}) => {
  const { isDark } = useTheme();

  const [cardDetails, setCardDetails] = useState(initialCardDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log(cardDetails);
      const response = await cardService.updateCard(cardDetails.id, cardDetails);
      if (response.status === 200) {
        toast.success("Card updated successfully!");
        onEdit();
        onOpenChange(false);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.warn("Card not found!");
      } else {
        toast.error("An error occurred while updating the card.");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      className="font-clashDisplay"
      closeButton={<CloseCircle size={44} variant="Broken" />}
    >
      <ModalContent
        className={isDark ? "dark" : ""}
        style={isDark ? { color: "white" } : {}}
      >
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Card Details
            </ModalHeader>
            <ModalBody>
              <Input
                name="cardName"
                label="Card Name"
                placeholder="Enter card name"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                name="cardNumber"
                label="Card Number"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                name="validUpto"
                label="Valid Upto"
                type="month"
                value={cardDetails.validUpto}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                name="cardType"
                label="Card Type"
                placeholder="Enter card type"
                value={cardDetails.cardType}
                onChange={handleInputChange}
                fullWidth
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSaveChanges}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <Toaster />
    </Modal>
  );
};

export default EditCardModal;
