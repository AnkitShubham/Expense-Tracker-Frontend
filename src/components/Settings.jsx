import { useEffect, useState } from "react";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  DocumentDownload,
  ProfileCircle,
  Trash,
  Category,
} from "iconsax-react";
import ConfirmationModal from "./ConfirmationModal";
import toast from "react-hot-toast";
import categoryService from "../api/categoryService";

const Settings = () => {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Fetch categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategories();
        if (response.status === 200) {
          setCategories(response.data);
        } else if (response.status === 404) {
          toast.error("No categories found.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while fetching categories.");
      }
    };
    fetchCategories();
  }, []);

  // Handle Modal
  const handleOpenModal = (message, onConfirm) => {
    setModalMessage(message);
    setOnConfirmAction(() => onConfirm);
    onOpen(); // Open modal
  };

  const handleConfirm = () => {
    if (onConfirmAction) {
      onConfirmAction();
    }
    onOpenChange(false); // Close modal after confirming
  };

  // Add Category
  const handleAddCategory = async () => {
    if (!newCategory) {
      toast.error("Please fill category name");
      return;
    }

    try {
      const response = await categoryService.addCategory({
        userId: localStorage.getItem("userId"),
        name: newCategory,
      });
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        setNewCategory("");
        toast.success("Category added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the category.");
    }
  };

  // Delete Category
  const handleDeleteCategory = (categoryId) => {
    handleOpenModal(
      `Are you sure you want to delete this category?`,
      async () => {
        try {
          const response = await categoryService.deleteCategory(categoryId);
          if (response.status === 200) {
            setCategories(
              categories.filter((category) => category.id !== categoryId)
            );
            toast.success("Category deleted successfully!");
          } else if (response.status === 404) {
            toast.error("Category not found.");
          }
        } catch (error) {
          console.error(error);
          toast.error("An error occurred while deleting the category.");
        }
      }
    );
  };

  // Delete All Data
  const handleDeleteAllData = () => {
    handleOpenModal("Are you sure you want to delete all data?", () => {
      // Add your logic here for deleting all data
      toast.success("All data deleted successfully!");
    });
  };

  return (
    <div className="font-clashDisplay p-6 max-w-3xl mx-auto">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        message={modalMessage}
        onConfirm={handleConfirm}
        onCancel={() => onOpenChange(false)} // Optional onCancel
      />

      {/* Theme Switcher */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Theme</h3>
        <ThemeSwitcher />
      </div>

      {/* Change Name Section */}
      <div className="p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <ProfileCircle size={24} className="mr-2" variant="Broken" /> Change
          Name
        </h3>
        <Input
          clearable
          bordered
          placeholder="Enter your new name"
          className="mb-4 w-full"
        />
        <Button auto flat color="primary" className="w-full">
          Save Name
        </Button>
      </div>

      {/* Manage Categories */}
      <div className="p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Category size={24} className="mr-2" variant="Broken" /> Manage
          Categories
        </h3>
        <Input
          clearable
          bordered
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          className="mb-4 w-full"
        />
        <Button
          auto
          flat
          color="primary"
          className="w-full mb-4"
          onPress={handleAddCategory}
        >
          Add Category
        </Button>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center mb-2"
            >
              <Input value={category.name} readOnly className="w-2/3" />
              <Button
                auto
                flat
                color="error"
                onPress={() => handleDeleteCategory(category.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Download All Data */}
      <div className="p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <DocumentDownload size={24} className="mr-2" variant="Broken" />{" "}
          Download All Data
        </h3>
        <Button auto flat color="secondary" className="w-full">
          Download as Excel
        </Button>
      </div>

      {/* Delete All Data */}
      <div className="p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 flex items-center text-red-500">
          <Trash size={24} className="mr-2" variant="Broken" /> Delete All Data
        </h3>
        <Button
          auto
          flat
          color="danger"
          className="w-full"
          onPress={handleDeleteAllData}
        >
          Delete Data
        </Button>
      </div>
    </div>
  );
};

export default Settings;
