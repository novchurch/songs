# [Сборник Песен Молодёжи Новороссийской Церкви Евангельских Христиан-Баптистов](https://novchurch.github.io/songs/)

<p align="center">
  <img width="192" height="192" src="images/icons/icon-192x192.png" alt="Сборник Песен Молодёжи Новороссийской Церкви Евангельских Христиан-Баптистов">
</p>

Тексты песен хранятся в отдельных файлах в папке [`_posts`](./_posts)

Оба списка (как по возрастанию номеров, так и в алфавитном порядке генерируются автоматически). Машины ведь для того и нужны чтовы выполнять всю рутину за нас.

Пока что сортировка по возрастанию номеров реализована хаком, скрипт сортирует песни по дате добавления, а не по номеру, просто я присвоил даты в порядке возрастания номеров. 

И номер песни, и дата указываются (и берутся скриптом) из имени файла, которое имеет такой формат `YYYY-MM-DD-№№№.md` - год, месяц, день, номер песни.

Заголовок песни указывается в начале файла в переменной `title` таким образом:

```
---
title: Заголовок песни
---
```

Перенос строки достигается двумя (или больше) пробелами в конце строки.

Мне хватило только этих двух способов выделения текста

- `**жирный**` или `__жирный__` дают **жирный**

- `*курсив*` или `_курсив_` дают *курсив*

Хотя вообще в любом месте можно вставлять даже HTML разметку (если не слишком смешивать её с [Markdown](https://github.com/sandino/Markdown-Cheatsheet) разметкой)

Если хочется регулировать длинну пробелов между словами, то просто пробелами это сделать не получится, но для этого есть множество [специальных пробельных символов](https://rigovanov.ru/spaces/).

Лень было писать код для сортировки по номерам, поэтому пока пусть будет так, а в будущем надеюсь просто в движок добавят функцию для такой сортировки.

Любые предложения, замечания по улучшению, сообщения об ошибках в работе и т.п. принимаются с большой благодарностью, в идеале вот [здесь](https://github.com/novchurch/songs/issues), но вообще кому где удобнее.

Пусть Бог Отец, и Сын, и Дух Святой прославляются в сердцах и умах христиан, Ему благодарность, слава и хвала.

> Итак, смотрите, поступайте осторожно, не как неразумные, но как мудрые, дорожа временем, потому что дни лукавы.
> Итак, не будьте нерассудительны, но познавайте, что есть воля Божия. И не упивайтесь вином, от которого бывает распутство,
> но исполняйтесь Духом, **назидая самих себя псалмами, и славословиями, и песнопениями духовными,
> славя и воспевая в сердцах ваших Господу,** благодаря всегда за все Бога и Отца во имя Господа нашего Иисуса Христа,
> повинуясь друг другу в страхе Божием.
***(Ефесянам 5:15-21)***
