function showBox(index){
    const selectElem = document.getElementById('selecter'+index);
    const sidePanelElem = document.getElementById('sidePanel'+index);
    const selectorColor = getComputedStyle(selectElem).getPropertyValue("--baseColor");
    Array.from(document.getElementsByClassName("sidePanel")).map(elem => {
        elem.style.display="none";
    });
    sidePanelElem.style.display="block";
    Array.from(document.getElementsByClassName("selecter")).map(elem => {
        elem.style.borderColor=selectorColor;
        elem.style.backgroundColor="white";
        elem.style.color=selectorColor;
    });
    selectElem.style.borderColor="white";
    selectElem.style.backgroundColor=selectorColor;
    selectElem.style.color="white";
}

Array.from(document.getElementsByClassName("selecter")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click",function(elem){
        showBox(index+1);
    });
});

Array.from(document.getElementsByClassName("sidePanelLeftArrow")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click", function(elem){
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