# MIDTERM-EXAM-Q01-DACANAY-JADEN

Expense Tracker
Create a Personal Expense Tracking System.

Data Fields
id

description

category

amount

date

Requirements
The expense amount must be greater than 0.

Reject a POST request if the amount is 0 or negative.

Display all expenses.

Calculate and display the total amount of all current expenses.

When an expense is deleted, the displayed total must be updated.

Required API
GET    /api/expenses
GET    /api/expenses/:id
POST   /api/expenses
DELETE /api/expenses/:id
