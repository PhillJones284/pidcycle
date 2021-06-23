const showBox = (index) => {
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

const moveLogo = () => {
    const windowHeight = window.innerHeight;
    document.getElementById("mbLogoContainer").style.top = 0.94*windowHeight+'px';
};

Array.from(document.getElementsByClassName("selecter")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click",() => {
        showBox(index+1);
    });
});

Array.from(document.getElementsByClassName("outerLegendPopSelecter")).map(elem => {
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

Array.from(document.getElementsByClassName("closeBtn")).map(elem => {
    document.getElementById(elem.id).addEventListener("click", event => {
        const idToClose = event.path[1].id;
        document.getElementById(idToClose).style.display = "none";
    });
});

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