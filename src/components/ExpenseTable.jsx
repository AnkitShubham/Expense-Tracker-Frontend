import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { Add, ArrowDown2, Edit, SearchNormal1, Trash } from "iconsax-react";
import { useTheme } from "../contexts/themeContext";
import AddExpenseModal from "./AddExpenseModal";
import EditExpenseModal from "./EditExpenseModal";
import expenseService from "../api/expenseService";
import toast from "react-hot-toast";

const columns = [
  { uid: "expenseDate", name: "Date", sortable: true },
  { uid: "category", name: "Category", sortable: true },
  { uid: "paymentMethod", name: "Payment Method", sortable: true },
  { uid: "amount", name: "Amount", sortable: true },
  { uid: "description", name: "Description", sortable: false },
  { uid: "actions", name: "Actions", sortable: false },
];

const categoryColorMap = {
  Food: "success",
  Travel: "warning",
  Entertainment: "danger",
};

const categories = ["All", "Food", "Travel", "Entertainment"];

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "expenseDate",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refresh, setRefresh] = useState(false);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const [selectedExpense, setSelectedExpense] = useState([]);

  const { isDark } = useTheme();

  const componentRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // Fetch expenses
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await expenseService.getExpenses();
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
    fetchExpenses();
  }, [refresh]);

  const handleEditExpense = (expense) => {
    console.log(expense);
    setSelectedExpense(expense);
    console.log(selectedExpense);
    onEditOpen();
  };

  const handleDeleteExpense = useCallback(
    (expenseId) => async () => {
      try {
        const confirmation = window.confirm(
          "Are you sure you want to delete this expense?"
        );
        if (!confirmation) return;
        // Call the deleteExpense method from expenseService
        const response = await expenseService.deleteExpense(expenseId);

        if (response.status === 200) {
          toast.success("Expense deleted successfully");
          componentRefresh();
        } else {
          alert("Failed to delete the expense.");
        }
      } catch (error) {
        console.error("Error occurred while deleting the expense:", error);
        alert("An error occurred. Please try again.");
      }
    },
    []
  );

  // Filter, sort, and paginate expenses
  const processedExpenses = useMemo(() => {
    let filteredExpenses = expenses;

    // Filter by search value
    if (filterValue) {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All") {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.category === selectedCategory
      );
    }

    // Sort
    filteredExpenses.sort((a, b) => {
      const valueA = a[sortDescriptor.column];
      const valueB = b[sortDescriptor.column];
      if (valueA < valueB)
        return sortDescriptor.direction === "ascending" ? -1 : 1;
      if (valueA > valueB)
        return sortDescriptor.direction === "ascending" ? 1 : -1;
      return 0;
    });

    // Paginate
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredExpenses.slice(startIndex, endIndex);
  }, [
    expenses,
    filterValue,
    selectedCategory,
    sortDescriptor,
    page,
    rowsPerPage,
  ]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 font-clashDisplay">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by description..."
            startContent={<SearchNormal1 variant="Broken" />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />
          <Dropdown
            className={isDark ? "dark font-clashDisplay" : "font-clashDisplay"}
            style={isDark ? { color: "white" } : {}}
          >
            <DropdownTrigger>
              <Button endContent={<ArrowDown2 size={20} variant="Broken" />}>
                {selectedCategory}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Category Filter"
              onAction={setSelectedCategory}
              selectionMode="single"
              selectedKeys={[selectedCategory]}
            >
              {categories.map((category) => (
                <DropdownItem key={category}>{category}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            color="primary"
            endContent={<Add variant="Broken" />}
            onPress={onAddOpen}
          >
            Add New
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              value={rowsPerPage}
            >
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="21">21</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    selectedCategory,
    rowsPerPage,
    setSelectedCategory,
    onAddOpen,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center font-clashDisplay">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={Math.ceil(expenses.length / rowsPerPage)}
          onChange={setPage}
        />
      </div>
    );
  }, [page, rowsPerPage, expenses]);

  return (
    <>
      <Table
        aria-label="Expense table with custom cells, pagination, and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[480px] font-clashDisplay",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No expenses found"} items={processedExpenses}>
          {(expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.expenseDate}</TableCell>
              <TableCell>
                <Chip color={categoryColorMap[expense.category]}>
                  {expense.category}
                </Chip>
              </TableCell>
              <TableCell>{expense.paymentMethod}</TableCell>
              <TableCell>{expense.amount}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>
                <div className="flex flex-row justify-center items-center gap-4">
                  <Button
                    isIconOnly
                    variant="light"
                    color="warning"
                    onPress={() => handleEditExpense(expense)}
                  >
                    <Edit size="20" variant="Broken" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={handleDeleteExpense(expense.id)}
                  >
                    <Trash size="20" variant="Broken" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddExpenseModal
        isOpen={isAddOpen}
        onOpenChange={onAddClose}
        onExpenseAdd={componentRefresh}
      />
      <EditExpenseModal
        isOpen={isEditOpen}
        onOpenChange={onEditClose}
        initialExpenseDetails={selectedExpense}
        onExpenseEdit={componentRefresh}
      />
    </>
  );
}
