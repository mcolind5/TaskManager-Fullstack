import axios from 'axios';
import { Task } from './types';

const API_URL = 'http://localhost:8080/api'; // My Spring Boot address

// Get all tasks (matches @GetMapping)
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`);
    return response.data; // Returns Task[]
};

// Add a new task (matches @PostMapping)
export const addTask = async (text: string): Promise<Task> => {
    const response = await axios.post<Task>(`${API_URL}/tasks`, { text });
    return response.data; // Returns the new Task
};

// Delete a task (matches @DeleteMapping)
export const deleteTask = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${id}`);
;}