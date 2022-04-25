let country = "";
let city = "";
getIP();
//Get Your IP
async function getIP(){
    let url ="https://ip-fast.com/api/ip/?format=json&location=True";
    let ip = await fetch(url)
	.then(res=> res.json())
    .then(data=>{
        country = data.country==="United States"? "US": data.country;
		console.log(country);
        if (data.city){
            city = data.city;
        }
        getCOVID();
    })
    .catch(err=> console.warn(err));
}
async function getCOVID(){
    let url = "https://covid-api.mmediagroup.fr/v1/cases?country="+country;
    let covid = await fetch(url)
	.then(res=> res.json())
    .then(data=>{
		console.log(data.All);
		let statu = `${data.All.country} has ${String(data.All.confirmed).replace(/(.)(?=(\d{3})+$)/g,'$1,')} confirmed cases and ${String(data.All.deaths).replace(/(.)(?=(\d{3})+$)/g,'$1,')} deaths as of a few minutes ago.`
        console.log(statu);
		document.querySelector(".output").innerText = statu;
    })
    .catch(err=> {
        document.querySelector(".output").innerText ="Your Country was not Found."
        console.warn(err)
    });
}
