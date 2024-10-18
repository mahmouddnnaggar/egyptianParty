$(".to-open").on("click", function (e) {
    $("aside").animate({
        left: "0px",
    });
});
$(".to-close").on("click", function (e) {
    $("aside").animate({
        left: "-200px",
    });
});
$(".accordion").on("click", function (e) {
    const $allPanels = $(".panel");
    const $panel = $(this).next();

    if ($panel.height() === 0) {
        $allPanels.each((_, el) => {
            if (el === $panel.get(0)) {
                $panel.animate({
                    height: $panel.get(0).scrollHeight,
                    paddingTop: "10px",
                });
            } else {
                $(el).animate({
                    height: 0,
                    paddingTop: "0px",
                });
            }
        });
    } else {
        $panel.animate({
            height: 0,
            paddingTop: "0px",
        });
    }
});

const targetDate = new Date("December 31, 2026 23:59:59").getTime();
const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    $(".days span").html(days);
    $(".hours span").html(hours);
    $(".minutes span").html(minutes);
    $(".seconds span").html(seconds);

    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Countdown Ended!";
    }
}, 1000);

let $remaining = $("#remainingChars");
let availableChars = 100;

$("textarea[name='message']").on("input", function (e) {
    let rem = availableChars - +this.value.length;
    if (rem >= 1) {
        $($remaining).children("span").html(rem);
    } else if (rem == 0) {
        $($remaining).children("span").html("Zero");
    } else {
        $($remaining).html(`<span class="text-danger">No</span> Characters Remaining Yet`);
    }
});
