import { User } from './user.js';
import { Question } from './question.js';

User.hasMany(Question, { as: 'questions', foreignKey: 'userId' });
Question.belongsTo(User, { as: 'user', foreignKey: 'userId' });

export { User, Question };