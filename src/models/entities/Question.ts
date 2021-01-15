export enum QuestionType {
  SelectOne,
  Text
}

export class Question {
  id = ''

  topic = ''

  type: QuestionType = QuestionType.Text

  options: string[] = []

  isCorrect: boolean | null = null

  userAnswer: string = ''
}
