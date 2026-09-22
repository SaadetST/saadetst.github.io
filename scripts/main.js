"use strict"


// parse data from projects.json
fetch("scripts/projects.json")
.then(function(response){
    return response.json();
})
.then(function(obj) {
    loadProjects(obj);
})
.catch(function(error){
    console.log("Error loading projects: " + error);
});

// json to html
function loadProjects(project){
    let bigString = "";
    for(let i = 0; i < project.length; i++){

        const tags = project[i].tags;
        const tagsHTML = tags
            .map(tag => `<p class="tag tag-${tag}">${tag.toUpperCase()}</p>`)
            .join("");
        const classTags = tags.join(" ");

        let projectString = `
        <div class="project-para ${classTags}">
            <img src="${project[i].img}" alt="${project[i].alt}">
            <h3>~ ${project[i].title} ~</h3> 
            <div class="tags-container">
                ${tagsHTML}
            </div>
            <p>${project[i].description}</p>
            <p><b>Role:</b> ${project[i].role}</p>
            <p><b>Tools Used:</b> ${project[i].tools}</p>
        </div>`;

        bigString += projectString;
        //console.log(projectString);
    }
		document.querySelector('#projects-list').innerHTML = bigString;
};

// filter buttons
// onload, on click event
// get button's filter attribute
// for each project, check the class list 
// a .hidden class to add to the project para if not
window.onload = (e) => {
    const buttons = document.querySelectorAll(".project-button");
    
    buttons.forEach(button => {
        button.onclick = searchButtonClicked;
    });
};

function searchButtonClicked(e){
    const button = e.target;
    //console.log(button);
    const tag = button.id;
    //console.log(tag);
    const projects = document.querySelectorAll(".project-para");
    //console.log(projects);
    
    // lable active button
    const buttons = document.querySelectorAll(".project-button");
    for(let i = 0; i < buttons.length; i++){
        buttons[i].classList.remove("active");
        buttons[i].classList.add("unactive");

        //console.log(buttons[i]);
    }
    button.classList.add("active");
    button.classList.remove("unactive");
    //console.log(button);

    // filter projects
    for(let i = 0; i < projects.length; i++){
        if(tag === "all"){
            projects[i].classList.remove("hidden");
        }
        else if(projects[i].classList.contains(tag)){
            projects[i].classList.remove("hidden");
            //console.log(projects[i]);
        }
        else{
            projects[i].classList.add("hidden");
            //console.log(projects[i]);
        }
    }
};