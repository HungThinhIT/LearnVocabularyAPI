# LearnVocabularyAPI
This is RESTful API for LearnVocabulary project, base on NodeJS &amp; Express + MySQL.

## Installation
```
git clone https://github.com/HungThinh0710/LearnVocabularyAPI.git
npm install
```
Create .env file in project and paste below
```
JWT_KEY=LearnVocabularyApiByPhoenixSICT
PORT=3000
```
Create new database name: "learnvocabulary"
Edit username/password of database in "config/config.json"

Run migrate command
```
npx sequelize db:migrate
```
Then, run seed data command
```
npx sequelize db:seed:all
```
Run server
```
npm start
```

Install nodemon if have any error when start the server

Read API documentations
```
localhost:3000/docs
```
## (For API development) If have any comment in top of a function
```bash
//[WARN] Need to refactor
```
Take a little bit time to research and refactor it.
List function need to refactor:
- [repositories/TokenRepository.js]_[clearAToken]
- [controllers/UserController.js]_[update]
- [repositories/CategoryRepository.js]_[getCardsByCategoryId]
## Author
- Nguyen Hung Thinh (Phoenix) - Founder
