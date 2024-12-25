import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { CloseCircle } from "iconsax-react";
import { useTheme } from "../contexts/themeContext";
import { useEffect, useState } from "react";
import categoryService from "../api/categoryService";
import cardService from "../api/cardService";
import expenseService from "../api/expenseService";
import toast from "react-hot-toast";

const EditExpenseModal = ({
  isOpen,
  onOpenChange,
  initialExpenseDetails,
  onExpenseEdit,
}) => {
  const predefinedCategories = [
    { id: -1, name: "Travel" },
    { id: -2, name: "Entertainment" },
    { id: -3, name: "Bill" },
  ];

  const predefinedPaymentMethods = [
    { id: -1, cardName: "Cash" },
    { id: -2, cardName: "UPI" },
  ];

  const [categories, setCategories] = useState([]);
  const [cards, setCards] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState(initialExpenseDetails);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCards = async () => {
      try {
        const response = await cardService.getCards();
        setCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    fetchCards();
  }, []);

  useEffect(() => {
    setExpenseDetails(initialExpenseDetails);
  }, [initialExpenseDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const { isDark } = useTheme();

  const handleEditExpense = async () => {
    if (
      expenseDetails.amount === 0 ||
      !expenseDetails.description ||
      !expenseDetails.category ||
      !expenseDetails.paymentMethod
    ) {
      toast.error("Please fill in all the details");
      return;
    }
    try {
      console.log(expenseDetails);
      const response = await expenseService.updateExpense(
        expenseDetails.id,
        expenseDetails
      );
      if (response.status === 200) {
        toast.success("Expense updated successfully");
        onExpenseEdit();
      }
      onOpenChange(false);
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("An error occurred while updating the expense.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
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
                Edit Expense
              </ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Amount"
                  placeholder="Enter amount"
                  name="amount"
                  value={expenseDetails.amount}
                  onChange={handleInputChange}
                  fullWidth
                />
                <Input
                  type="text"
                  label="Description"
                  placeholder="Enter a description"
                  name="description"
                  value={expenseDetails.description}
                  onChange={handleInputChange}
                  fullWidth
                />
                <Dropdown
                  className={isDark ? "dark" : ""}
                  style={isDark ? { color: "white" } : {}}
                >
                  <DropdownTrigger>
                    <Button className="capitalize" variant="bordered">
                      {expenseDetails.category || "Select a category"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(key) => {
                      const selectedKey = Array.from(key)[0];
                      const selectedCategory =
                        predefinedCategories.find(
                          (category) => category.id == selectedKey
                        ) ||
                        categories.find(
                          (category) => category.id == selectedKey
                        );
                      setExpenseDetails((prev) => ({
                        ...prev,
                        category: selectedCategory?.name || "",
                      }));
                    }}
                  >
                    {predefinedCategories.map((category) => (
                      <DropdownItem key={category.id} value={category.name}>
                        {category.name}
                      </DropdownItem>
                    ))}
                    {categories.map((category) => (
                      <DropdownItem key={category.id} value={category.name}>
                        {category.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  className={isDark ? "dark" : ""}
                  style={isDark ? { color: "white" } : {}}
                >
                  <DropdownTrigger>
                    <Button className="capitalize" variant="bordered">
                      {expenseDetails.paymentMethod ||
                        "Select a payment method"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(key) => {
                      const selectedKey = Array.from(key)[0];
                      const selectedMethod =
                        predefinedPaymentMethods.find(
                          (method) => method.id == selectedKey
                        ) || cards.find((card) => card.id == selectedKey);
                      setExpenseDetails((prev) => ({
                        ...prev,
                        paymentMethod: selectedMethod?.cardName || "",
                      }));
                    }}
                  >
                    {predefinedPaymentMethods.map((method) => (
                      <DropdownItem key={method.id} value={method.cardName}>
                        {method.cardName}
                      </DropdownItem>
                    ))}
                    {cards.map((method) => (
                      <DropdownItem key={method.id} value={method.cardName}>
                        {method.cardName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleEditExpense}>
                  Update Expense
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditExpenseModal;
