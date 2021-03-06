const selectorColor = getComputedStyle(document.documentElement).getPropertyValue("--selectorColor");
let whichPanel = 0;

// Redefine window height for compatibility across mobile devices
// Enables dynamic resizing when toggle scrolling the address bar
const updateWindowSize = () => {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', vh+'px');
    document.documentElement.style.setProperty('--vw', vw+'px');
};
updateWindowSize();
window.addEventListener('resize', updateWindowSize);

// All elements of the class type "content" are orignally set to display:none
// This is done because the page won't render correctly until after -vh and -vw
// are defined. However, we need to call this JS file after the page is rendered
// So we render it with the content set to invisible and then make it visible after
// it has been properly laid out.
for (elem of document.getElementsByClassName("content")){
    elem.style.display = "block";
}

// change the colour of buttons to show active / inactive status
const recolorSelecter = (elem, closed = false) => {
    if (closed) {
        elem.style.borderColor=selectorColor;
        elem.style.backgroundColor="white";
        elem.style.color=selectorColor;
    } else {
        elem.style.color="white";
        elem.style.backgroundColor=selectorColor;
        elem.style.borderColor="white";
    }
};

// reset colour of the selecter arrows
const resetArrowColour = () => {
    for (const elem of document.getElementsByClassName("innerArrow")){
        elem.children[0].setAttribute("fill", "#47CCCC");
    }
    for (const elem of document.getElementsByClassName("outerArrow")){
        elem.children[0].setAttribute("fill", "#3397A7");
    }
};

// Close all overlay panels
const closeOverlays = () => {
    for (const elem of document.getElementsByClassName("overlayPanel")){
        elem.style.display="none";
        recolorSelecter(document.getElementById("startHereid"), closed=true);
    }
};


// Change which element is displayed in the side panel
// Also changes the colours of arrows to give a
// a visual cue of how the two are related
const showBox = (index) => {
    const selectElem = document.getElementById('selecter'+index);
    const sidePanelElem = document.getElementById('sidePanel'+index);
    for (const elem of document.getElementsByClassName("sidePanel")){
        elem.style.display="none";
    }
    sidePanelElem.style.display="flex";
    if (index == 0){
        recolorSelecter(selectElem);
        resetArrowColour();
    } else {
        recolorSelecter(document.getElementById("selecter0"), closed = true);
        // Deal with the svg based colours
        resetArrowColour();
        selectElem.children[0].setAttribute("fill", "#BD3636");
    }
};

// Add event listeners to the arrows and key button
for (const elem of document.getElementsByClassName("selecter")){
    const selecterNum = elem.id.split('selecter')[1];
    elem.addEventListener("click",() => {
        showBox(selecterNum);
        whichPanel = selecterNum;
    });
}


//Add event listener for start button
const addStartHereListener = () => {
    const elem = document.getElementById("startHereid");
    elem.addEventListener("click", event => {
        closeOverlays();
        document.getElementById("instructions").style.display="flex";
        recolorSelecter(elem);
    });
};
addStartHereListener();

//Change which side panel is displayed based on arrowkeys and mousewheel
const changeBox = (event) => {
    if (event.code == "ArrowRight" | event.code == "ArrowUp" | event.deltaY > 0){
        ++whichPanel;
        if (whichPanel == 11) {
            whichPanel = 1;
        }
    } else if (event.code == "ArrowLeft" | event.code == "ArrowDown" | event.deltaY < 0) {
        --whichPanel;
        if (whichPanel < 1){
            whichPanel = 10;
        }
    }
    showBox(whichPanel);
};

//Add event listeners to the Outer ring icons for funders etc. Works for mouse button down
// and finger press on mobile

for (const elem of document.getElementsByClassName("legendPopSelecter")){
    const eventAction = (event, displayValue) => {
        const legItem = elem.id.split('legPopSel')[1];
        const legElem = 'legendPop'+legItem;
        document.getElementById(legElem).style.display = displayValue;
    };
    elem.addEventListener("mousedown", event => eventAction(event, "flex"));
    //elem.addEventListener("mouseup", event => eventAction(event, "none"));
    elem.addEventListener("touchstart", event => eventAction(event, "flex"), {passive:true});
    elem.addEventListener("touchend", event => eventAction(event, "none"), {passive:true});
}

//Adding the mouseup event listener on the document level makes the popups close even when
//you accidentally slide the pointer out of the active area with the mouse button still pressed
document.onmouseup = () => {
    for (const elem of document.getElementsByClassName("legendPop")){
        elem.style.display = "none";
    }
};

//Add event listeners for the side panel elements to pop up the defintions panels
//Similar to what happens when you click on the icons in the central registry circle
for (const elem of document.getElementsByClassName("panelSelecter")){
    elem.addEventListener("click", event => {
        closeOverlays();
        let panelItem = elem.id.split('panelSel')[1];
        if (panelItem.startsWith("Key") | panelItem.startsWith("Info")) {
            panelItem = panelItem.split("Side")[1];
        }
        const panelElem = 'panel'+panelItem;
        document.getElementById(panelElem).style.display = "block";
    });
}

//The close button in the corner of each overlay panel
//Works by closing the parent element in the DOM.
//Changes the colour of the button if it's the start overlay

for(const elem of document.getElementsByClassName("closeBtn")){
    elem.addEventListener("click", event => {
        elem.parentElement.style.display = "none";
        if (elem.id == 'closeBtnInstructions'){
            recolorSelecter(document.getElementById("startHereid"), closed=true);
        }
    });
};

//Adds the event listener for both left and right arrows in the side panel
const addArrowListener = (elem, targetNumber) => {
    elem.addEventListener("click",()=>{
        whichPanel = targetNumber;
        showBox(targetNumber);
    });
};

//Left arrow in the side panel to move side panel text back one stage
const leftArrowInstruction = (elems) => {
    let index = 0;
    for (const elem of elems){
        let targetNumber;
        if (index == 0){
            targetNumber = 10;
        } else {
            targetNumber = index;
        }
        addArrowListener(elem, targetNumber);
        index++;
    }
};
leftArrowInstruction(document.getElementsByClassName("sidePanelLeftArrow"));

//Right arrow in the side panel to move side panel text forward one stage
const rightArrowInstruction = (elems) => {
    let index = 0;
    for (const elem of elems){
        let targetNumber;
        if (index == 9){
            targetNumber = 1;
        } else {
            targetNumber = index+2;
        }
        addArrowListener(elem, targetNumber);
        index++;
    }
};
rightArrowInstruction(document.getElementsByClassName("sidePanelRightArrow"));

//Triggers for keypresses and mouse wheel events
document.onkeydown = event => {
    if (event.code == "Escape"){
        closeOverlays();
    }
    changeBox(event)
};
document.onwheel = event => changeBox(event);
