1. Деплой (https://gelyasha.github.io/progress/);

2. Блок представляет собой класс Progress, экспортирующийся из progress.js. Внешнее api имеет следующие методы:

        2.1. Начальное значение (опционально, по умолчанию 0), например, const progress = new Progress(50);
        2.2. progress.render(container) - метод для вставки блока в html разметку, где container - элемент, куда нужно вставить блок;
        2.3. progress.value - геттер и сеттер для управления значением (валидны числа от 0 до 100);
        2.4. progress.mode - сеттер для управления режимом блока (валидны значения 'normal', 'animated', 'hidden');

3. Переиспользование блока:

        3.1. Добавить в целевой html файл импорт файла со стилями progressStyles.css;
        3.2. Создать контейнер в html, куда будет вставляться блок, например, <div id="progress"></div>;
        3.3. В js файле получить созданный контейнер, например, const container = document.querySelector('#progress');
        3.4. В js файле импортировать класс Progress из progress.js и создать экземпляр (см. 2.1);
        3.5. Вызвать рендер экземпляра в нужный контейнер (см. 2.2);