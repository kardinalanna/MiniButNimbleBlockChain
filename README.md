# MiniButNimbleBlockChain
Это маленькая, но проворная BlockChain, написанная на Node.js

[![main](https://github.com/kardinalanna/MiniButNimbleBlockChain/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/kardinalanna/MiniButNimbleBlockChain/actions/workflows/test.yml) master

[![main](https://github.com/kardinalanna/MiniButNimbleBlockChain/actions/workflows/test.yml/badge.svg?branch=develop)](https://github.com/kardinalanna/MiniButNimbleBlockChain/actions/workflows/test.yml) develop

Основные сущности:
1. Block.js - класс для генерации блоков цепочки блокчейна, состоящих из следующих полей:
    + index - номер блока по возрастанию, первый блок имеет индекс = 0
    + curHash - хеш текущего блока, который вычисляется путем конкатенации всех других полей и пересчитывается путем изменения nonce до тех пор, пока не будет заканчиваться на 0000
    + prevHash - хеш предыдущего блока.
    + data -  случайная строка из 256 символов.
    + nonce - это дополнение, за счет изменения которого можно пересчитывать hash.

2. Node.js - класс текущей node/сервера, хранящий лист блоков и обрабатывающий новые блоки

3. Server.js - организует работу сервера, обрабатывает полученные запросы с блоками от других node
4. Worker.js - отдельный поток для генерации блоков (1ый блок генерируется node 0, после полчения первого блока генерация продолжается бесконечно) и отправки их на другие ноды, работает парально с сервером

---
### Запуск MiniButNimbleBlockChain
1. Склонируйте проект к себе на устройство
2. Перейдите в папку проекта `cd MiniButNimbleBlockChain`
3. Создайте докер-образ `docker build -t MiniButNimbleBlockChain:latest .`
4. Выполните команду `docker-compose up`

Запуск без Docker:
1. Склонируйте проект к себе на устройство
2. Перейдите в папку проекта `cd MiniButNimbleBlockChain`
3. Запустите 3 терминала, задав в каждом команду `index.js 0`, `index.js 1`, `index.js 2` соответсвенно (жедательно осуществить запуска одновременно) 

---
### Процесс работы
![alt text](https://github.com/kardinalanna/MiniButNimbleBlockChain/blob/develop/exp_img.png?raw=true)

Node_0 генерирует первый блок и отправляет Node_1 и Node_2 и себе, как только первый блок добавлен, начинается майнинг следующих блоков и рассыдка их всем нодам, включая себя