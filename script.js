const selectorColor = getComputedStyle(document.documentElement).getPropertyValue("--selectorColor");

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
    Array.prototype.map.call(document.getElementsByClassName("innerArrow"),
        elem => {elem.children[0].setAttribute("fill", "#47CCCC")});
    Array.prototype.map.call(document.getElementsByClassName("outerArrow"),
        elem => {elem.children[0].setAttribute("fill", "#3397A7")});
};

const showBox = (index) => {
    // Change which element is displayed in the side panel
    // Also changes the colours of the numbered circles to give the user
    // a visual cue of how the two are related
    const selectElem = document.getElementById('selecter'+index);
    const sidePanelElem = document.getElementById('sidePanel'+index);
    Array.prototype.map.call(document.getElementsByClassName("sidePanel"),
        elem => elem.style.display="none");
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

// Add event listeners to the numbered circles and reset button
Array.prototype.map.call(document.getElementsByClassName("selecter"), (elem, index) => {
    const selecterNum = elem.id.split('selecter')[1];
    elem.addEventListener("click",() => {
        showBox(selecterNum);
    });
});

//Add event listener for help button
const addStartHereListener = () => {
    const elem = document.getElementById("startHereid");
    elem.addEventListener("click", event => {
        document.getElementById("instructions").style.display="flex";
        recolorSelecter(elem);
    });
}
addStartHereListener();

//Add event listeners to the Outer ring icons for funders etc. Works for mouse button down
// and finger press on mobile
Array.prototype.map.call(document.getElementsByClassName("legendPopSelecter"), elem => {
    const eventAction = (event, displayValue) => {
        const legItem = elem.id.split('legPopSel')[1];
        const legElem = 'legendPop'+legItem;
        document.getElementById(legElem).style.display = displayValue;
    };
    elem.addEventListener("mousedown", event => eventAction(event, "flex"));
    elem.addEventListener("mouseup", event => eventAction(event, "none"));
    elem.addEventListener("touchstart", event => eventAction(event, "flex"), {passive:true});
});

Array.prototype.map.call(document.getElementsByClassName("panelSelecter"), elem => {
    elem.addEventListener("click", event => {
        let panelItem = elem.id.split('panelSel')[1];
        if (panelItem.startsWith("Side") | panelItem.startsWith("RtSide")) {
            panelItem = panelItem.split("Side")[1];
        }
        const panelElem = 'panel'+panelItem;
        document.getElementById(panelElem).style.display = "block";
    });
});

//The close button on legend popups. Enables user to close help box.
// Also gives the user a way out if they
// slide their mouse or finger off popup elements before letting go
Array.prototype.map.call(document.getElementsByClassName("closeBtn"), elem => {
    elem.addEventListener("click", event => {
        elem.parentElement.style.display = "none";
        if (elem.id == 'closeBtnInstructions'){
            recolorSelecter(document.getElementById("startHereid"), closed=true);
        }
    });
});

//Left arrow in the side panel to move side panel text back one stage
Array.prototype.map.call(document.getElementsByClassName("sidePanelLeftArrow"), (elem,index) => {
    let targetNumber;
    if (index == 0){
        targetNumber = 10;
    } else {
        targetNumber = index;
    }
    elem.addEventListener("click",()=>{
        showBox(targetNumber);
    });
});

//Right arrow in the side panel to move side panel text forward one stage
Array.prototype.map.call(document.getElementsByClassName("sidePanelRightArrow"), (elem, index) =>{
    let targetNumber;
    if (index == 9){
        targetNumber = 1;
    } else {
        targetNumber = index+2;
    }
    elem.addEventListener("click",()=>{
        showBox(targetNumber);
    });
});