import http from '@/http';
import { ITestParam } from './interface';

const baseUrl = '/api';

export const sendSurveyForm = <T>(params: ITestParam) => {
    return http.get<T>(`${baseUrl}/test/get`, params);
};