
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
    cardContainer.innerHTML = "";
    cards.forEach((car) => {

        
        console.log(car)
       const card = document.createElement("div");

       card.className = "h-full";

       card.onclick = () => {
        const modalContainer = document.getElementById("my_modal_5");

        modalContainer.innerHTML=`
                <div class="modal-box">
                   <div class=" m-4 space-y-3">
                    <h2 class="text-2xl font-bold">${car.title}</h2>
                    <div class="flex gap-3 items-center">
                        <span class="bg-green-600 text-white p-2 rounded-full">Opened</span>
                        <p class="text-sm text-gray-400">${car.assignee}</p>
                        <p class="text-gray-400">${car.updatedAt}</p>
                    </div>
                    
                    <div class="flex gap-2">
                        <span class="bg-red-200 text-red-500 p-2 rounded-full">${car.labels[0]}</span>
                        <span class="bg-yellow-200 text-yellow-600 p-2 rounded-full">${car.labels[1]}</span>
                    </div>

                    <div class="">
                        <p class="text-sm text-gray-400">${car.description}</p>
                    </div>

                    <div class="p-3 flex gap-11 bg-sky-50">
                        <div>
                            <p class="text-gray-400">Assignee:</p>
                            <p>${car.assignee}</p>
                        </div>
                        <div>
                            <p class="text-gray-400">Priority:</p>
                            <span class="bg-red-300 text-red-600 p-2 rounded-full">${car.priority}</span>
                        </div>
                    </div>
                 </div>

                <div class="modal-action">
                     <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
                </form>
                </div>
                </div>
        `;
        modalContainer.showModal();

       };

    //    let borderColor = "border-green-300";
       if(car.priority === "high")borderColor = "border-green-400";
       else if (car.priority === "low")borderColor = "border-red-400";

       card.innerHTML = `
        <div class="bg-white p-4 border-t-3 ${borderColor} rounded-2xl shadow space-y-4">
                    <div class="flex justify-between items-center" >
                        <span><img src="./assets/Open-Status.png" alt=""></span>
                        <p class="btn bg-red-200 rounded-2xl text-red-500 p-2">${car.priority}</p>
                    </div>
                    <div class="space-y-2">
                        <h2 class="font-bold">${car.title}</h2>
                        <p class="text-sm text-gray-400 ">${car.description}</p>
                        <div class="grid grid-cols-2">
                            <span class="btn w-100% bg-red-200 text-red-500 rounded-2xl"><i class="fa-solid fa-bug"></i>${car.labels[0]}</span>
                            <span class="btn bg-amber-100 text-yellow-500 rounded-2xl my-6 p-2"><i class="fa-regular fa-life-ring"></i>${car.labels[1]}</span>
                            
                        </div>

                        <div class="space-y-3 mt-4 border-t border-gray-400">
                            <p class="text-gray-400 font-semibold"># ${car.id} by ${car.author} </p>
                            <p class="text-gray-400 font-semibold">${car.createdAt}</p>
                        </div>

                    </div>
                </div>
       `;
       cardContainer.appendChild(card);
    });
} 

allCardLoading();


document.getElementById("btn-search").addEventListener("click", () =>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue)

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then((data) => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter(issue => issue.title.toLowerCase().includes(searchValue) || issue.description.toLowerCase().includes(searchValue)
    ) ;
       const totalElement = document.getElementById("total");
       if(totalElement){
        totalElement.innerText = filterWords.length;
       }
       input.value="";
        displayCard(filterWords)
    })
})

