# chronos
Chronos is a service that helps organize meetings, tasks for the day/month/year, and events.


### sequelize-cli - швидкий туторіал
Якщо хочеш створити модель, то впиши в терміналі:
```bash
npx sequelize-cli model:generate --name [Model Name] --attributes [Model Attributes]
```

Атрибути прописуються наступним чином: 
```bash
[Field Name]:[Field Type]
```
Декілька атрибутів
розділяються комою. Поле id створюється автоматично, його прописувати не потрібно. Ось приклад, як генерувалася модель User:
```bash
npx sequelize-cli model:generate --name User --attributes username:string,password:string,firstName:string,secondName:string
```

Для використання будь-якої моделі достатньо файлу models/index.js, він експортує всі моделі з цієї папки.