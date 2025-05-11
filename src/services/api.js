import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

export const fetchExpenses = async (userId) => {
  const expensesCollection = collection(db, 'expenses');
  const q = query(expensesCollection, where('userId', '==', userId));
  const expenseSnapshot = await getDocs(q);
  const expenseList = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return expenseList;
};

export const addExpense = async (expense) => {
  const expensesCollection = collection(db, 'expenses');
  const docRef = await addDoc(expensesCollection, expense);
  return { id: docRef.id, ...expense };
};

export const updateExpense = async (id, updatedExpense) => {
  const expenseDoc = doc(db, 'expenses', id);
  await updateDoc(expenseDoc, updatedExpense);
};

export const deleteExpense = async (id) => {
  const expenseDoc = doc(db, 'expenses', id);
  await deleteDoc(expenseDoc);
};