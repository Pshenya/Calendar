// Глобальные переменные
let monthEl = $(".c-main");
let dataCel = $(".c-cal__cel");
let dateObj = new Date();
let month = dateObj.getUTCMonth() +1;
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let monthText = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
];
let indexMonth = month;
let todayBtn = $(".c-today__btn");
let saveBtn = $(".js-event__save");
let closeBtn = $(".js-event__close");
let addBtn = $(".js-event__add");
let winCreator = $(".js-event__creator");
let inputDate = $(this).data();
today = year + "-" + month + "-" + day;


// ------ Дефолтные события -------
function defaultEvents(dataDay,dataName,dataNotes,classTag){
    let date = $('*[data-day='+dataDay+']');
    date.attr("data-name", dataName);
    date.attr("data-notes", dataNotes);
    date.addClass("event");
    date.addClass("event--" + classTag);
}

defaultEvents('2019-12-31', 'С новым Годом!','','ВАЖНО');


// ------ Контроль функционалом -------

// Кнопка текущего месяца
todayBtn.on("click", function() {
    let step;
    if (month < indexMonth) {
        step = indexMonth % month;
        movePrev(step, true);
        $(".c-aside__num").text(day);
        $(".c-aside__month").text(monthText[month - 1]);
    } else if (month > indexMonth) {
        step = month - indexMonth;
        moveNext(step, true);
        $(".c-aside__num").text(day);
        $(".c-aside__month").text(monthText[month - 1]);
    }

});

// Выбрать день
dataCel.each(function() {
    if ($(this).data("day") === today) {
        $(this).addClass("isToday");
        fillEventSidebar($(this));
    }
});

// Окно "Добавить событие"
addBtn.on("click", function() {
    winCreator.addClass("isVisible");
    $("body").addClass("overlay");
    dataCel.each(function() {
        if ($(this).hasClass("isSelected")) {
            today = $(this).data("day");
            document.querySelector('input[type="date"]').value = today;
        } else {
            document.querySelector('input[type="date"]').value = today;
        }
    });
});
closeBtn.on("click", function() {
    winCreator.removeClass("isVisible");
    $("body").removeClass("overlay");
});
saveBtn.on("click", function() {
    let inputName = $("input[name=name]").val();
    inputDate = $("input[name=date]").val();
    let inputNotes = $("textarea[name=notes]").val();
    let inputTag = $("select[name=tags]")
        .find(":selected")
        .text();

    dataCel.each(function() {
        if ($(this).data("day") === inputDate) {
            if (inputName != null) {
                $(this).attr("data-name", inputName);
            }
            if (inputNotes != null) {
                $(this).attr("data-notes", inputNotes);
            }
            $(this).addClass("event");
            if (inputTag != null) {
                $(this).addClass("event--" + inputTag);
            }
            fillEventSidebar($(this));
        }
    });

    winCreator.removeClass("isVisible");
    $("body").removeClass("overlay");
    $("#addEvent")[0].reset();
});

// Заполняем инфо про события
function fillEventSidebar(self) {
    $(".c-aside__event").remove();
    let thisName = self.attr("data-name");
    let thisNotes = self.attr("data-notes");
    let thisImportant = self.hasClass("event--important");
    let thisBirthday = self.hasClass("event--birthday");
    let thisEvent = self.hasClass("event");

    switch (true) {
        case thisImportant:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event c-aside__event--important'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
        case thisBirthday:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event c-aside__event--birthday'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
        case thisEvent:
            $(".c-aside__eventList").append(
                "<p class='c-aside__event'>" +
                thisName +
                " <span> • " +
                thisNotes +
                "</span></p>"
            );
            break;
    }
};
dataCel.on("click", function() {
    let thisEl = $(this);
    let thisDay = $(this)
        .attr("data-day")
        .slice(8);
    let thisMonth = $(this)
        .attr("data-day")
        .slice(5, 7);

    fillEventSidebar($(this));

    $(".c-aside__num").text(thisDay);
    $(".c-aside__month").text(monthText[thisMonth - 1]);

    dataCel.removeClass("isSelected");
    thisEl.addClass("isSelected");

});

// Функция для переключения между месяцами
function moveNext(fakeClick, indexNext) {
    for (let i = 0; i < fakeClick; i++) {
        $(".c-main").css({
            left: "-=100%"
        });
        $(".c-paginator__month").css({
            left: "-=100%"
        });
        switch (true) {
            case indexNext:
                indexMonth += 1;
                break;
        }
    }
}
function movePrev(fakeClick, indexPrev) {
    for (let i = 0; i < fakeClick; i++) {
        $(".c-main").css({
            left: "+=100%"
        });
        $(".c-paginator__month").css({
            left: "+=100%"
        });
        switch (true) {
            case indexPrev:
                indexMonth -= 1;
                break;
        }
    }
}

// Переключатель месяцов
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
    switch (true) {
        case next:
            $(buttonId).on("click", function() {
                if (indexMonth >= 2) {
                    $(mainClass).css({
                        left: "+=100%"
                    });
                    $(monthClass).css({
                        left: "+=100%"
                    });
                    indexMonth -= 1;
                }
                return indexMonth;
            });
            break;
        case prev:
            $(buttonId).on("click", function() {
                if (indexMonth <= 11) {
                    $(mainClass).css({
                        left: "-=100%"
                    });
                    $(monthClass).css({
                        left: "-=100%"
                    });
                    indexMonth += 1;
                }
                return indexMonth;
            });
            break;
    }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

moveNext(indexMonth - 1, false);

// Заполнить сайдбар текущим днем
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);

