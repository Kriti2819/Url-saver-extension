let myLeads = []
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el"); //const cannot be reassigned
const ulEl= document.getElementById("ul-el");
const deleteBtn= document.getElementById("delete-btn");
const tabBtn= document.getElementById("tab-btn");

//localStorage.setItem("","");

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){
    myLeads= leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
     chrome.tabs.query({/*object*/active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);  
    })
    
})

inputBtn.addEventListener("click", function(){
    
    if(inputEl.value !== ""){
        myLeads.push(inputEl.value);
    }
    inputEl.value="";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    console.log(localStorage.getItem("myLeads"));
})

function render(leads){
    let listItems = "";
    for(let i=0;i<leads.length;i++){
        listItems+= `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        ` 
    }
    ulEl.innerHTML= listItems;
    
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
    //ulEl.innerHTML="";
}) 



// ulEl.innerHTML+="<li>" + myLeads[i] +"</li>"; // we will use .innerHTML instead of textContent(ulEl.textContent += "<li>....</li>")
// // a different way is 
// const li = document.createElement("li")
//     li.textContent = myLeads[i]
//     ulEl.append(li)



