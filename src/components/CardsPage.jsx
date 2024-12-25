import { useState, useEffect } from "react";
import Cards from "./Cards";
import { Button, Spinner } from "@nextui-org/react";
import { Add } from "iconsax-react";
import { useDisclosure } from "@nextui-org/react";
import AddCardModal from "./AddCardModal";
import cardService from "../api/cardService";

const CardsPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling
  const [refresh, setRefresh] = useState(false); // Trigger for re-fetching cards
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Fetch cards from API
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const cardData = await cardService.getCards();
        setCards(cardData.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Failed to load cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [refresh]);

  const handleDelete = () => {
    setRefresh((prev) => !prev);
  };

  const handleAddCard = () => {
    setRefresh((prev) => !prev);
  };

  const handleCardUpdate = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4">
      {loading ? (
        <div className="col-span-full flex justify-center items-center">
          <Spinner size="lg" color="primary" />
        </div>
      ) : error ? (
        <div className="col-span-full flex justify-center items-center">
          <p color="error">{error}</p>
        </div>
      ) : cards.length === 0 ? (
        <div className="col-span-full flex justify-center items-center">
          <p>No cards available. Please add a card.</p>
        </div>
      ) : (
        cards.map((card) => (
          <Cards
            key={card.id}
            cardDetails={card}
            onEdit={() => handleCardUpdate()}
            onDelete={() => handleDelete()}
          />
        ))
      )}

      {/* Floating Action Button */}
      <Button
        auto
        isIconOnly
        size="lg"
        className="fixed bottom-8 right-8 shadow-lg"
        color="primary"
        onPress={onOpen}
      >
        <Add size="32" variant="Broken" />
      </Button>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onCardAdded={handleAddCard}
      />
    </div>
  );
};

export default CardsPage;
