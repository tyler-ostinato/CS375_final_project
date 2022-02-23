let sendButton = document.getElementById("send");


sendButton.addEventListener("click", function () {
    let time = document.getElementById("time").value;
    let data = {"user": "Test","time": time, "scramble": "N/A"};  
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