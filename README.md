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
squelize db:migrate
```
After created there tables. Open "user_types" and add there
```
----
id   name    description    type

1    Free    20             1
---
```

## (For API development) If have any comment in top of a function
```bash
//[WARN] Need to refactor
```
Take a little bit time to research and refactor it.
List function need to refactor:
- [repositories/TokenRepository.js]_[clearAToken]
- [controllers/UserController.js]_[update]

## Author
- Nguyen Hung Thinh (Phoneix) - Founder