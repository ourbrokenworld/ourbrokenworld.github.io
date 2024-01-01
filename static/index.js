let msghistory=[]

$.get("https://ourbrokenworld.onrender.com");

function cleanstr(string) {
  var htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }
  return string.replace(/[&<>"']/g, function (match) {
    return htmlEscapes[match]
  })
}

$("button").on("click", function () {
  if (!$("textarea").val()) {
    return
  }
  msghistory.push({"role": "user", "content": $("textarea").val()})
  $("#messages").prepend($(`<div class='message'><b>Ты</b>: ${cleanstr($("textarea").val())}</div>`))
  $("textarea").val("")
  console.log(msghistory)
  $.post("https://ourbrokenworld.onrender.com/chat_api",
    {"history": JSON.stringify(msghistory)},
    (response) => {
      msghistory.push(response.response)
      $("#messages").prepend($(`<div class='message'><b>Бот</b>: ${cleanstr(response.response.content)}</div>`))
    }
  );
})