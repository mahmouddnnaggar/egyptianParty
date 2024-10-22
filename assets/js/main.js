// ^ Open and Close Sidebar
$(".to-open").on("click", function () {
  $("aside").animate({ left: "0px" });
});

$(".to-close").on("click", function () {
  $("aside").animate({ left: "-200px" });
});

// ^ Accordion
$(".accordion").on("click", function () {
  const $allPanels = $(".panel");
  const $panel = $(this).next();

  if ($panel.height() === 0) {
    // ^ Open the clicked panel and close others
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
    // ^ Close the clicked panel
    $panel.animate({
      height: 0,
      paddingTop: "0px",
    });
  }
});

// ^ Count Down Feature
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
    alert("Countdown Ended!");
  }
}, 1000);

// ^ Remaining Characters On Input
const $remaining = $("#remainingChars");
const availableChars = 100;

$("textarea[name='message']").on("input", function () {
  const rem = availableChars - this.value.length;

  if (rem >= 1) {
    $remaining.children("span").html(rem);
  } else if (rem === 0) {
    $remaining.children("span").html("Zero");
  } else {
    $remaining.html(
      '<span class="text-danger">No</span> Characters Remaining Yet'
    );
  }
});

// ^ Navigate Between Our Sections
function scrollToSection(clickable, section) {
  $(clickable).on("click", function () {
    $("html, body").animate(
      { scrollTop: $(section).offset().top },
      500,
      "linear"
    );
  });
}

function handleAllSections() {
  const sections = [
    ["a[href='#home']", "header"],
    ["a[href='#details']", "section.singers"],
    ["a[href='#duration']", "section.countdown"],
    ["a[href='#contact']", "section.contact-us"],
  ];

  sections.forEach(([clickable, section]) => {
    scrollToSection(clickable, section);
  });
}

handleAllSections();
