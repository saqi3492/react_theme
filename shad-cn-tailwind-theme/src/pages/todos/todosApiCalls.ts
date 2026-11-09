import axios from 'axios';
import { handleCatchMessages } from '@/utils/helper';
import { showToast } from '@/lib/toast';

export interface Todo {
  id: number | string;
  headline: string;
  description: string;
  ageOfWork: number | string;
  createdAt: string;
}

export interface TodoPayload {
  headline: string;
  description: string;
  ageOfWork: number;
}

const getFormattedTodo = (todo: any): Todo => ({
  id: todo.id,
  headline: todo.headline || '',
  description: todo.description || '',
  ageOfWork: todo.ageOfWork ?? '',
  createdAt: todo.createdAt ? new Date(todo.createdAt).toLocaleString() : '',
});

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get('/todos');
    if (response.status && Array.isArray(response.data)) {
      return response.data.map(getFormattedTodo);
    }
    return [];
  } catch (error) {
    handleCatchMessages(error);
    return [];
  }
};

export const createTodo = async (payload: TodoPayload): Promise<boolean> => {
  try {
    const response = await axios.post('/todos', payload);
    if (response.status) {
      showToast.success('Todo created successfully.');
      return true;
    }
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};

export const deleteTodo = async (todoId: Todo['id']): Promise<boolean> => {
  try {
    const response = await axios.delete(`/todos/${todoId}`);
    if (response.status) {
      showToast.success('Todo deleted successfully.');
      return true;
    }
    return false;
  } catch (error) {
    handleCatchMessages(error);
    return false;
  }
};
