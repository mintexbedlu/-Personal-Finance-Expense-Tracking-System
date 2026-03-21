import React, { useEffect, useState } from "react";
import { modalStyles } from "../assets/dummyStyles";
import { X } from "lucide-react";

const AddTransactionModal = ({
  showModal,
  setShowModal,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  type = "both",
  title = "Add New Transaction",
  buttonText = "Add Transaction",
  categories = [
    "Food",
    "Housing",
    "Transport",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Salary",
    "Freelance",
    "Investments",
    "Bonus",
    "Other",
  ],
  color = "teal",
}) => {
  if (!showModal) return null;

  // Get current date in YYYY-MM-DD format
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentDate = today.toISOString().split("T")[0];
  const minDate = `${currentYear}-01-01`;

  const colorClass = modalStyles.colorClasses[color];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Valid categories matching backend schema
  const INCOME_CATEGORIES = ["Salary", "Freelance", "Investments"];
  const EXPENSE_CATEGORIES = [
    "Food",
    "Housing",
    "Transport",
    "Entertainment",
    "Utilities",
  ];

  const currentCategories =
    newTransaction.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  useEffect(() => {
    if (!currentCategories.includes(newTransaction.category)) {
      setNewTransaction((prev) => ({
        ...prev,
        category: currentCategories[0],
      }));
    }
  }, [newTransaction.type]);

  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
        <div className={modalStyles.modalHeader}>
          <h3 className={modalStyles.modalTitle}>{title}</h3>

          <button
            onClick={() => setShowModal(false)}
            className={modalStyles.closeButton}
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            setIsSubmitting(true);
            setError("");
            try {
              await handleAddTransaction();
              setShowModal(false);
            } catch (err) {
              setError(err.response?.data?.message || err.message || "Error adding transaction");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <div className={modalStyles.form}>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <label className={modalStyles.label}>Description</label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                placeholder={
                  type === "both" ? "Salary,Funds,etc" : "Groceries,Rent,etc"
                }
                required
              />
            </div>

            <div>
              <label className={modalStyles.label}>Amount</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                placeholder="0.00"
                required
              />
            </div>

            {type === "both" && (
              <div>
                <label className={modalStyles.label}>Type</label>
                <div className={modalStyles.typeButtonContainer}>
                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === "income",
                      modalStyles.colorClasses.teal.typeButtonSelected,
                    )}
                    onClick={() =>
                      setNewTransaction((prev) => ({ ...prev, type: "income" }))
                    }
                  >
                    Income
                  </button>
                  <button
                    type="button"
                    className={modalStyles.typeButton(
                      newTransaction.type === "expense",
                      modalStyles.colorClasses.orange.typeButtonSelected,
                    )}
                    onClick={() =>
                      setNewTransaction((prev) => ({
                        ...prev,
                        type: "expense",
                      }))
                    }
                  >
                    Expense
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className={modalStyles.label}>Category</label>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
              >
                {currentCategories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={modalStyles.label}>Date</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className={modalStyles.input(colorClass.ring)}
                min={minDate}
                max={currentDate}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${modalStyles.submitButton(colorClass.button)} ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Processing..." : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
