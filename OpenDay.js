
var parsedJson;

var topics;

var chosenSubject;

async function onload() {
    await getJSON();

    populateSubjects();

    showOpenDayInfo();

    var coverImage = parsedJson.cover_image;
    var imgElement = document.getElementById('siteCoverImage');
    imgElement.src = coverImage;
}

async function getJSON() {
    const jsonData = await fetch('OpenDay.json')
        if (!jsonData.ok) {
            throw new Error('JSON Data not found.')
        }

    parsedJson = await jsonData.json();
}

function updateCoverImage() {

    var imgElement = document.getElementById('subjectCoverImage');
    imgElement.hidden = false;
    imgElement.src = chosenSubject.cover_image;
}

function showOpenDayInfo() {
    var openDayInfo = document.getElementById('OpenDayInfo');

    var info = document.createElement('p');
    info.innerText = parsedJson.description;

    var startTime = document.createElement('p');
    startTime.innerHTML = '<strong>' + 'Start Time: ' + '</strong>' + parseTime(parsedJson.start_time);

    var endTime = document.createElement('p');
    endTime.innerHTML = '<strong>' + 'End Time: ' + '</strong>' + parseTime(parsedJson.end_time);

    openDayInfo.append(info, startTime, endTime);
}

function populateSubjects() {
    var selector = document.getElementById('subjectSelect');
    
    topics = parsedJson.topics;

    for(var i = 0; i < topics.length; i++) {
        var newOption = document.createElement('option');
        newOption.text = topics[i].name;
        newOption.value = i;
        
        selector.add(newOption);
    }
}

function subjectChanged(newSubject) {
    chosenSubject = topics[newSubject.value];

    updateTitle();

    updateDescription();

    updateCoverImage();

    showPrograms();
}

function updateTitle() {
    var subjectName = document.getElementById('subjectName')

    subjectName.innerText = chosenSubject.name;
}

function updateDescription() {
    var description = document.getElementById('subjectDescription');

    description.textContent = chosenSubject.description;
}

function showPrograms() {
    var activities = document.getElementById('subjectActivities')
    activities.innerHTML = '';

    for(i = 0; i < chosenSubject.programs.length; i++) {

        var newActivity = chosenSubject.programs[i];

        var activityTitle = document.createElement('h2');
        activityTitle.innerText = newActivity.title;

        var activityDescription = document.createElement('p');
        activityDescription.innerText = newActivity.description;

        var activityLocation = document.createElement('p');
        activityLocation.innerHTML = '<strong>' +  'Location: ' + '</strong>' + newActivity.location.title
        + ', ' + newActivity.location.address + ', ' + newActivity.location.postcode;  

        var activityRoom = document.createElement('p');
        activityRoom.innerHTML = '<strong>' + 'Room: ' + '</strong>' + newActivity.room;

        var activityStart = document.createElement('p');
        activityStart.innerHTML = '<strong>' + 'Starts at: ' + '</strong>' + parseTime(newActivity.start_time);

        var activityEnd = document.createElement('p');
        activityEnd.innerHTML = '<strong>' + 'Ends at: ' + '</strong>' + parseTime(newActivity.end_time); 

        activities.append(activityTitle, activityDescription, activityLocation, activityRoom, activityStart, activityEnd);
    }
}

function parseTime(dateToParse) {
    var parsedDate = new Date(dateToParse);
    var parsedLocaleTime = parsedDate.toLocaleTimeString();

    return parsedLocaleTime;
}