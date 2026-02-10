import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

export const getEmployees = () => api.get('/employees');
export const addEmployee = (employee) => api.post('/employees', employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);
export const markAttendance = (attendance) => api.post('/attendance', attendance);
export const getAttendance = (employeeId) => api.get(`/attendance/${employeeId}`);

export default api;
