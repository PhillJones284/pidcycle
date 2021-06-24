const showBox = (index) => {
    // Function to change which element is displayed in the side panel
    // Also changes the colours of the numbered circles to give the user
    // a visual cue of how the two are related
    const selectElem = document.getElementById('selecter'+index);
    const sidePanelElem = document.getElementById('sidePanel'+index);
    const selectorColor = getComputedStyle(selectElem).getPropertyValue("--baseColor");
    Array.from(document.getElementsByClassName("sidePanel")).map(elem => {
        elem.style.display="none";
    });
    sidePanelElem.style.display="flex";
    Array.from(document.getElementsByClassName("selecter")).map(elem => {
        elem.style.borderColor=selectorColor;
        elem.style.backgroundColor="white";
        elem.style.color=selectorColor;
    });
    selectElem.style.borderColor="white";
    selectElem.style.backgroundColor=selectorColor;
    selectElem.style.color="white";
};

// Redefine window height for compatibility across all mobile devices
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', vh+'px');

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh+'px');
});

// Add even listeners to the numbered circles
Array.from(document.getElementsByClassName("selecter")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click",() => {
        showBox(index+1);
    });
});

//Add event listener for help button
document.getElementById("startHereid").addEventListener("click", function(event){
    document.getElementById("instructions").style.display="block";
    const startHereElem = document.getElementById(event.path[0].id);
    const selectorColor = getComputedStyle(startHereElem).getPropertyValue("--baseColor");
    startHereElem.style.color="white";
    startHereElem.style.backgroundColor=selectorColor;
    startHereElem.style.borderColor="white";
});

//Add event listeners to the Outer ring icons for funders etc. Works for mouse press
// and finger tap on mobile
Array.from(document.getElementsByClassName("legendPopSelecter")).map(elem => {
    document.getElementById(elem.id).addEventListener("mousedown", function(event){
        const legItem = event.path[0].id.split('legPopSel')[1];
        const legElem = 'legendPop'+legItem;
        document.getElementById(legElem).style.display = "flex";
    });
    document.getElementById(elem.id).addEventListener("touchstart", function(event){
        const legItem = event.path[0].id.split('legPopSel')[1];
        const legElem = 'legendPop'+legItem;
        document.getElementById(legElem).style.display = "flex";
    }, {passive: true});
    document.getElementById(elem.id).addEventListener("mouseup", function(event){
        const legItem = event.path[0].id.split('legPopSel')[1];
        const legElem = 'legendPop'+legItem;
        document.getElementById(legElem).style.display = "none";
    });
});

//The close button on legend popups. Designed to give the user a way out if they
// slide their mouse or finger off the element before letting go
Array.from(document.getElementsByClassName("closeBtn")).map(elem => {
    document.getElementById(elem.id).addEventListener("click", event => {
        const idToClose = event.path[1].id;
        document.getElementById(idToClose).style.display = "none";
        if (idToClose == "instructions"){
            startHereElem = document.getElementById("startHereid");
            const selectorColor = getComputedStyle(startHereElem).getPropertyValue("--baseColor");
            startHereElem.style.color=selectorColor;
            startHereElem.style.backgroundColor="white";
            startHereElem.style.borderColor=selectorColor;
        }
    });
});

//The left arrow in the side panel moves side panel text back one stage in the cylce
Array.from(document.getElementsByClassName("sidePanelLeftArrow")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click", () => {
        let targetNumber;
        if (index == 0){
            targetNumber = 10;
        } else {
            targetNumber = index;
        }
        const selecterID = 'selecter'+targetNumber;
        showBox(targetNumber);
    });
});

//Right arrow in the side panel to move side panel text forward one stage
Array.from(document.getElementsByClassName("sidePanelRightArrow")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click", function(elem){
        let targetNumber;
        if (index == 9){
            targetNumber = 1;
        } else {
            targetNumber = index+2;
        }
        const selecterID = 'selecter'+targetNumber;
        showBox(targetNumber);
    });
});