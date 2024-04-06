async function fetchData() {
    try {
        const temp = await fetch(`./data/content.json`);
        const data = await temp.json();

        const title = document.querySelector('.dashboard-title');
        title.textContent = data.siteName;
        const navList = document.getElementById('navList');
        const infoCards = document.querySelector('.cards-section');
        const trendsSection = data.trendsSection;
        const additionalInfoItems = document.getElementById('trends-cards');
        const ticketsSection = data.ticketsSection;
        const ticketsList = document.getElementById("tickets-list");
        const tasksSection = data.tasksSection;
        const tasksList = document.getElementById("tasks-list");

        data.sidebarMenu.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('px-md-3', 'py-2');

            const link = document.createElement('a');
            link.href = item.url;
            link.classList.add('nav-link');
            link.dataset.bsToggle = "tooltip";
            link.dataset.bsPlacement = "right";
            link.title = item.text;
            link.setAttribute('aria-current', 'page');
            link.innerHTML = `
        <svg class="bi pe-none me-md-3" width="16" height="16">
            <use xlink:href="./icons/${item.text.toLowerCase()}.svg#${item.text.toLowerCase()}" fill="#9FA2B4" />
        </svg>
        <span>${item.text}</span>
    `;
            if (index === data.sidebarMenu.length - 2) {
                const hrElement = document.createElement('hr');
                hrElement.id = "sidebar-gray-line";
                navList.appendChild(hrElement);
            }

            listItem.appendChild(link);
            navList.appendChild(listItem);
        });

        data.infoCards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('col-xl', 'col-md-6', 'col-12');
            cardElement.innerHTML = `
                    <div class="card text-center">
                        <div class="card-body">
                            <h6 class="card-title gray-text mb-2">${card.title}</h6>
                            <span class="card-info mb-0">${card.value}</span>
                        </div>
                    </div>
                `;
            infoCards.appendChild(cardElement);
        });

        document.getElementById('trends-title').textContent = trendsSection.title;
        document.getElementById('trends-subtitle').textContent = trendsSection.timestamp;

        trendsSection.additionalInfo.forEach(info => {
            additionalInfoItems.innerHTML += `
                <div class="list-group-item list-group-item-action d-flex flex-column justify-content-center align-items-center p-4">
                    <h6 class="card-title gray-text mb-2">${info.title}</h6>
                    <span class="card-info h2 mb-0">${info.value}</span>
                </div>
            `;
        });

        document.getElementById('tickets-title').textContent = ticketsSection.title;
        document.getElementById('tickets-group').textContent = ticketsSection.group;

        ticketsSection.ticketDetails.forEach(ticket => {
            ticketsList.innerHTML += `
                <div class="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                    <h6>${ticket.name}</h6>
                    <p class="gray-text">${ticket.value}</p>
                </div>
            `;
        });

        document.getElementById('tasks-title').textContent = tasksSection.title;
        document.getElementById('tasks-subtitle').textContent = tasksSection.date;

        data.tasksSection.taskList.forEach(task => {
            const taskItem = document.createElement('label');
            taskItem.classList.add('list-group-item', 'd-flex', 'gap-3', 'px-4', 'py-3', 'align-items-center');

            taskItem.innerHTML = `
                <input class="form-check-input flex-shrink-0 mt-0" type="radio" name="listGroupRadios" value="">
                <span class="task">${task.name}</span>
                <span class="badge bg-${task.priority.toLowerCase()} text-uppercase ms-auto align-content-center">${task.priority}</span> 
            `;
            
            tasksList.appendChild(taskItem);
            
            const firstInput = tasksList.querySelector('input[type="radio"]');
            firstInput.checked = true;
        });

    } catch (error) {
        console.log(error);
    }
}

fetchData();