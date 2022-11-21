
function checkIfValidIP(str) {
  // Regular expression to check if string is a IP address
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

  return regexExp.test(str);
}

const url = "https://geo.ipify.org/api/v1/country,city?apiKey=";
const api_key = "at_lIXUhB91chUFlaH8IaQfS3nuQyPGb";
let data = {
	apiKey: api_key,
	ipAddress: ''
}
let details = [];

var map = L.map('map');

const form = document.querySelector("form");


function displayIP(ip) {
	$(function () {
	   $.ajax({
	       url: "https://geo.ipify.org/api/v1",
	       data: data,
	       success: function(data) {
	           $(".ip-box h2").text(data.ip);
						 $(".loc-box h2").text(data.location.city + ", " + data.location.region + ", " + data.location.country);
						 $(".time-box h2").text("UTC " + data.location.timezone);
						 $(".isp-box h2").text(data.isp);

						 map.setView([data.location.lat, data.location.lng], 16);

						 const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
							 maxZoom: 24,
							 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						 }).addTo(map);

						 const icon = L.icon({
						   iconUrl: "images/icon-location.svg",
						 });

						 const marker = L.marker([data.location.lat, data.location.lng], {icon: icon}).addTo(map);

	       }
	   });
	 });
 }

  displayIP("");

  $("input").click(()=> {
    $("input").css("border", "none");
  });

  $("form").on("submit", function(event) {
  	event.preventDefault();
  	let ip = form.elements["ip"].value;
    console.log(ip);
  	if(checkIfValidIP(ip))
  		data.ipAddress = ip;
    else {
      $("input").blur();
      $("input").css("border", "3px solid red");
    }
  	displayIP(ip);
    $("input").val("");
	});
