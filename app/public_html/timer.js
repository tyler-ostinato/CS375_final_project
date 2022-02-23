let sendButton = document.getElementById("send");


sendButton.addEventListener("click", function () {
    let curScramble = document.getElementById("scramble").textContent;
    let time = document.getElementById("time").value;
    let data = {"user": "Test","time": time, "scramble": curScramble, "date":"2/23/2022 @ 10:23am"};
    console.log("Client sending this data to /timer:", data);
    fetch('/timer', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(function (response) {
        console.log(response);
    });
});

