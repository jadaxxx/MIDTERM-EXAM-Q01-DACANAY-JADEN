# Expense Tracker

Create a **Personal Expense Tracking System**.

Built with Node.js + Express. Data is stored in `data.json`.

## Data Fields

* `id`
* `description`
* `category`
* `amount`
* `date`

## Requirements

* The expense amount must be greater than `0`.
* Reject a POST request if the amount is `0` or negative.
* Display all expenses.
* Calculate and display the **total amount of all current expenses**.
* When an expense is deleted, the displayed total must be updated.

## Required API

```text
GET    /api/expenses
GET    /api/expenses/:id
POST   /api/expenses
DELETE /api/expenses/:id
```

## How to Run

```text
npm install
npm start
```

Then open http://localhost:3000

## Author

Jaden Dacanay
