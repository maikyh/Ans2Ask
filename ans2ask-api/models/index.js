import { User } from './user.js';
import { Question } from './question.js';
import { Answer } from './answer.js';

User.hasMany(Question, { as: 'questions', foreignKey: 'userId' });
Question.belongsTo(User, { as: 'user', foreignKey: 'userId' });

User.hasMany(Answer, { as: 'answers', foreignKey: 'userId' });
Answer.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export { User, Question, Answer };