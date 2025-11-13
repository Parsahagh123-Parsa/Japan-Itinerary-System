'use client'

import { useState, useEffect } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { useToast } from '../UI/ToastContainer'

interface Expense {
  id: string
  date: string
  category: string
  description: string
  amount: number
  currency: 'JPY' | 'USD' | 'EUR'
}

interface ExpenseTrackerProps {
  itineraryId: string
}

const EXPENSE_CATEGORIES = [
  'Accommodation',
  'Food',
  'Transportation',
  'Activities',
  'Shopping',
  'Other',
]

export default function ExpenseTracker({ itineraryId }: ExpenseTrackerProps) {
  const { showToast } = useToast()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Other',
    description: '',
    amount: '',
    currency: 'JPY' as const,
  })

  useEffect(() => {
    // Load expenses from localStorage
    const saved = localStorage.getItem(`expenses-${itineraryId}`)
    if (saved) {
      setExpenses(JSON.parse(saved))
    }
  }, [itineraryId])

  const handleAddExpense = () => {
    if (!formData.description || !formData.amount) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      date: formData.date,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
    }

    const updated = [...expenses, newExpense]
    setExpenses(updated)
    localStorage.setItem(`expenses-${itineraryId}`, JSON.stringify(updated))
    
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: 'Other',
      description: '',
      amount: '',
      currency: 'JPY',
    })
    setShowForm(false)
    showToast('Expense added', 'success')
  }

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id)
    setExpenses(updated)
    localStorage.setItem(`expenses-${itineraryId}`, JSON.stringify(updated))
    showToast('Expense removed', 'success')
  }

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="bg-white rounded-card shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Expense Tracker</h3>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Expense'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-card space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {EXPENSE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="What did you spend on?"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({ ...formData, currency: e.target.value as 'JPY' | 'USD' | 'EUR' })
                }
                className="w-full px-4 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="JPY">¥ JPY</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>
          <Button onClick={handleAddExpense} className="w-full">
            Add Expense
          </Button>
        </div>
      )}

      <div className="mb-4 p-4 bg-primary/10 rounded-card">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Total Expenses</span>
          <span className="text-2xl font-bold text-primary">
            {formData.currency === 'JPY' ? '¥' : formData.currency === 'USD' ? '$' : '€'}
            {totalExpenses.toLocaleString()}
          </span>
        </div>
      </div>

      {expenses.length > 0 ? (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-card"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{expense.description}</span>
                  <span className="text-xs text-gray-500">({expense.category})</span>
                </div>
                <span className="text-xs text-gray-600">{expense.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold">
                  {expense.currency === 'JPY' ? '¥' : expense.currency === 'USD' ? '$' : '€'}
                  {expense.amount.toLocaleString()}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteExpense(expense.id)}
                  className="text-error"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center py-4">
          No expenses tracked yet. Add your first expense to start tracking!
        </p>
      )}
    </div>
  )
}

