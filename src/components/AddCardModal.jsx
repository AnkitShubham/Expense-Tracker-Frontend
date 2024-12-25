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

const AddCardModal = ({ isOpen, onOpenChange, onCardAdded }) => {
  const [cardDetails, setCardDetails] = useState({
    userId: localStorage.getItem("userId"),
    cardName: "",
    cardNumber: "",
    validUpto: "",
    cardType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = async () => {
    try {
      const response = await cardService.addCard(cardDetails);
      if (response.status === 201) {
        toast.success("Card added successfully!");
        onCardAdded(response.data); // Update the parent state
        onOpenChange(false);
      }
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("An error occurred while adding the card.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const { isDark } = useTheme();

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
            <ModalHeader className="flex flex-col gap-1 tracking-wide">
              Add New Card
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                name="cardName"
                label="Card Name"
                placeholder="Enter card name"
                value={cardDetails.cardName}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                type="number"
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
                placeholder="Enter card validity"
                value={cardDetails.validUpto}
                onChange={handleInputChange}
                fullWidth
              />
              <Input
                type="text"
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
              <Button color="primary" onPress={handleAddCard}>
                Add Card
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <Toaster />
    </Modal>
  );
};

export default AddCardModal;
