function showBox(ID,index){
    const selectElem = document.getElementById(ID);
    const sidePanelElem = document.getElementById('sidePanel'+index);
    Array.from(document.getElementsByClassName("sidePanel")).map(elem => {
        elem.style.display="none";
    });
    sidePanelElem.style.display="block";
    Array.from(document.getElementsByClassName("selecter")).map(elem => {
        elem.style.borderColor="red";
        elem.style.backgroundColor="white";
        elem.style.color="red";
    });
    selectElem.style.borderColor="white";
    selectElem.style.backgroundColor="red";
    selectElem.style.color="white";
}

document.getElementById("legend").style.display="inline-block";

Array.from(document.getElementsByClassName("selecter")).map((elem,index) => {
    document.getElementById(elem.id).addEventListener("click",function(elem){
        showBox(elem.path[0].id,index+1);
    });
});