import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// --- CONFIGURATION ---
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";

// --- SCHEMAS (Inferred from Frontend) ---

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const IncomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Frontend maps 'title', 'description' or 'note'
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, default: "income" },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Salary",
        "Freelance",
        "Investments",
        "Bonus",
        "Gift",
        "Rental",
        "Dividends",
        "Refund",
        "Other",
      ],
    },
    description: { type: String, required: true, maxLength: 50, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const ExpenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, default: "expense" },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Housing",
        "Transport",
        "Shopping",
        "Entertainment",
        "Utilities",
        "Healthcare",
        "Education",
        "Travel",
        "Personal",
        "Insurance",
        "Debt",
        "Other",
      ],
    },
    description: { type: String, required: true, maxLength: 50, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

// --- MODELS ---
// Using mongoose.models to prevent overwrite errors if running in a context where models exist
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Income = mongoose.models.Income || mongoose.model("Income", IncomeSchema);
const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

// --- HELPER FUNCTIONS ---

const generateDate = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

// --- SEED DATA ---

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to Database");

    // 1. Clear existing data
    await User.deleteMany({});
    await Income.deleteMany({});
    await Expense.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // 2. Create a Test User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const user = await User.create({
      name: "Test User",
      email: "user@example.com",
      password: hashedPassword,
    });
    console.log(`👤 Created User: ${user.email} (Password: password123)`);

    // 3. Create Incomes
    // We create some for this month, some for last month
    const incomes = [
      {
        title: "Salary",
        amount: 5000,
        category: "Salary",
        description: "Monthly Salary",
        date: generateDate(2), // 2 days ago
      },
      {
        title: "Freelance Project",
        amount: 1200,
        category: "Freelance",
        description: "Website Design",
        date: generateDate(10),
      },
      {
        title: "Investment Return",
        amount: 300,
        category: "Investments",
        description: "Stock Dividends",
        date: generateDate(5),
      },
      {
        title: "Last Month Salary",
        amount: 5000,
        category: "Salary",
        description: "Monthly Salary",
        date: generateDate(32), // Last month
      },
    ];

    const expenses = [
      {
        title: "Grocery Shopping",
        amount: 150,
        category: "Food",
        description: "Weekly groceries",
        date: generateDate(1),
      },
      {
        title: "Rent",
        amount: 1200,
        category: "Housing",
        description: "Monthly Rent",
        date: generateDate(3),
      },
      {
        title: "Uber Rides",
        amount: 45,
        category: "Transport",
        description: "Commute to work",
        date: generateDate(4),
      },
      {
        title: "Netflix Subscription",
        amount: 15,
        category: "Entertainment",
        description: "Monthly sub",
        date: generateDate(15),
      },
      {
        title: "Electricity Bill",
        amount: 120,
        category: "Utilities",
        description: "Winter heating",
        date: generateDate(35), // Last month
      },
    ];

    // Insert data with user reference
    await Income.insertMany(
      incomes.map((i) => ({ ...i, type: "income", user: user._id })),
    );
    await Expense.insertMany(
      expenses.map((e) => ({ ...e, type: "expense", user: user._id })),
    );

    console.log(
      `💰 Added ${incomes.length} Incomes and ${expenses.length} Expenses`,
    );
    console.log("✅ Seeding Completed Successfully");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("👋 Disconnected");
    process.exit(0);
  }
};

seedData();
