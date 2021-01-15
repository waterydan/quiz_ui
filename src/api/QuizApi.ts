import { HttpClient } from '../libs/HttpClient'
import { RegisterAnswerDto } from '../models/dtos/RegisterAnswerDto'
import { Question } from '../models/entities/Question'

export class QuizApi extends HttpClient {
  constructor() {
    super(process.env.REACT_APP_API_ENDPOINT!)
  }

  public async getQuestions() {
    return this.AxiosInstance.get<Question[]>('/quiz')
  }

  public async registerAnswer(dto: RegisterAnswerDto) {
    return this.AxiosInstance.post<Question>('/quiz', dto)
  }
}