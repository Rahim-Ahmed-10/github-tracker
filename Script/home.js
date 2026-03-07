
const cardContainer = document.getElementById("card-container");
const loadingSpinner = document.getElementById("loading-spinner");


// function shadowText (){
//     document.getElementById("border-green-400").classList.add("btn-primary");
    
// }


function showLoading() {
    loadingSpinner.classList.remove("hidden");
    cardContainer.innerHTML = "";
}

function hideLoading(){
    loadingSpinner.classList.add("hidden");

}

async function allCardLoading(category = 'all') {
    showLoading();


    document.getElementById("allBtn").classList.remove('btn-primary');
    document.getElementById("openBtn").classList.remove('btn-primary');
    document.getElementById("closedBtn").classList.remove('btn-primary');

    document.getElementById(`${category}Btn`).classList.add('btn-primary');

    // async- await

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    
    let issues = data.data;

    if(category === 'open'){
        issues = issues.filter(issue => issue.priority === 'high');
    }else if(category === "closed"){
        issues = issues.filter(issue => issue.priority === "low")
    }

    const totalElement = document.getElementById('total');
    if(totalElement){
        totalElement.innerText = issues.length;
    }

    hideLoading();
    displayCard(issues)
}

function displayCard(cards){
    console.log(cards);
    cards.forEach((car) => {

        
        console.log(car)
       const card = document.createElement("div")

       card.className = "h-full";

    //    let borderColor = "border-green-300";
       if(car.priority === "high")borderColor = "border-green-400";
       else if (car.priority === "low")borderColor = "border-red-400";
       card.innerHTML = `
        <div class="bg-white p-6 border-t-3 ${borderColor} rounded-2xl shadow space-y-3">
                    <div class=" flex justify-between ">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="btn bg-red-200 rounded-2xl text-red-500 p-2">${car.priority}</p>
                    </div>
                    <div class="space-y-1">
                        <h2 class="text-xl font-bold">${car.title}</h2>
                        <p class="text-sm text-gray-400 ">${car.description}</p>
                        <div>
                            <span class="btn bg-red-200 text-red-500 rounded-2xl">Bug</span>
                            <span class="btn bg-amber-100 text-yellow-500 rounded-2xl my-6">${car.status}</span>
                            <hr class="text-gray-400">
                        </div>

                        <div class="space-y-3 mt-4">
                            <p class="text-gray-400 font-semibold">${car.author}</p>
                            <p class="text-gray-400 font-semibold">${car.updatedAt}</p>
                        </div>

                    </div>
                </div>
       `;
       cardContainer.appendChild(card);
    });
} 

allCardLoading();

