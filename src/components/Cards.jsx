import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Eye, EyeSlash, Copy, Edit, CardRemove1 } from "iconsax-react";
import EditCardModal from "./EditCardModal";
import { toast, Toaster } from "react-hot-toast";
import cardService from "../api/cardService";

const Cards = ({ cardDetails, onEdit, onDelete }) => {
  const [isCardNumberVisible, setIsCardNumberVisible] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const maskedCardNumber = "****-****-****-" + cardDetails.cardNumber.slice(-4);

  const handleCopy = () => {
    navigator.clipboard.writeText(cardDetails.cardNumber);
    alert("Card number copied to clipboard!");
  };

  const toggleCardNumberVisibility = () => {
    setIsCardNumberVisible((prev) => !prev);
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await cardService.deleteCard(cardDetails.id);
      if (response.status === 200) {
        toast.success("Card deleted successfully!");
        // onDelete(cardDetails.id);
        onDelete();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.warn("Card not found. Please try again later.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full font-clashDisplay">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 w-full"
        shadow="sm"
      >
        <CardHeader className="flex flex-row justify-between">
          <p>{cardDetails.cardName}</p>
          <div className="flex flex-row justify-between gap-4">
            <Button isIconOnly onPress={handleEdit}>
              <Edit size={24} color="#007BFF" variant="Broken" />
            </Button>
            <Button isIconOnly onPress={handleDelete}>
              <CardRemove1
                size={24}
                weight="fill"
                color="#d11a2a"
                variant="Broken"
              />
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-row justify-between">
          <p>
            {isCardNumberVisible ? cardDetails.cardNumber : maskedCardNumber}
          </p>
          <div className="flex flex-row justify-between gap-4">
            <Button isIconOnly onPress={handleCopy}>
              <Copy size={24} color="#007BFF" variant="Broken" />
            </Button>
            <Button isIconOnly onPress={toggleCardNumberVisibility}>
              {isCardNumberVisible ? (
                <EyeSlash size={24} color="#d11a2a" variant="Broken" />
              ) : (
                <Eye size={24} color="#d11a2a" variant="Broken" />
              )}
            </Button>
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-between">
          <p>{cardDetails.validUpto}</p>
          <p>{cardDetails.cardType}</p>
        </CardFooter>
      </Card>

      {/* Edit Card Modal */}
      <EditCardModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialCardDetails={cardDetails}
        onEdit={onEdit}
      />
      <Toaster />
    </div>
  );
};

export default Cards;
